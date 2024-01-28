# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Snowball Fight
Difficulty: :christmas_tree::christmas_tree:  
Visit Christmas Island and talk to Morcel Nougat about this great new game. Team up with another player and show Morcel how to win against Santa!

### Hints
#### Snowball Super Hero
*From: Morcel Nougat*  
Its easiest to grab a friend play with and beat Santa but tinkering with client-side variables can grant you all kinds of snowball fight super powers. You could even take on Santa and the elves solo!
#### Consoling iFrames
*From: Morcel Nougat*  
Have an iframe in your document? Be sure to select the right context before meddling with
JavaScript.

### Solution
By opening the iframe in a dedicated window, one can observe that certain parameters are being transmitted through the URL. Analyzing what happens when the user clicks “2. CREATE PRIVATE ROOM” , it is possible to observe that it calls the function:
```javascript
function buildAndGotoUrl(roomId, gamet, roomt) {
	var new_url = window.location.href.split('/').slice(0, -1).join('/') + '/room/';
	new_url += "?username=" + username;
	new_url += "&roomId=" + roomId;
	new_url += "&roomType=" + roomt;
	new_url += "&gameType=" + gamet;
	
	if (resourceId && resourceId.length) {
		new_url += "&id=" + resourceId;
	}

	if (playerAvatar && playerAvatar.length) {
		new_url += "&dna=" + playerAvatar;
	}

	window.location.href = new_url;
}
```
Using the debugger in dev tools, the URL can be tweaked before it gets called. I found that a reliable combination is with `roomType = public` and `singlePlayer = true`:
>https://hhc23-snowball.holidayhackchallenge.com/room/?username=TheDead91&roomId=237a35ee7&roomType=public&gameType=co-op&id=ec59bb01-6112-4b8f-8705-34be3b49fd4a&dna=ATATATTAATATATATATATTAATATATATATCGTAGCTAATATATATATATATGCATATATATATATGCCGATATATCGATATATATATATTACGATATATATATATATGCATATGCGC&singlePlayer=true

In this instance the game spawns a dwarf helper and lets you play solo.
Analyzing the JS code in the page, it is possible to identify a section with the comment `// ========== player stuff` where player parameters are set, especially `player.throwDelay = 300` and `player.health = 50`.
Using the console in dev tools and selecting the right context it is possible to set:
* `player.throwDelay = 0`, allowing to shoot very fast
* `player.health = -1`, causing the player to never die (a.k.a. Vengeance of un-TheDead)

Then it’s just about playing and winning

#### Fun fact
If you go directly to the URL https://hhc23-snowball.holidayhackchallenge.com/, it will let you play with a random user - also not your own - it was fairly nice to play as other people.

---
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