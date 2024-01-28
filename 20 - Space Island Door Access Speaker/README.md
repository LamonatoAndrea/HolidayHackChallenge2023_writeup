# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## 	Space Island Door Access Speaker
Difficulty: :christmas_tree::christmas_tree::christmas_tree:  
There's a door that needs opening on Space Island! Talk to Jewel Loggins there for more information.

### Hints
#### MFA: Something You Are
*From: Jewel Loggins*  
It seems the Access Speaker is programmed to only accept Wombley's voice. Maybe you could get a sample of his voice and use an AI tool to simulate Wombley speaking the passphrase.
#### MFA: Something You Know
*From: Jewel Loggins*  
Wombley says a specific phrase into the Access Speaker. He works in the Research Department and everything they do it super secret, so it may be a challenge to find out what the phrase is. Ribb also works in that department. Try to find and ask him.

### Solution
I could obtain a pretty good sample of Wombley’s voice as he gave me his [audiobook](https://www.holidayhackchallenge.com/2023/wombleycube_the_enchanted_voyage.mp3.zip) in Chiaroscuro City when we spoke. I then used https://play.ht/ to make him say the sentence obtained in the [Active Directory]() challenge. Uploaded it and - boom - the door unlocked!
#### Additional flag?
I did not understand if this was meant to be used somewhere else, but applying a spectrum analyzer to Wombley’s audiobook an additional flag appears:
![{FLG:Airp0rtL0cker_n°154}](imgs/%7BFLG%3AAirp0rtL0cker_n°154%7D.png)