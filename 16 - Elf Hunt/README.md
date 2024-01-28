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
