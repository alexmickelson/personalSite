# Create a Destop Application Launch File

For only local users put the file in `~/.local/share/applications` for all users put it in `/usr/share/applications/`

looking-glass.desktop
```
[Desktop Entry]
Type=Application
Terminal=true
TerminalOptions=\s--noclose
Exec=bash -c "[[ \"$(virsh -c qemu:///system list --inactive --name | grep -q windows)\" != 'windows' ]] && virsh -c qemu:///system start windows; /home/alex/Documents/vms/looking-glass-B5.0.1/client/build/looking-glass-client"
Name=Looking Glass
#Icon=/path/to/icon

```


# Create  Linux Service
/etc/systemd/user/scream.service (userland service, so use `systemctl --user`)
```
[Unit]
Description=Scream Receiver
After=pulseaudio.service network-online.target
Wants=pulseaudio.service

[Service]
Type=simple
ExecStartPre=/bin/sleep 3
ExecStart=/home/alex/Documents/vms/scream/Receivers/unix/build/scream -i virbr0

[Install]
WantedBy=default.target
```