# Media Backups

There are a few options for backing up media on linux.

https://wiki.archlinux.org/title/dvdbackup

```
# information
dvdbackup -i /dev/sr0 -I
# perform backup
dvdbackup -i /dev/sr0 -o <directory> -t <title number>
```

libdvd - https://help.ubuntu.com/community/RestrictedFormats/PlayingDVDs

to get a block copy, you can use `dd`