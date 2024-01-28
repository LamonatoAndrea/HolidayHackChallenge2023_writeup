# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## 	The Captain's Comms
Difficulty: :christmas_tree::christmas_tree::christmas_tree::christmas_tree::christmas_tree:  
Speak with Chimney Scissorsticks on Steampunk Island about the interesting things the captain is hearing on his new Software Defined Radio. You'll need to assume the `GeeseIslandsSuperChiefCommunicationsOfficer` role.

### Hints
#### Comms JWT Intro
*From: Chimney Scissorsticks*  
A great introduction to JSON Web Tokens is available from [Auth0](https://jwt.io/introduction).
#### Comms Abbreviations
*From: Chimney Scissorsticks*  
I hear the Captain likes to abbreviate words in his filenames; shortening some words to just 1,2,3, or 4 letters.
#### Comms Journal
*From: Chimney Scissorsticks*  
I've seen the Captain with [his Journal](https://elfhunt.org/static/images/captainsJournal.png) visiting Pixel Island!
#### Comms Private Key
*From: Chimney Scissorsticks*  
Find a private key, update an existing JWT!
#### Comms Web Interception Proxies
*From: Chimney Scissorsticks*  
Web Interception proxies like [Burp](https://portswigger.net/burp) and [Zap](https://www.zaproxy.org/) make web sites fun!

### Solution
#### First steps
First thing first, I clicked everywhere and downloaded all the images I could access: [Background](https://captainscomms.com/static/images/instructions.png), [Just Watch This Owner’s Manual Volume I](https://captainscomms.com/static/images/ownMan1.png), [Just Watch This Owner’s Manual Volume II](https://captainscomms.com/static/images/ownMan2.png), [Just Watch This Appendix A - Decoder Index](https://captainscomms.com/static/images/ownMan3.png), [Just Watch This: Owner’s Card](https://captainscomms.com/static/images/ownCard.png), [Captain’s To-Do List](https://captainscomms.com/static/images/capNotes.png) and [Captain’s ChatNPT Initial To-Do List](https://captainscomms.com/static/images/chatNPTList.png).

Then looking at the cookies I saw `justWatchThisRole=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJISEMgMjAyMyBDYXB0YWluJ3MgQ29tbXMiLCJpYXQiOjE2OTk0ODU3OTUuMzQwMzMyNywiZXhwIjoxODA5OTM3Mzk1LjM0MDMzMjcsImF1ZCI6IkhvbGlkYXkgSGFjayAyMDIzIiwicm9sZSI6InJhZGlvVXNlciJ9.BGxJLMZw-FHI9NRl1xt_f25EEnFcAYYu173iqf-6dgoa_X3V7SAe8scBbARyusKq2kEbL2VJ3T6e7rAVxy5Eflr2XFMM5M-Wk6Hqq1lPvkYPfL5aaJaOar3YFZNhe_0xXQ__k__oSKN1yjxZJ1WvbGuJ0noHMm_qhSXomv4_9fuqBUg1t1PmYlRFN3fNIXh3K6JEi5CvNmDWwYUqhStwQ29SM5zaeLHJzmQ1Ey0T1GG-CsQo9XnjIgXtf9x6dAC00LYXe1AMly4xJM9DfcZY_KjfP-viyI7WYL0IJ_UOtIMMN0u-XO8Q_F3VO0NyRIhZPfmALOM2Liyqn6qYMN0u-XO8Q_F3VO0NyRIhZPfmALOM2Liyqn6qYTjLnkg` that is a signed JWT with an unknown key and decodes to:
```javascript 
HEADER {"alg": "RS256", "typ": "JWT"}
PAYLOAD {"iss": "HHC 2023 Captain's Comms", "iat": 1699485795.3403327, "exp": 1809937395.3403327, "aud": "Holiday Hack 2023", "role": "radioUser"}
```