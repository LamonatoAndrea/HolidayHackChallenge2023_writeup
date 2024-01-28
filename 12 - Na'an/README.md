# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Na'an
Difficulty: :christmas_tree::christmas_tree:  
Shifty McShuffles is hustling cards on Film Noir Island. Outwit that meddling elf and win!

### Hints
#### Stump the Chump
*From: Shifty McShuffles*
Try to outsmart Shifty by sending him an error he may not understand.
#### The Upper Hand
*From: Shifty McShuffles*
Shifty said his deck of cards is made with Python. Surely there's a [weakness](https://www.tenable.com/blog/python-nan-injection) to give you the upper hand in his game.

### Solution
When playing it always results in ties but it is possible to observe that `NaN` can be used instead of a number but the game logic prevents having more than one card set to the same value, including `NaN`. Analyzing the JS code, I identified the ajax call sending the values of the cards:
```javascript
$.ajax({
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    async: true,
    url: `action?id=${rid}`,
    data: JSON.stringify({ 'score': '' }),
    complete: function (data) {
        var response = JSON5.parse(data.responseText)
        if (response.request === true) {
            if (response.data.conduit) {
                __POST_RESULTS__(response.data.conduit)
            }
            ShiftyElfScoreToast.showMessage("Shifty's Score: " + response.data.shifty_score + ' ')
            PlayerScoreToast.showMessage("Player's Score: " + response.data.player_score) 
            win_lose_score_message(response.data.score_message, response.data.win_lose_tie_na)
        } else if (response.data) {
            Talk(response.data)
        }
    }
});
```
Using the developer tools console to alter the data being sent, it is possible to send all `NaN`, resulting in Shifty to lose:
```javascript
{"data":{"maxItem":{"num":NaN,"owner":"p"},"minItem":{"num":NaN,"owner":"p"},"play_message":"Darn, how did I lose that hand!","player_cards":[{"num":NaN,"owner":"p"},{"num":NaN,"owner":"p"},{"num":NaN,"owner":"p"},{"num":NaN,"owner":"p"},{"num":NaN,"owner":"p"}],"player_score":6,"score_message":"","shifty_score":4,"shiftys_cards":[{"num":0.0,"owner":"s"},{"num":9.0,"owner":"s"}],"win_lose_tie_na":"n"},"request":true}
```
It is enough to do it once, as then all other games will be a tie, thus resulting in a player’s win.

---
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
## [Game Cartridges: Vol 2](/10%20-%20Game%20Cartridges%3A%20Vol%202/README.md)
## [Game Cartridges: Vol 3](/11%20-%20Game%20Cartridges%3A%20Vol%203/README.md)