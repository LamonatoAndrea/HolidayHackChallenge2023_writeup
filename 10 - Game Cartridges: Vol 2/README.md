# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Game Cartridges: Vol 2
Difficulty: :christmas_tree::christmas_tree::christmas_tree:  
Find the second Gamegosling cartridge and beat the game

### Hints
#### Gameboy 2
*From: Tinsel Upatree*  
Try poking around Pixel Island. There really aren't many places you can go here, so try stepping everywhere and see what you get!
#### Gameboy 2
*From: Tinsel Upatree (after obtaining the cartridge)*  
1) This feels the same, but different! 
2) If it feels like you are going crazy, you probably are! Or maybe, just maybe, you've not yet figured out where the hidden ROM is hiding. 
3) I think I may need to get a DIFFerent perspective. 
4) I wonder if someone can give me a few pointers to swap.

### Solution
Fairly easy to obtain, just go left in Driftbit Grotto until you get it. Crazy to complete. Even though not directly listed as a hint, Tinsel Upatree says that *"Word is: volume 2 has 2 versions!"*. I then noticed the filename being downloaded from `game0.gb`, and just thought it would make sense to try download `game1.gb`, and that way I got both versions. The main visual difference between the two is the worlds are upside-down.

#### I cheated
After hours of attempts and failed reverse engineering, I was about to give up and I saw @CaveVenom1’s
message on Discord *'I changed his text to "you shall pass" and it let me pass. I don't know why that did it'* and I literally just did that. It worked. I don’t know if I’ll have time to actually solve the challenge and understand what happens so I’ll write my assumptions here:
* There is a out-of-bounds read in the sentence *"You shall not pass"*, probably instead of reading "until" `/00/00`, it reads a fixed number of characters, eventually reading "garbage"
* This additional "garbage" triggers some change of behavior in a jump, which eventually leads to bypass the block

#### The morse code
Even though I cheated, at the end you are presented with an “old-timey radio” that plays the following morse code:
| AUDIO                    | MORSE                     | DECODED |
| ------------------------ | ------------------------- | ------- |
| ![audio](imgs/audio.png) | `−−· ·−·· −−−−− ·−· −·−−` | `GL0RY` |

And the flag is `GL0RY`, with a `0` not an `O`...that also took its time, and manual decoding 🙂

### Thanks to @CaveVenom1
You don’t know that, and maybe I should drop you a message on Discord, but I think I wouldn’t make it if it wasn’t for your message 🙂

### Thanks to @i81b4u
Thank you for showing me the path, once again 🙂

---
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
## [Linux PrivEsc](/07%20-%20Linux%20PrivEsc/README.md)
## [Faster Lock Combination](/08%20-%20Faster%20Lock%20Combination/README.md)
## [Game Cartridges: Vol 1](/09%20-%20Game%20Cartridges%3A%20Vol%201/README.md)