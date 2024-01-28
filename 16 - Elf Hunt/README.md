# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Elf Hunt
Difficulty: :christmas_tree::christmas_tree::christmas_tree:  
Piney Sappington needs a lesson in JSON web tokens. Hack Elf Hunt and score 75 points.

### Hints
#### JWT Secrets Revealed
*From: Piney Sappington*
Unlock the mysteries of JWTs with insights from [PortSwigger's JWT Guide](https://portswigger.net/web-security/jwt).

### Solution
Going after the cookies, we can observe one being `ElfHunt_JWT=eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzcGVlZCI6LTUwMH0.` which is an unsigned JWT so it can be easily decoded and altered with [jwt.io](jwt.io):
| DESCRIPTION      | BASE64 ENCODED                         | DECODED                      |
| ---------------- | -------------------------------------- | ---------------------------- | 
| ORIGINAL HEADER  | `eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0`  | `{"alg":"none","typ":"JWT"}` |
| ORIGINAL PAYLOAD | `eyJzcGVlZCI6LTUwMH0`                  | `{"speed":-500}`             |
| ALTERED PAYLOAD  | `eyJzcGVlZCI6LTUwfQ`                   | `{"speed":-50}`              |

By setting the cookie and reloading the page, elves go way slower. Additionally, the console in dev tools allows to alter the `score` variable and quickly reach the target of `75` points, e.g. by setting it to `74` and the just hit `1` elf. Once won, the game shows a banner and the winner [“toket”](https://www.vivino.com/US/en/pelican-toket/w/9752003?year=2020):  
![toket](imgs/toket.png)  

Once the Game Token is clicked it provides a page of “[The Captain’s Journal](https://elfhunt.org/static/images/captainsJournal.png)” which is related to The Captain's Comms challenge.



---
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
## [Game Cartridges: Vol 2](/10%20-%20Game%20Cartridges%3A%20Vol%202/README.md)
## [Game Cartridges: Vol 3](/11%20-%20Game%20Cartridges%3A%20Vol%203/README.md)
## [Na'an](/12%20-%20Na%27an/README.md)
## [KQL Kraken Hunt](/13%20-%20KQL%20Kraken%20Hunt/README.md)
## [Phish Detection Agency](/14%20-%20Phish%20Detection%20Agency/README.md)
## [Hashcat](/15%20-%20Hashcat/README.md)