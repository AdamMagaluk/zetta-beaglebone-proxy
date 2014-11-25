# Zetta Beaglebone Proxy

Create a npm proxy and zetta cloud proxy for beaglebone usb tethering without
usb internet sharing.


## Install

```
npm install -g zetta-beaglebone-proxy
```

## Usage

### On PC

```
zetta-beaglebone-proxy
```

### On Beaglebone

```
ssh root@192.168.7.2

> npm config set registry http://192.168.7.1:2000/
```

Replace all instances of `http://hello-zetta.herokuapp.com` with `http://192.168.7.1:1200`
