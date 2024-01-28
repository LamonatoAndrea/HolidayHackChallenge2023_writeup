# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!

## thedead@dellian:~$ whoami
```bash
thedead@dellian:~$ whoami

Andrea Lamonato - Cyber Security Engineer

mailto: lamonato.andrea@gmail.com
Github: https://github.com/LamonatoAndrea
Linkedin: https://www.linkedin.com/in/andrea-lamonato/

       ___  ___     _____     _____     
       |  \/  |    |_   _|   |_   _|         
       | .  . |      | |       | |           
       | |\/| |      | |       | |           
       | |  | |  _   | |  _   _| |_  _       
       \_|  |_/ (_)  \_/ (_)  \___/ (_)      
               _                         _     
              | |                       (_)    
   _ __   ___ | |_    __ _   _   _ _ __  _     
  | '_ \ / _ \| __|  / _` | | | | | '_ \| |    
  | | | | (_) | |_  | (_| | | |_| | | | | |    
  |_| |_|\___/ \__|  \__,_|  \__,_|_| |_|_|    
  __ _ _ __   __ _  __ _ _ __ __ _ _ __ ___  
 / _` | '_ \ / _` |/ _` | '__/ _` | '_ ` _ \ 
| (_| | | | | (_| | (_| | | | (_| | | | | | |
 \__,_|_| |_|\__,_|\__, |_|  \__,_|_| |_| |_|
                    __/ |                    
                   |___/                     
```

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

## Conclusions
Hey folks, nice seeing you again! This is like the 5th year in a row, it starts to become a habit. Thanks for this year’s challenge: Jack is back! Obviously AI was used along the whole thing, to write code and
especially to FORMAT IT - such a time saver! Those GB challenges were NICE and coincidentally I
just recently started playing Pokemon Black with the Lemuroid emulator, I don’t think I’ll play anything
similar to a GameBoy for a while now! KUDOS again for the effort, I would have never expected lockpicking or satellite challenges! As someone said [Every Rose Has Its Thorn](https://www.youtube.com/watch?v=j2r2nDhTzO4) and for me it was [The Captain's Comms](https://github.com/LamonatoAndrea/KringleCon5/tree/master/04%20-%20Recover%20the%20Web%20Ring/04.06%20-%20Glamtariel's%20Fountain). I would much rather spend days & nights getting defeated by Game Cartridges: Vol 2 than trying to guess a filename, but that’s me. So...till we meet each other next year!

### Gotta fit ‘em all
As this year I could not give you many memes, I wrote a quick downloader that given a JSON of all fishes,
obtainable from one of the `i:` websockets message. The following script can download all the images:
```python
import requests
import requests
import shutil
import json

base_url = "https://2023.holidayhackchallenge.com/sea/assets/fish/{}.png"
fishes = json.load(open('fish.json', 'r'))

for fish in fishes:
       r = requests.get(base_url.format(fish['hash']), stream=True)
       if r.status_code == 200:
              with open('imgs/fish_downloaded_images/{}_{}.png'.format(fish['name'], fish['hash']), 'wb') as f:
                     r.raw.decode_content = True
                     shutil.copyfileobj(r.raw, f)
                     print("Saved [{}]".format(fish['name']))
```
Then Gimp’ed it and here I leave you with this nice fish picture. I wanted this to be the last thing you’d see in the report. Say hi to Piscis Cyberneticus Skodo (aka Ed Skoudis) for me and drop me an email if you’d like the image. It has been kind of a thing the last 2 years
![gotta_catch_em_all](imgs/Montage_1024.png)
