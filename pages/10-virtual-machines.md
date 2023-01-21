# enable IOMMU

### BIOS

- IOMMU
- intel vt-d
- amd-vi

### enable in grub

/etc/default/grub
```
GRUB_CMDLINE_LINUX_DEFAULT="... amd_iommu=on vfio-pci.ids="
```

Rebuild with 
```
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

# configure PCI device startup

## discover PCI device ids

```
lspci -nn
```

## attach vio driver to pasthrough gpu

/etc/default/grub

```
GRUB_CMDLINE_LINUX_DEFAULT="... vfio-pci.ids=10de:2482,10de:228b"
```

Rebuild with 

```
sudo grub-mkconfig -o /boot/grub/grub.cfg
```


# stop nvidia driver from grabing gpu on startup

/etc/modprobe.d/vfio.conf (create if not existing)

```
options vio-pci ids=10de:2482,10de:228b
# softdep nvidia pre:vfio-pci
```

sudo vim /etc/mkinitcpio.conf (dots indicate other, not actual dots)
```
    MODULES=(... vfio_pci vfio vfio_iommu_type1 vfio_virqfd ...)

    HOOKS=(... modconf ...)
```

rebuild initramfs

```
sudo mkinitcpio -p linux515
```

confirm it worked 
```
lspci -k
sudo dmesg | grep -i vfio
```

# configure UEFI

- install ovmf package
- update xml definition

```xml
<os>
    ...
    <loader readonly="yes" type="pflash">/usr/share/edk2-ovmf/x64/OVMF_CODE.fd</loader>
    ...
</os>
```

# Disk Passthrough

identify disk
```
lsblk
ls -l /dev/disk/by-id
```

```xml
<disk type="block" device="disk">
  <driver name="qemu" type="raw" cache="none" io="native"/>
  <source dev="/dev/disk/by-id/ata-Samsung_SSD_870_EVO_500GB_S62ANJ0NC31785R">
  <target dev="sda" bus="sata"/>
</disk>
```


# Windows drivers

## Spice agent

go [here](https://www.spice-space.org/download.html#guest) to download the spice agent in windows. This enables display resizing

Downlaod the vfio windows drivers from [here](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README.md)
- mount as cdrom
- in device manager update drivers from mounted cdrom


# Pass though gpu to vm

in virtual machine manager
- add hardware
- select gpu and audio device to pass through

# Looking Glass

Looking glass will allow you to have a higher refresh rate for you vm. It does this by sharing some gpu memory buffer thats normaly used for screen capture to display the screen in linux.

Windows is the server  
Linux is the client  

You need to build the client from scratch:

```
sudo pacman -Syu cmake gcc libgl libegl fontconfig spice-protocol make nettle pkgconf binutils libxi libxinerama libxss libxcursor libxpresent libxkbcommon wayland-protocols ttf-dejavu dkms linux-headers
```

Reconfigure windows vm xml
```xml
<devices>
  ...
  <shmem name='looking-glass'>
    <model type='ivshmem-plain'/>
    <size unit='M'>64</size>
  </shmem>
  ...
</devices>
```

configure linux to share memory with kvm

/etc/tmpfiles.d/10-looking-glass.conf
```
f	/dev/shm/looking-glass	0660	user	kvm	-
```

create tmp file without rebooting with ```systemd-tmpfiles --create /etc/tmpfiles.d/10-looking-glass.conf```

### AppArmor config

/etc/apparmor.d/local/abstractions/libvirt-qemu
```
/dev/shm/looking-glass rw,
```

restart with ```sudo systemctl restart apparmor```

### windows config

Download the windows ivshmem driver [here](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/upstream-virtio/). In Device Manager go to 'System Devices' and install it on the PCI-to-Ram device.

Install the windows looking glass host from [here](https://looking-glass.io/downloads) make sure to match the version on linux.

Be sure to set the looking glass display as the primary display (not the spice one).

At this point you should be able to launch the linux looking glass client.


## Audio

Looking glass only passes video through to the linux host. To pass through audio we are going to use Scream which will pass audio over the network to our pulseaudio server.


### Windows Side

[source](https://looking-glass.io/wiki/Using_Scream_over_IVSHMEM#Configuring_the_windows_VM)

Download latest release from [here](https://github.com/duncanthrax/scream/releases)

Run the installXXX.bat file as administrator.

Select Scream as the output audio interface

### Linux Side 

follow the build instructions [here](https://looking-glass.io/wiki/Using_Scream_over_LAN)
```
git clone https://github.com/duncanthrax/scream.git
cd scream/Receivers/unix
mkdir build && cd build
cmake ..
make
```

start scream with `./scream -i virbr0`


# Windows license

[source](https://gist.github.com/Informatic/49bd034d43e054bd1d8d4fec38c305ec)

```xml
  <qemu:commandline>
    <qemu:arg value='-acpitable'/>
    <qemu:arg value='file=/some/path/slic.bin'/>
    <qemu:arg value='-acpitable'/>
    <qemu:arg value='file=/some/path/msdm.bin'/>
    <qemu:arg value='-smbios'/>
    <qemu:arg value='file=/some/path/smbios_type_0.bin'/>
    <qemu:arg value='-smbios'/>
    <qemu:arg value='file=/some/path/smbios_type_1.bin'/>
  </qemu:commandline>
```

```bash
#!/bin/bash

set -e

cat /sys/firmware/acpi/tables/SLIC > slic.bin
cat /sys/firmware/acpi/tables/MSDM > msdm.bin
dmidecode -t 0 -u | grep $'^\t\t[^"]' | xargs -n1 | perl -lne 'printf "%c", hex($_)' > smbios_type_0.bin
dmidecode -t 1 -u | grep $'^\t\t[^"]' | xargs -n1 | perl -lne 'printf "%c", hex($_)' > smbios_type_1.bin
```


# Working XML Definition

```xml
<domain type='kvm'>
  <name>windows</name>
  <uuid>936dc0a7-9984-4296-be54-4f0c00a70709</uuid>
  <metadata>
    <libosinfo:libosinfo xmlns:libosinfo="http://libosinfo.org/xmlns/libvirt/domain/1.0">
      <libosinfo:os id="http://microsoft.com/win/10"/>
    </libosinfo:libosinfo>
  </metadata>
  <memory unit='KiB'>16776192</memory>
  <currentMemory unit='KiB'>16776192</currentMemory>
  <vcpu placement='static'>16</vcpu>
  <os>
    <type arch='x86_64' machine='pc-q35-6.2'>hvm</type>
    <loader readonly='yes' type='pflash'>/usr/share/edk2-ovmf/x64/OVMF_CODE.fd</loader>
    <nvram>/var/lib/libvirt/qemu/nvram/windows_VARS.fd</nvram>
    <boot dev='hd'/>
    <bootmenu enable='yes'/>
  </os>
  <features>
    <acpi/>
    <apic/>
    <hyperv mode='custom'>
      <relaxed state='on'/>
      <vapic state='on'/>
      <spinlocks state='on' retries='8191'/>
    </hyperv>
    <vmport state='off'/>
  </features>
  <cpu mode='host-model' check='partial'>
    <topology sockets='1' dies='1' cores='8' threads='2'/>
  </cpu>
  <clock offset='localtime'>
    <timer name='rtc' tickpolicy='catchup'/>
    <timer name='pit' tickpolicy='delay'/>
    <timer name='hpet' present='no'/>
    <timer name='hypervclock' present='yes'/>
  </clock>
  <on_poweroff>destroy</on_poweroff>
  <on_reboot>restart</on_reboot>
  <on_crash>destroy</on_crash>
  <pm>
    <suspend-to-mem enabled='no'/>
    <suspend-to-disk enabled='no'/>
  </pm>
  <devices>
    <emulator>/usr/bin/qemu-system-x86_64</emulator>
    <disk type='block' device='disk'>
      <driver name='qemu' type='raw' cache='none' io='native'/>
      <source dev='/dev/disk/by-id/ata-Samsung_SSD_870_EVO_500GB_S62ANJ0NC31785R'/>
      <target dev='sda' bus='sata'/>
      <address type='drive' controller='0' bus='0' target='0' unit='0'/>
    </disk>
    <disk type='file' device='cdrom'>
      <driver name='qemu' type='raw'/>
      <source file='/home/alex/Documents/vms/virtio-win-0.1.215.iso'/>
      <target dev='sdb' bus='sata'/>
      <readonly/>
      <address type='drive' controller='0' bus='0' target='0' unit='1'/>
    </disk>
    <controller type='usb' index='0' model='qemu-xhci' ports='15'>
      <address type='pci' domain='0x0000' bus='0x02' slot='0x00' function='0x0'/>
    </controller>
    <controller type='sata' index='0'>
      <address type='pci' domain='0x0000' bus='0x00' slot='0x1f' function='0x2'/>
    </controller>
    <controller type='pci' index='0' model='pcie-root'/>
    <controller type='pci' index='1' model='pcie-root-port'>
      <model name='pcie-root-port'/>
      <target chassis='1' port='0x10'/>
      <address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x0' multifunction='on'/>
    </controller>
    <controller type='pci' index='2' model='pcie-root-port'>
      <model name='pcie-root-port'/>
      <target chassis='2' port='0x11'/>
      <address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x1'/>
    </controller>
    <controller type='pci' index='3' model='pcie-root-port'>
      <model name='pcie-root-port'/>
      <target chassis='3' port='0x12'/>
      <address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x2'/>
    </controller>
    <controller type='pci' index='4' model='pcie-root-port'>
      <model name='pcie-root-port'/>
      <target chassis='4' port='0x13'/>
      <address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x3'/>
    </controller>
    <controller type='pci' index='5' model='pcie-root-port'>
      <model name='pcie-root-port'/>
      <target chassis='5' port='0x14'/>
      <address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x4'/>
    </controller>
    <controller type='pci' index='6' model='pcie-root-port'>
      <model name='pcie-root-port'/>
      <target chassis='6' port='0x15'/>
      <address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x5'/>
    </controller>
    <controller type='pci' index='7' model='pcie-root-port'>
      <model name='pcie-root-port'/>
      <target chassis='7' port='0x16'/>
      <address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x6'/>
    </controller>
    <controller type='pci' index='8' model='pcie-to-pci-bridge'>
      <model name='pcie-pci-bridge'/>
      <address type='pci' domain='0x0000' bus='0x05' slot='0x00' function='0x0'/>
    </controller>
    <controller type='virtio-serial' index='0'>
      <address type='pci' domain='0x0000' bus='0x03' slot='0x00' function='0x0'/>
    </controller>
    <interface type='network'>
      <mac address='52:54:00:8e:ed:6b'/>
      <source network='default'/>
      <model type='e1000e'/>
      <address type='pci' domain='0x0000' bus='0x01' slot='0x00' function='0x0'/>
    </interface>
    <serial type='pty'>
      <target type='isa-serial' port='0'>
        <model name='isa-serial'/>
      </target>
    </serial>
    <console type='pty'>
      <target type='serial' port='0'/>
    </console>
    <channel type='spicevmc'>
      <target type='virtio' name='com.redhat.spice.0'/>
      <address type='virtio-serial' controller='0' bus='0' port='1'/>
    </channel>
    <input type='keyboard' bus='ps2'/>
    <input type='mouse' bus='ps2'/>
    <graphics type='spice' autoport='yes'>
      <listen type='address'/>
    </graphics>
    <sound model='ich9'>
      <address type='pci' domain='0x0000' bus='0x00' slot='0x1b' function='0x0'/>
    </sound>
    <audio id='1' type='spice'/>
    <video>
      <model type='qxl' ram='65536' vram='65536' vgamem='16384' heads='1' primary='yes'/>
      <address type='pci' domain='0x0000' bus='0x00' slot='0x01' function='0x0'/>
    </video>
    <hostdev mode='subsystem' type='pci' managed='yes'>
      <source>
        <address domain='0x0000' bus='0x04' slot='0x00' function='0x0'/>
      </source>
      <address type='pci' domain='0x0000' bus='0x06' slot='0x00' function='0x0'/>
    </hostdev>
    <hostdev mode='subsystem' type='pci' managed='yes'>
      <source>
        <address domain='0x0000' bus='0x04' slot='0x00' function='0x1'/>
      </source>
      <address type='pci' domain='0x0000' bus='0x07' slot='0x00' function='0x0'/>
    </hostdev>
    <redirdev bus='usb' type='spicevmc'>
      <address type='usb' bus='0' port='2'/>
    </redirdev>
    <redirdev bus='usb' type='spicevmc'>
      <address type='usb' bus='0' port='3'/>
    </redirdev>
    <memballoon model='none'/>
    <shmem name='looking-glass'>
      <model type='ivshmem-plain'/>
      <size unit='M'>32</size>
      <address type='pci' domain='0x0000' bus='0x08' slot='0x01' function='0x0'/>
    </shmem>
  </devices>
</domain>
```

# Port forwarding

If your vm is running in user mode you can run port forwarding with: ([source](https://serverfault.com/questions/170079/forwarding-ports-to-guests-in-libvirt-kvm))

```
virsh qemu-monitor-command --hmp sles11 'hostfwd_add ::2222-:22'
```