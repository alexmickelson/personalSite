# Using Libvirt on Ubuntu

## Install these packages

```bash
sudo apt install qemu-kvm libvirt-daemon-system virtinst bridge-utils openvswitch-switch zfsutils-linux libguestfs-tools (optional: nfs-common ovmf)
```

add users to virsh group
set environtment variable to always interact with system
```
LIBVIRT_DEFAULT_URI=qemu:///system 
```

this is testing the `inline` capabilities

## Set up a bridge network interface (allow vms to get non-nat'd IP's)

Use two network interfaces, one to act as the host machines IP address on the 5 vlan, and the other to be a bridge to attach a virtual switch for the vm's.

### Host IP Config

Use something like this netplan yaml.

```yaml
network:
  version: 2
  ethernets:
    <hardware-nic-name-1>:
      addresses:
      - 144.17.5.<ip>/24
      gateway4: 144.17.5.1
      nameservers:
        addresses:
        - 144.17.3.2
        - 144.17.3.82
        search:
        - snow.edu
```

### Bridge Config

Because a bridge is a 'virtual switch' the upstream hardware switch port needs to be configured in trunk mode.

The bridge needs to be configured to use openvswitch. Openvswitch is a project to allow virtual switches to tag traffic with vlans.


netplan.yml
```yml
network:
  version: 2
  ethernets:
    <port-nic-id>: {}
  bridges:
    br0:
      interfaces: [ <port-nic-id> ]
      openvswitch: {}
```

It is important that the virtual switch is named br0, if a vm is migrated to a new machine it will expect that bridge to exist and be configured properly.
Also note that you will need two NIC IDs. One is for the network connection of the server, and the other for the bridge.

### Virtual Switch Creation

host-bridge.xml (can be created anywhere)
```xml
<network connections='1'>
  <name>host-bridge</name>
  <forward mode='bridge'/>
  <bridge name='br0'/>
  <virtualport type='openvswitch'/>
  <portgroup name='vlan-89'>
    <vlan>
      <tag id='89'/>
    </vlan>
  </portgroup>
  <portgroup name='vlan-90'>
    <vlan>
      <tag id='90'/>
    </vlan>
  </portgroup>
</network>
```

Import the host-bridge.xml file. Run these files agains the system vm configs (i.e. virsh -c qemu:///system net-define)

```bash
virsh net-define host-bridge.xml
virsh net-start host-bridge
virsh net-autostart host-bridge
```

Then you can delete the host-bridge.xml file.

# Zfs setup 

### Create Pool

```bash
sudo zpool create \
  -m /data/vms \
  vms \
  mirror \
    /dev/sdb \
    /dev/sdc \
  mirror \
    /dev/sdd \
    /dev/sde \
  mirror \
    /dev/sdf \
    /dev/sdg
```


### Pool Tuning

```bash
sudo zfs set atime=off vms
sudo zfs set compression=lz4 vms
```

### Optional checks

#### ZFS Cache file

Located at ```/etc/zfs/zpool.cache``` the cache file stores pool information that tells the system where the pools that should be auto mounted are.

If the cache file does is inacurate for whatever reason it can be reset with ```zpool set cachefile=/etc/zfs/zpool.cache vms```


#### startup

The service zfs-import-cache.service is supposed to import the cached pools automatically.

__Run this to avoid mounting on boot errors__:

```bash
sudo zpool set cachefile=/etc/zfs/zpool.cache vms
sudo systemctl enable --now zfs.target
sudo systemctl enable --now zfs-import-cache.service
```

```bash
sudo modprobe zfs
```

#### KVM Storage pool creation

Like LVM, uses a pool/volume system to coordinate storage.
Make sure that /data/vms/images exists before running the following commands.

```
virsh pool-define-as local dir --target /data/vms/images
virsh pool-build local
virsh pool-start local
virsh pool-autostart local
```

Like the br0 bridge, the local pool and directory path need to be identical on all hypervisors for live migration of vms.


#### Schedule Scrubs

A ZFS scrub job will check the disks for data degredation. They are worth running on an automated schedule.

```
zpool scrub vms
```

#### zfs arc

monitor with ```arcstat```

set runtime arc to 20 gb ```echo "21474836480" > /sys/module/zfs/parameters/zfs_arc_max```

persistent arc settings

/etc/modprobe.d/zfs.conf
```
options zfs zfs_arc_max=21474836480
```

rebuild initramfs
```
sudo update-initramfs -u -k all
```

# Linux install

## Instructions for a manual install of new installation from ISO
1. On the hypervisor box it will be installed on, do:
    - ```
      zfs create vms/images/<new machine name>
      ```
    - ```
      virt-install \
        --name=<<new machine name>> \
        --ram <<RAM in MB>> \
        --vcpus=<<Number>> \
        --cpu=Haswell-noTSX \
        --cdrom=/data/iso/<<image.iso>> \
        --osinfo=<<To get the list of supported OSInfo types, execute: osinfo-query os>> \
        --disk path=/data/vms/images/<<new machine name>>/<<new machine name>>.qcow2,size=<<storage size in GB>>,format=qcow2 \
        --network network=host-bridge,model=virtio,virtualport_type=openvswitch \
        --graphics vnc \
        --boot uefi \
        --noautoconsole \
        --noreboot \
        #--xml './devices/interface/vlan/tag/@id=<<vlan number>>'
      ```
2. Connect to new VM in VirtMan and do:
    - Complete the installation, reboot.
    - Post completion update the xml to include vlan data (can be done using ```virsh edit vm-name```)
      - ```xml
        <domain>
          ...
          <interface type='bridge'>
            ...
            <!-- <source network='default-bridge' portgroup='vlan-89' bridge='br0'/> -->
            <vlan>
              <tag id='89'/>
            </vlan>
            <!-- <virtualport type='openvswitch'>
              <parameters interfaceid='...'/>
            </virtualport> -->
            ...
          </interface>
          ...
        </domain>
        ```

## Instructions for Golden Image installation:
1. On the hypervisor box it will be installed on, do:
    - ```
      zfs create vms/images/<new machine name>
      ```
    - ```
      virt-install \
      --name=<<new machine name>> \
      --ram <<RAM in MB>> \
      --vcpus=<<Number>> \
      --cpu=Haswell-noTSX \
      --import \
      --osinfo=<<To get the list of supported OSInfo types, execute: ```osinfo-query os```>> \
      --disk path=/data/vms/images/<<new machine name>>/<<new machine name>>.qcow2 \
      --network network=host-bridge,model=virtio,virtualport_type=openvswitch \
      --graphics vnc \
      --boot uefi \
      --noautoconsole \
      --noreboot
      ```
2. Golden Image Post install OS Configuration
    - Reset the host ssh fingerprint
      ```
      sudo rm -v /etc/ssh/ssh_host_*
      sudo dpkg-reconfigure openssh-server
      ```
    - Change hostname and update hosts file
      ```
      sudo hostnamectl set-hostname name
      sudo vim /etc/hosts
      ```
    - Update networking
      ```
      sudo vim /etc/netplan/00-installer-config.yaml
      ``` 
    - Remove cloud-init
      ```
      sudo apt purge cloud-init
      ```