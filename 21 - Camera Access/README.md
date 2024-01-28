# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Camera Access
Difficulty: :christmas_tree::christmas_tree::christmas_tree:  
Gain access to Jack's camera. What's the third item on Jack's TODO list?

### Hints
#### Hubris is a Virtue
*From: Wombley Cube*  
In his hubris, Wombley revealed that he thinks you won't be able to access the satellite's "Supervisor Directory". There must be a good reason he mentioned that specifically, and a way to access it. He also said there's someone else masterminding the whole plot. There must be a way to discover who that is using the nanosat.

### Solution
The NanoSat-o-Matic allows downloading a pre-built [container](https://www.holidayhackchallenge.com/2023/client_container.zip) with all the required tools inside that can be access via VNC. The GateXOR Gator provides the configuration for a Wireguard VPN connection to the target. The references to NanoSat, along with the tools provided within the container, leads to [ESA’s NanoSat MO Framework](https://nanosat-mo-framework.github.io/). Once the interface was set up, I used nmap to determine useful ports on the target:
```bash
thedead@dellian:~/hhc2023/Camera Access$ nmap 10.1.1.1
Starting Nmap 7.93 ( https://nmap.org ) at 2023-12-24 16:07 CET
Nmap scan report for 10.1.1.1
Host is up (0.18s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT     STATE SERVICE
1024/tcp open  kdm
3306/tcp open  mysql
```

I then used the `Consumer Test Tool` to connect to `maltcp://10.1.1.1:1024/nanosat-mo-supervisor-Directory`, I noticed the `camera` app and started it. I then connected to `maltcp://10.1.1.1:1025/camera-Directory`. This exposed the action service `Base64SnapImage` to get a photo along with two parameter services: `NumberOfSnapsTaken` and `Base64SnapImage` to get the base64 encoded content of the image. After submitting the action `Base64SnapImage`, I noticed that `NumberOfSnapsTaken` increased and `Base64SnapImage` had some content. Due to the challenging interface of the CTT, I captured the traffic with Wireshark on the host and extracted the Base64 encoded payload:
![wireshark](imgs/wireshark.png)

Once converted to an image I got this:
![camera](imgs/camera.png)

It’s not beautiful but I could find the TODO list with the third item being `CONQUER HOLIDAY SEASON!`:
![todo](imgs/todo.png)
