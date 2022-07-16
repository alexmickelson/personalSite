#!/bin/bash

set -e

cat /sys/firmware/acpi/tables/SLIC > /home/alex/Documents/vms/license/slic.bin
cat /sys/firmware/acpi/tables/MSDM > /home/alex/Documents/vms/license/msdm.bin
dmidecode -t 0 -u | grep $'^\t\t[^"]' | xargs -n1 | perl -lne 'printf "%c", hex($_)' > /home/alex/Documents/vms/license/smbios_type_0.bin
dmidecode -t 1 -u | grep $'^\t\t[^"]' | xargs -n1 | perl -lne 'printf "%c", hex($_)' > /home/alex/Documents/vms/license/smbios_type_1.bin