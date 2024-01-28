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
HEADER --> {"alg": "RS256", "typ": "JWT"}
PAYLOAD --> {"iss": "HHC 2023 Captain's Comms", "iat": 1699485795.3403327, "exp": 1809937395.3403327, "aud": "Holiday Hack 2023", "role": "radioUser"}
```

#### The rMonitor.tok and capsPubKey.key
The Captain doesn’t appear to be too tech savvy so I expected to find the file `rMonitor.tok` in its default directory. After a lot more than what I’d like to admit, I noticed that the `/checkRole` request was authenticating using the JWT as a Bearer token, and I was finally able to obtain `rMonitor.tok` and the `capsPubKey.key`:
```bash
thedead@dellian:~/hhc2023/The Captain's Comms$ curl -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJISEMgMjAyMyBDYXB0YWluJ3MgQ29tbXMiLCJpYXQiOjE2OTk0ODU3OTUuMzQwMzMyNywiZXhwIjoxODA5OTM3Mzk1LjM0MDMzMjcsImF1ZCI6IkhvbGlkYXkgSGFjayAyMDIzIiwicm9sZSI6InJhZGlvVXNlciJ9.BGxJLMZw-FHI9NRl1xt_f25EEnFcAYYu173iqf-6dgoa_X3V7SAe8scBbARyusKq2kEbL2VJ3T6e7rAVxy5Eflr2XFMM5M-Wk6Hqq1lPvkYPfL5aaJaOar3YFZNhe_0xXQ__k__oSKN1yjxZJ1WvbGuJ0noHMm_qhSXomv4_9fuqBUg1t1PmYlRFN3fNIXh3K6JEi5CvNmDWwYUqhStwQ29SM5zaeLHJzmQ1Ey0T1GG-CsQo9XnjIgXtf9x6dAC00LYXe1AMly4xJM9DfcZY_KjfP-viyI7WYL0IJ_UOtIMMN0u-XO8Q_F3VO0NyRIhZPfmALOM2Liyqn6qYTjLnkg' https://captainscomms.com/jwtDefault/rMonitor.tok
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJISEMgMjAyMyBDYXB0YWluJ3MgQ29tbXMiLCJpYXQiOjE2OTk0ODU3OTUuMzQwMzMyNywiZXhwIjoxODA5OTM3Mzk1LjM0MDMzMjcsImF1ZCI6IkhvbGlkYXkgSGFjayAyMDIzIiwicm9sZSI6InJhZGlvTW9uaXRvciJ9.f_z24CMLim2JDKf8KP_PsJmMg3l_V9OzEwK1E_IBE9rrIGRVBZjqGpvTqAQQSesJD82LhK2h8dCcvUcF7awiAPpgZpcfM5jdkXR7DAKzaHAV0OwTRS6x_Uuo6tqGMu4XZVjGzTvba-eMGTHXyfekvtZr8uLLhvNxoarCrDLiwZ_cKLViRojGuRIhGAQCpumw6NTyLuUYovy_iymNfe7pqsXQNL_iyoUwWxfWcfwch7eGmf2mBrdEiTB6LZJ1ar0FONfrLGX19TV25Qy8auNWQIn6jczWM9WcZbuOIfOvlvKhyVWbPdAK3zB7OOm-DbWm1aFNYKr6JIRDLobPfiqhKg
```
```bash
thedead@dellian:~/hhc2023/The Captain's Comms$ curl -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJISEMgMjAyMyBDYXB0YWluJ3MgQ29tbXMiLCJpYXQiOjE2OTk0ODU3OTUuMzQwMzMyNywiZXhwIjoxODA5OTM3Mzk1LjM0MDMzMjcsImF1ZCI6IkhvbGlkYXkgSGFjayAyMDIzIiwicm9sZSI6InJhZGlvVXNlciJ9.BGxJLMZw-FHI9NRl1xt_f25EEnFcAYYu173iqf-6dgoa_X3V7SAe8scBbARyusKq2kEbL2VJ3T6e7rAVxy5Eflr2XFMM5M-Wk6Hqq1lPvkYPfL5aaJaOar3YFZNhe_0xXQ__k__oSKN1yjxZJ1WvbGuJ0noHMm_qhSXomv4_9fuqBUg1t1PmYlRFN3fNIXh3K6JEi5CvNmDWwYUqhStwQ29SM5zaeLHJzmQ1Ey0T1GG-CsQo9XnjIgXtf9x6dAC00LYXe1AMly4xJM9DfcZY_KjfP-viyI7WYL0IJ_UOtIMMN0u-XO8Q_F3VO0NyRIhZPfmALOM2Liyqn6qYTjLnkg' https://captainscomms.com/jwtDefault/keys/capsPubKey.key
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsJZuLJVB4EftUOQN1Auw
VzJyr1Ma4xFo6EsEzrkprnQcdgwz2iMM76IEiH8FlgKZG1U0RU4N3suI24NJsb5w
J327IYXAuOLBLzIN65nQhJ9wBPR7Wd4Eoo2wJP2m2HKwkW5Yadj6T2YgwZLmod3q
n6JlhN03DOk1biNuLDyWao+MPmg2RcxDR2PRnfBartzw0HPB1yC2Sp33eDGkpIXa
cx/lGVHFVxE1ptXP+asOAzK1wEezyDjyUxZcMMmV0VibzeXbxsXYvV3knScr2WYO
qZ5ssa4Rah9sWnm0CKG638/lVD9kwbvcO2lMlUeTp7vwOTXEGyadpB0WsuIKuPH6
uQIDAQAB
-----END PUBLIC KEY-----
```
Setting the value of the cookie `justWatchThisRole` to the content of `rMonitor.tok` I was able to access the `Just Watch This Signal Display` that returned a [gif](https://captainscomms.com/static/images/WaterfallPopOut.gif) with clickable peaks highlighted in the image below:
![07_01_WaterfallPopOut_with_peaks](imgs/07_01_WaterfallPopOut_with_peaks.png)

Unfortunately, when clicking the peaks, I was being presented with an error requiring me to have the radioDecoder role.

#### The rDecoder.tok - Leap of faith
After so many failed attempts that it was just “not worth not to try” and in a total leap of faith, I eventually tried the url https://captainscomms.com/jwtDefault/rDecoder.tok and obtained the `rDecoder.tok`:
```bash
thedead@dellian:~/hhc2023/The Captain's Comms$ curl -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJISEMgMjAyMyBDYXB0YWluJ3MgQ29tbXMiLCJpYXQiOjE2OTk0ODU3OTUuMzQwMzMyNywiZXhwIjoxODA5OTM3Mzk1LjM0MDMzMjcsImF1ZCI6IkhvbGlkYXkgSGFjayAyMDIzIiwicm9sZSI6InJhZGlvTW9uaXRvciJ9.f_z24CMLim2JDKf8KP_PsJmMg3l_V9OzEwK1E_IBE9rrIGRVBZjqGpvTqAQQSesJD82LhK2h8dCcvUcF7awiAPpgZpcfM5jdkXR7DAKzaHAV0OwTRS6x_Uuo6tqGMu4XZVjGzTvba-eMGTHXyfekvtZr8uLLhvNxoarCrDLiwZ_cKLViRojGuRIhGAQCpumw6NTyLuUYovy_iymNfe7pqsXQNL_iyoUwWxfWcfwch7eGmf2mBrdEiTB6LZJ1ar0FONfrLGX19TV25Qy8auNWQIn6jczWM9WcZbuOIfOvlvKhyVWbPdAK3zB7OOm-DbWm1aFNYKr6JIRDLobPfiqhKg' https://captainscomms.com/jwtDefault/rDecoder.tok
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJISEMgMjAyMyBDYXB0YWluJ3MgQ29tbXMiLCJpYXQiOjE2OTk0ODU3OTUuMzQwMzMyNywiZXhwIjoxODA5OTM3Mzk1LjM0MDMzMjcsImF1ZCI6IkhvbGlkYXkgSGFjayAyMDIzIiwicm9sZSI6InJhZGlvRGVjb2RlciJ9.cnNu6EjIDBrq8PbMlQNF7GzTqtOOLO0Q2zAKBRuza9bHMZGFx0pOmeCy2Ltv7NUPv1yT9NZ-WapQ1-GNcw011Ssbxz0yQO3Mh2Tt3rS65dmb5cmYIZc0pol-imtclWh5s1OTGUtqSjbeeZ2QAMUFx3Ad93gR20pKpjmoeG_Iec4JHLTJVEksogowOouGyDxNAagIICSpe61F3MY1qTibOLSbq3UVfiIJS4XvGJwqbYfLdbhc-FvHWBUbHhAzIgTIyx6kfONOH9JBo2RRQKvN-0K37aJRTqbq99mS4P9PEVs0-YIIufUxJGIW0TdMNuVO3or6bIeVH6CjexIl14w6fg
```

This then allowed to access the content of the peaks in the previous image, revealing the content of the peaks:
|                                    |                                                      |
| ---------------------------------- | ---------------------------------------------------- |
| Just Watch This CW Decoder         | ![08_00_02_dcdCW_cut](imgs/08_00_02_dcdCW_cut.png)   |
| Just Watch This Audio-Text Decoder | ![08_01_02_dcdNUM_cut](imgs/08_01_02_dcdNUM_cut.png) |
| Just Watch This RadioFax Decoder   | ![08_02_02_dcdFX_cut](imgs/08_02_02_dcdFX_cut.png)   |