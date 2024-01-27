# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Game Cartridges: Vol 1
Difficulty: :christmas_tree:
Find the first Gamegosling cartridge and beat the game

### Hints
#### Approximate Proximity
*From: Dusty Giftwrap*
Listen for the gameboy cartridge detector's proximity sound that activates when near buried treasure. It may be worth checking around the strange toys in the Tarnished Trove.
#### Gameboy 1
*From: Dusty Giftwrap (after obtaining the cartridge)*
1) Giving things a little push never hurts. 2) Out of sight but not out of ear-shot 3) You think you
fixed the QR code? Did you scan it and see where it leads?

### Solution
Analyzing the HTML code, it is possible to find references to the cartridge and then it is just a matter of
navigating to that position:
```html
<div class="ent type-item item-gameboy1 p-31-25" data-location="31,25">
```
Once found, under Luffy’s hat ![misfit_piratehat_small](imgs/misfit_piratehat_small.png), this cartridge is actually easier to play than to hack, so, once the QR is fixed it is show in its entirety:
