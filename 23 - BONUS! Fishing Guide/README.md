# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## BONUS! Fishing Guide
Difficulty: :christmas_tree:  
Catch twenty different species of fish that live around Geese Islands. When you're done, report your findings to Poinsettia McMittens on the Island of Misfit Toys.

### Hints
#### Become the Fish
*From: Poinsettia McMittens*
Perhaps there are some clues about the local aquatic life located in the HTML source code.

### Solution
I analyzed the source code identifying the comment `<!-- <a href='fishdensityref.html'>[DEV ONLY] Fish Density Reference</a> -->` and I was able to download the content but it didn’t turn out useful for this challenge. Instead I wrote a python script based on [Polle Vanhoof’s santas_little_helper](https://github.com/pollev/santas_little_helper) from KringleCon 2019 to automatically fish using websockets:
```python
import asyncio
import websocket
import ssl
import json

base_ws_url = 'wss://2023.holidayhackchallenge.com/ws'
fish_ws_url = "wss://2023.holidayhackchallenge.com/sail?dockSlip={}"
login_user = 'HEY! Were you looking at my email?'
login_pass = 'HEY! Were you looking at my password?'

def login(ws, user, password):
    print("--> LOGIN")
    ws.send('{"type":"WS_CONNECTED","protocol":"43ae08fd-9cf2-4f54-a6a6-8454aef59581"}')
    ws.recv()
    ws.send('{"type":"WS_LOGIN","usernameOrEmail":"%s","password":"%s"}' % (login_user, login_pass))
    userid = list(json.loads(ws.recv())['users'].keys())[0]
    print("--> LOGGED IN, USER ID [{}]".format(userid))
    return userid

def sail(ws):
    # Sail
    print("--> GET FISH WS ID")
    base_ws.send('{"type":"setSail"}')
    ws_response = base_ws.recv()
    while not "SET_SAIL" in ws_response:
        ws_response = base_ws.recv()
    fish_ws_id = json.loads(ws_response)['dockSlip']
    print("--> GOT FISH WS ID [{}]".format(fish_ws_id))
    return fish_ws_id

if __name__ == "__main__":
    print("--> CONNECTING TO BASE WS")
    base_ws = websocket.WebSocket(sslopt={"cert_reqs": ssl.CERT_NONE})
    base_ws.connect(base_ws_url)
    print("--> CONNECTED TO FISH WS")

    userid = login(base_ws, login_user, login_pass)
    fish_ws_id = sail(base_ws)

    print("--> CONNECTING TO FISH WS ID [{}]".format(fish_ws_id))
    fish_ws = websocket.WebSocket(sslopt={"cert_reqs": ssl.CERT_NONE})
    fish_ws.connect(fish_ws_url.format(fish_ws_id))
    print("--> CONNECTED TO FISH WS")

    user_evt_start = 'e:{"' + str(userid) + '":'
    user_inf_start = 'i:{"uid":' + str(userid)

    print("--> GETTING CAUGHT FISH")
    userInfo = None
    while not userInfo:
        ws_response = fish_ws.recv()
        if ws_response.startswith(user_inf_start):
            userInfo = json.loads(ws_response[2:])
    fishCaught = []
    for fish in userInfo['fishCaught']:
        fishCaught.append(fish['name'])
    print("--> CAUGHT [{}] FISHES: {}".format(len(fishCaught), fishCaught))
    print("--> POSITION IS x:[{}] y:[{}]".format(userInfo['x'], userInfo['y']))

    while True:
        print("--> CASTING LINE")
        fish_ws.send('cast')
        onTheLine = False
        while not onTheLine:
            ws_response = fish_ws.recv()
            if ws_response.startswith(user_evt_start) and "onTheLine" in ws_response:
                ws_response = json.loads(ws_response[2:])
                onTheLine = ws_response[list(ws_response.keys())[0]]['onTheLine']
        print("--> [{}] IS ON THE LINE".format(onTheLine))
        print("--> SENDING REEL COMMAND")
        fish_ws.send('reel')
        ws_response = fish_ws.recv()
        while not 'f:{"fish":' in ws_response:
            ws_response = fish_ws.recv()
        if onTheLine in fishCaught:
            print("--> ALREADY HAVE [{}]".format(onTheLine))
        else:
            fishCaught.append(onTheLine)
            print("--> GOT NEW FISH [{}]".format(ws_response))
            print("--> CAUGHT [{}] FISHES: {}".format(len(fishCaught), fishCaught))
```

I let it run for a while and it worked but also it obviously had to crash… so… I could fix the script… or:
```bash
while true; do python3 fishing.py; done
```

After a night, I caught almost all the fishes and got the objective by speaking to Poinsettia again.


---
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