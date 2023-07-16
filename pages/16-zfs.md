# ZFS

ZFS was one of the great gifts from Sun Microsystems (may they rest in peace). After being aquired by Orace, mainline zfs open source development was basically halted. A fork of the project (openzfs) was created to continue development of this billion dollar file system. 

While any user can install zfs on any machine, there is some controversy as to if the zfs license (Sun's Common Development and Distribution License or CDDL) allows it to be shipped with the linux kernel and its GPL-2 license. No official rulings have been made in court about it at the time of writing. Ubuntu was the first linux distro to ship zfs with linux (adding experimental support in 19.10). 

## ZFS Usage

Install 
```
sudo apt install zfsutils-linux
```

Create Pool
```
zpool create new-pool mirror /dev/sdb /dev/sdc
```

Performance Tweaks
```
zfs set atime=off new-pool
zfs set compression=zstd new-pool
```

The default record size of 128K seems to be optimal for most workloads. The 2.5 admins podcast recommends 64K blocks for spinning rust. If you are storing large media files a 1M block size is what you want.


## Automount troubles

There are a few systemd services that you want to be sure to enable so that your pools automount. These services are suppossed to be enabled by default, but I've had to fix them a few times.

```
systemctl enable zfs.target zfs-import.service zfs-mount.service
```

## Monitoring

```
zpool iostat my-pool 1 
```

## Other Commands

Get all properties of zfs pool

```bash
zfs get all my-pool
```

import existing pools

```bash
zpool import # to list pool
zpool import -a
```

## Glorious Sanoid / Syncoid Snapshot Management

### Sanoid

Sanoid is a fantastic project that makes snapshot management extremely simple. You can check out the git repo [here](https://github.com/jimsalterjrs/sanoid). On ubuntu you can install them with:
```
sudo apt install sanoid
sudo systemctl enable --now sanoid-prune.service
sudo systemctl enable --now sanoid.timer
```
Check out the git repo for more details about the sanoid config

/etc/sanoid/sanoid.conf
```
[my-pool/dataset]
	use_template = production

#############################
# templates below this line #
#############################

[template_production]
        frequently = 0
        hourly = 24
        daily = 7
        monthly = 3
        yearly = 0
        autosnap = yes
        autoprune = yes
```

Installing with ubuntu will auto-install a sanoid.timer service that will periodically wake up and run the sanoid command.

Syncoid is sanoids sibling. It moves the snapshots that sanoid creates.

### Syncoid

Syncoid does not have a daemon that runs it, you are expected to set up a your own way of scheduling it (probably to ensure that you are monitoring it as well).

Here is a github action that runs syncoid on a schedule. As usual, check out [https://crontab.guru](https://crontab.guru) to help out with the cron syntax.

```yml
name: ZFS Backup
on:
  schedule:
    - cron: 0 1 * * *
  workflow_dispatch:
jobs:
  update-infrastructure:
    runs-on: [self-hosted, home-server]
    steps:
      - name: run syncoid
        run: |
          syncoid \
            --recursive \
            --no-privilege-elevation \
            --no-rollback \
              data \
              backup/data

          syncoid \
            --recursive \
            --no-privilege-elevation \
            --no-rollback \
              media \
              backup/media
```

In order for a regular user to run these commands they need these permissions ([source](https://github.com/jimsalterjrs/sanoid/issues/522))

```
zfs allow -u <backup-user> compression,create,destroy,mount,mountpoint,receive,rollback,send,snapshot,hold <pool name>
```