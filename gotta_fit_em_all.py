import requests
import shutil
import json

base_url = "https://2023.holidayhackchallenge.com/sea/assets/fish/{}.png"
fishes = json.load(open('fish.json', 'r'))

for fish in fishes:
	r = requests.get(base_url.format(fish['hash']), stream=True)
	if r.status_code == 200:
		with open('download/{}_{}.png'.format(fish['name'], fish['hash']), 'wb') as f:
			r.raw.decode_content = True
			shutil.copyfileobj(r.raw, f)
			print("Saved [{}]".format(fish['name']))