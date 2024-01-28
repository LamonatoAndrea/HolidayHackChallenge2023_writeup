# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Luggage Lock
Difficulty: :christmas_tree:  
Help Garland Candlesticks on the Island of Misfit Toys get back into his luggage by finding the correct position for all four dials.

### Hints
#### Lock Talk
*From: Garland Candlesticks*  
Check out Chris Elgee's [talk](https://youtu.be/ycM1hBSEyog) regarding his and his wife's luggage. Sounds weird but interesting!

### The “right” solution
Given the great talk it is easy to replicate the steps by applying pressure to the TSA keyhole (highlighted
in yellow in the image below), then rotate the wheels and mind the resistances until the proper code is
found.
![luggage_lock_closed](imgs/luggage_lock_closed.png)

Once opened, the inside reveals a pretty nifty holiday luggage:
![luggage_lock_open](imgs/luggage_lock_open.png)

### The “wrong” solution
While impractical and hardly applicable in a real-life scenario, in this instance we can use a quick javascript one-liner directly in the developer tools’ console to test all the combinations and unlock the luggage in a matter of moments:
```javascript
for(a=0;a<10;a++)for(b=0;b<10;b++)for(c=0;c<10;c++)for(d=0;d<10;d++)socket.emit('message',{
"Type":"Open","Combo":""+a+b+c+d });
```

### Kudos
Seriously, it was so nice to see challenges about lockpicking - especially having to replicate them “digitally”. Kudos!

---
## [Linux PrivEsc](/07%20-%20Linux%20PrivEsc/README.md)
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