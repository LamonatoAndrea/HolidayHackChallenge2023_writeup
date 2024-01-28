# North Pole VNC Workspace Container:

Install docker and then to build the image do:

```
docker build -t nmf_client .
```

Then to run it use:

```
docker run -it --cap-add=NET_ADMIN -p 5900:5900 -p 6901:6901 --rm nmf_client
```

Can combine them both together using:

``` bash
./build_and_run.sh
```

This will open a port on 5900 for you to connect to. On ubuntu you can connect with something like Vinagre. Fedora, vnc viewer.

On Windows you could connect with something like tightvnc:

https://www.tightvnc.com/download.php

If ran locally, you could connect using `localhost:5900`.

## Wireguard How To:

Wireguard is already installed in this container during build but you can install it manually elsewhere too:

```
apt update && apt install -y wireguard-tools
```

There is many ways to connect wireguard but often times its just 1 to 1 connection. 

In this case, a client config would look something like this:

```
[Interface]
Address = 10.1.1.2/24
PrivateKey = hTCxVDQRxSd5OwGc4TPffcNgmP488+K6j5nn6NloONo=
ListenPort = 51820

[Peer]
PublicKey = 2k45++7JvVLLXwZufPeV8LmzK6IpivWDGdCVi2yhsxI=
Endpoint = 34.172.176.5:51820
AllowedIPs = 10.1.1.1/32
```

Save the config to the following file `/etc/wireguard/wg0.conf` using a command like this:

``` bash
# Copy/Paste works best with gedit in this vnc container
gedit /etc/wireguard/wg0.conf
# OR
nano /etc/wireguard/wg0.conf
# OR
vim /etc/wireguard/wg0.conf
```

Then we need to take down the interface and bring it back up:

``` bash
# Bring down
wg-quick down wg0
# Bring up
wg-quick up wg0
```

## Nanosat MO Framework:

Documentation on the Nanosat framework can be found at:

https://nanosat-mo-framework.readthedocs.io/en/latest/opssat/testing.html

Can connect to a server using:

```
maltcp://10.1.1.1:1024/nanosat-mo-supervisor-Directory
```

