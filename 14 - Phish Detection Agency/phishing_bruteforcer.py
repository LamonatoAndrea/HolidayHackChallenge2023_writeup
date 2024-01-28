import json
import itertools
import requests
from datetime import datetime

senders = True
receivers = False

emails = json.load(open('phishing.db', 'r'))["data"]["data"][0]["rows"]

base_url = 'https://hhc23-phishdetect-dot-holidayhack2023.ue.r.appspot.com'
check_url = '{}/check-status'.format(base_url)

session = requests.Session()
print(session.get(base_url).cookies)

addresses = []
for email in emails:
	if senders and email["from"] not in addresses:
		addresses.append(email["from"])
	if receivers and email["to"] not in addresses:
		addresses.append(email["to"])

start_time = datetime.now()
dictionary = []
for i in range(1, len(addresses)):
	workList = list(itertools.combinations(addresses, r=i))
	count = 0
	for obj in workList:
		count += 1
		obj = list(obj)
		dictionary.append(obj)
		r = session.post(check_url, json=obj)
		
		delta = datetime.now() - start_time
		print("Ran for {} -- {}/{} -- {} -- {}".format(delta, count, len(workList), obj, r.text))
		
		if "Lists do not match" not in r.text:
			exit()