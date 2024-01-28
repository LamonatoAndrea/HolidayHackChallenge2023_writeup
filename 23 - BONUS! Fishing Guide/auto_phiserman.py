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