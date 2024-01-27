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
> https://hhc23-snowball.holidayhackchallenge.com/room/?username=TheDead91&roomId=237a35ee7&roomType=public&gameType=co-op&id=ec59bb01-6112-4b8f-8705-34be3b49fd4a&dna=ATATATTAATATATATATATTAATATATATATCGTAGCTAATATATATATATATGCATATATATATATGCCGATATATCGATATATATATATTACGATATATATATATATGCATATGCGC&singlePlayer=true
In this instance the game spawns a dwarf helper and lets you play solo.
Analyzing the JS code in the page, it is possible to identify a section with the comment // ==========
player stuff where player parameters are set, especially player.throwDelay = 300 and player.health
= 50.
Using the console in dev tools and selecting the right context it is possible to set:
● player.throwDelay = 0, allowing to shoot very fast
● player.health = -1, causing the player to never die (a.k.a. Vengeance of un-TheDead)
Then it’s just about playing and winning