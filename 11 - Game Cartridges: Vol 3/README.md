# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Game Cartridges: Vol 3
Difficulty: :christmas_tree::christmas_tree::christmas_tree:  
Find the third Gamegosling cartridge and beat the game

### Hints
#### Bird's Eye View
*From: Angel Candysalt*  
The location of the treasure in Rusty Quay is marked by a shiny spot on the ground. To help with navigating the maze, try zooming out and changing the camera angle.
#### Gameboy 3
*From: Angel Candysalt (after obtaining the cartridge)*  
1) This one is a bit long, it never hurts to save your progress! 
2) 8bit systems have much smaller registers than you’re used to. 
3) Isn’t this great?!? The coins are OVERFLOWing in their abundance.

### Solution
By zooming out in the screen, the path to the cartridge is revealed, and highlighted in green in the image
below:
![maze](imgs/maze.png)  
When saving coins are lost and can be restored with T-Wiz’s help. Using the bgb cheat searcher I eventually identified the registries that were changing/not changing accordingly to what was happening in the game:
![bgb_cheat_searcher](imgs/bgb_cheat_searcher.png)  
With some further analysis I was able to identify those holding the actual coin value: `CBA2` being the units, `CB9C` being the tens and `CB9E` being the hundreds. Then playing till the end of the game and setting coins to `999` (at least in memory) new sprites appear:
|                      |                                |
| -------------------- | ------------------------------ |
| ![ram](imgs/ram.png) | ![the_jump](imgs/the_jump.png) |

Once crossed the gap we meet a Grumpy Man that tells us the password `morethanmeetstheeye` for ChatNPT which sets the variable `ROCKCANMOVE` to `TRUE`, allowing us to move the rock and obtain the final flag `!tom+elf!`.

#### Wrong path #1 - Overflowing
I have tried to work around the overflowing of coins for so many hours that I cannot even remember before trying to just play the game.
#### Wrong path #2 - Save games
I have also analyzed save games for such a long time...but I discovered a guide that I think it’s worth sharing with the world: [Carter Yagemann - A Beginner's Guide to Hacking Video Game Save States](https://carteryagemann.com/save-state-hacking-for-beginners.html).
#### Wrong path #3 - Phantom tiles
This was probably where I got into the deepest white rabbit’s hole: trying to add terrain so that I could just fill the gap. Never got it working, always ending up on unwalkable phantom tiles...but also here I discovered a crazily interesting guide that I wanted to share: [Bruno Macabeus - Reverse engineering a GameBoy Advance game](https://macabeus.medium.com/reverse-engineering-a-gameboy-advance-game-introduction-ec185bd8e02).
