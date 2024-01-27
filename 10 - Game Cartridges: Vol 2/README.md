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
1) This feels the same, but different! 2) If it feels like you are going crazy, you probably are! Or maybe, just maybe, you've not yet figured out where the hidden ROM is hiding. 3) I think I may need to get a DIFFerent perspective. 4) I wonder if someone can give me a few pointers to swap.

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