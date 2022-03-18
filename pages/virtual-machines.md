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

sudo vim /etc/mkinitcpio.conf 
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