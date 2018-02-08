# README

## Setup

The rpio module requires sudo acces to use I2C. 

nvm doesn't play well with sudo.

Each time you update/change the version of node you need to copy the installed files and change their permisions 

```
$ n=$(which node) && 
n=${n%/bin/node} && 
chmod -R 755 $n/bin/* && 
sudo cp -r $n/{bin,lib,share} /usr/local
```

when installing rpio we also need to add te user to the `rpio` group

```
$ sudo usermod -a -G gpio pi
```

and update the udev rules

```
$ sudo su
```

```
# cat >/etc/udev/rules.d/20-gpiomem.rules <<EOF
SUBSYSTEM=="bcm2835-gpiomem", KERNEL=="gpiomem", GROUP="gpio", MODE="0660"
EOF
```

```
sudo udevadm trigger &&
sudo service udev restart
```

## Connections

https://oscarliang.com/raspberry-pi-arduino-connected-i2c/
```
RPI               Arduino (Uno/Duemillanove)
--------------------------------------------
GPIO 0 (SDA) <--> Pin 4 (SDA)
GPIO 1 (SCL) <--> Pin 5 (SCL)
Ground       <--> Ground
```

Which When using a MicroView (https://learn.sparkfun.com/tutorials/microview-hookup-guide/all#introduction) we have 

```
RPI               Microview 
--------------------------------------------
GPIO 0 (SDA) <--> Pin 3 (SDA) Yellow
GPIO 1 (SCL) <--> Pin 2 (SCL) Green
Ground       <--> Pin 8 (Ground)
```
