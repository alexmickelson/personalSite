# Bluetooth headphone a2dp detection

Bluez configuration fix:

`sudo vim /etc/bluetooth/main.conf`  
update `MultiProfile = single` 

set up autostart with `AutoEnable=true`