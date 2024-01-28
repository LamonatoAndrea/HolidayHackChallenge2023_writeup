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