# Create a Destop Application Launch File

For only local users put the file in `~/.local/share/applications` for all users put it in `/usr/share/applications/`

looking-glass.desktop
```
[Desktop Entry]
Type=Application
Terminal=false
Exec=/home/alex/Documents/vms/looking-glass-B5.0.1/client/build/looking-glass-client
Name=Looking Glass
#Icon=/path/to/icon
```

scream.desktop
```
[Desktop Entry]
Type=Application
Terminal=true
Exec=/home/alex/Documents/vms/scream/Receivers/unix/build/scream -i virbr0
Name=Scream
```