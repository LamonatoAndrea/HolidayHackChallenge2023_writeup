# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Phish Detection Agency
Difficulty: :christmas_tree::christmas_tree:  
Fitzy Shortstack on Film Noir Island needs help battling dastardly phishers. Help sort the good from the bad!

### Hints
#### DMARC, DKIM, and SPF, oh my!
*From: Fitzy Shortstack*
Discover the essentials of email security with DMARC, DKIM, and SPF at [Cloudflare's Guide](https://www.cloudflare.com/learning/email-security/dmarc-dkim-spf/).

### Solution
I downloaded the email database through the guide [“Export IndexedDB from a web app using devtools” from David Fahlander](https://dfahlander.medium.com/export-indexeddb-from-a-web-app-using-devtools-62c55a8996a1) so I could overthink this challenge easier. Once I decided to give it a proper look, I came up with this script to identify the baddies:
```python
import json

emails = json.load(open('phishing.db.json.formatted.js', 'r'))["data"]["data"][0]["rows"]

for email in emails:
	validMail = True
	dmarc = None
	dkim = None
	headers = email['headers'].split("\n")
	sender_domain = email['from'].split('@')[1]

	for header in headers:
		if "DMARC" in header:
			dmarc = header
		if "DKIM" in header:
			dkim = header
	
	if not dmarc or "Pass" not in dmarc:
		print("DMARC not passed -- {}".format(dmarc), end='')
		validMail = False
	elif sender_domain not in dkim:
		print("DKIM not passed -- {} != {}".format(sender_domain, dkim), end='')
		validMail = False

	if not validMail:
		print(" --> BADDY --> {}".format(email))
```
Two `if`s, literally, gave me the list of the 10 baddies:
```bash
DMARC not passed -- DMARC: Fail --> BADDY --> {'from': 'victor.davis@geeseislands.com', 'to': 'admin.research@geeseislands.com', 'headers': 'Return-Path: <victor.davis@anotherdomain.com>\nReceived: from anotherdomain.com\nDKIM-Signature: v=1; a=rsa-sha256; d=anotherdomain.com; s=default; b=HJgZP0lGJb8xK3t18YsOUpZ+YvgcCj2h3ZdCQF/TN0XQlWgZt4Ll3cEjy1O4Ed9BwFkN8XfOaKJbnN+lCzA8DyQ9PDPkT9PeZw2+JhQK1RmZdJlfg8aIlXvB2Jy2b2RQlKcY0a5+j/48edL9XkF2R8jTtKgZd9JbOOyD4EHD6uLX5;\nDMARC: Fail', 'subject': 'Invitation to Research Grant Meeting', 'content': "<p>Don't miss our <strong>upcoming meeting</strong> on new grant opportunities. We'll be discussing how ChatNPT can aid in our research initiatives!</p>", 'date': '2023-08-15 11:30:00', 'status': 1, 'id': 2}
DMARC not passed -- DMARC: Fail --> BADDY --> {'from': 'xavier.jones@geeseislands.com', 'to': 'admin.itsecurity@geeseislands.com', 'headers': 'Return-Path: <xavier.jones@unauthorizedsource.com>\nReceived: from unauthorizedsource.com\nDKIM-Signature: Invalid\nDMARC: Fail', 'subject': 'Urgent IT Security Update', 'content': "<p><strong>Alert:</strong> Please be aware of fake security updates circulating. Remember, all genuine updates will mention 'ChatNPT' for verification.</p>", 'date': '2023-08-02 10:45:00', 'status': 1, 'id': 8}
DMARC not passed -- DMARC: Fail --> BADDY --> {'from': 'steven.gray@geeseislands.com', 'to': 'admin.procurement@geeseislands.com', 'headers': 'Return-Path: <steven.gray@geeseislands.com>\nReceived: from mail.geeseislands.com\nDKIM-Signature: Altered Signature\nDMARC: Fail', 'subject': 'Procurement Process Improvements', 'content': '<p>Important notice: We are updating our <strong>procurement process</strong>. How can ChatNPT help us in this transition?</p>', 'date': '2023-09-05 14:50:00', 'status': 1, 'id': 15}
DKIM not passed -- geeseislands.com != DKIM-Signature: v=1; a=rsa-sha256; d=unauthorized.com; s=default; b=HJgZP0lGJb8xK3t18YsOUpZ+YvgcCj2h3ZdCQF/TN0XQlWgZt4Ll3cEjy1O4Ed9BwFkN8XfOaKJbnN+lCzA8DyQ9PDPkT9PeZw2+JhQK1RmZdJlfg8aIlXvB2Jy2b2RQlKcY0a5+j/48edL9XkF2R8jTtKgZd9JbOOyD4EHD6uLX5; --> BADDY --> {'from': 'laura.green@geeseislands.com', 'to': 'admin.security@geeseislands.com', 'headers': 'Return-Path: <laura.green@unauthorized.com>\nReceived: from unauthorized.com\nDKIM-Signature: v=1; a=rsa-sha256; d=unauthorized.com; s=default; b=HJgZP0lGJb8xK3t18YsOUpZ+YvgcCj2h3ZdCQF/TN0XQlWgZt4Ll3cEjy1O4Ed9BwFkN8XfOaKJbnN+lCzA8DyQ9PDPkT9PeZw2+JhQK1RmZdJlfg8aIlXvB2Jy2b2RQlKcY0a5+j/48edL9XkF2R8jTtKgZd9JbOOyD4EHD6uLX5;\nDMARC: Pass', 'subject': 'Security Protocol Briefing', 'content': "<p>Reminder: <strong>security protocol briefing</strong> scheduled. We'll cover how ChatNPT can be used to enhance our security measures.</p>", 'date': '2023-07-20 09:15:00', 'status': 1, 'id': 17}
DKIM not passed -- geeseislands.com != DKIM-Signature: v=1; a=rsa-sha256; d=unknownsource.com; s=default; b=HJgZP0lGJb8xK3t18YsOUpZ+YvgcCj2h3ZdCQF/TN0XQlWgZt4Ll3cEjy1O4Ed9BwFkN8XfOaKJbnN+lCzA8DyQ9PDPkT9PeZw2+JhQK1RmZdJlfg8aIlXvB2Jy2b2RQlKcY0a5+j/48edL9XkF2R8jTtKgZd9JbOOyD4EHD6uLX5; --> BADDY --> {'from': 'nancy@geeseislands.com', 'to': 'admin.publicrelations@geeseislands.com', 'headers': 'Return-Path: <nancy@unknownsource.com>\nReceived: from unknownsource.com\nDKIM-Signature: v=1; a=rsa-sha256; d=unknownsource.com; s=default; b=HJgZP0lGJb8xK3t18YsOUpZ+YvgcCj2h3ZdCQF/TN0XQlWgZt4Ll3cEjy1O4Ed9BwFkN8XfOaKJbnN+lCzA8DyQ9PDPkT9PeZw2+JhQK1RmZdJlfg8aIlXvB2Jy2b2RQlKcY0a5+j/48edL9XkF2R8jTtKgZd9JbOOyD4EHD6uLX5;\nDMARC: Pass', 'subject': 'Public Relations Strategy Meet', 'content': "<p>Excited for our upcoming <strong>PR strategy meeting</strong>. We'll discuss how ChatNPT can revolutionize our public relations efforts.</p>", 'date': '2023-09-30 11:45:00', 'status': 1, 'id': 19}
DMARC not passed -- DMARC: Fail --> BADDY --> {'from': 'rachel.brown@geeseislands.com', 'to': 'admin.customerrelations@geeseislands.com', 'headers': 'Return-Path: <rachel.brown@geeseislands.com>\nReceived: from mail.geeseislands.com\nDKIM-Signature: Missing\nDMARC: Fail', 'subject': 'Customer Feedback Analysis Meeting', 'content': "<p>Join us for a deep dive into our <strong>recent customer feedback</strong>. Let's see how ChatNPT can help us understand our clients better.</p>", 'date': '2023-08-18 13:35:00', 'status': 1, 'id': 21}
DMARC not passed -- DMARC: Fail --> BADDY --> {'from': 'ursula.morris@geeseislands.com', 'to': 'admin.legal@geeseislands.com', 'headers': 'Return-Path: <ursula.morris@differentdomain.com>\nReceived: from differentdomain.com\nDKIM-Signature: v=1; a=rsa-sha256; d=differentdomain.com; s=default; b=HJgZP0lGJb8xK3t18YsOUpZ+YvgcCj2h3ZdCQF/TN0XQlWgZt4Ll3cEjy1O4Ed9BwFkN8XfOaKJbnN+lCzA8DyQ9PDPkT9PeZw2+JhQK1RmZdJlfg8aIlXvB2Jy2b2RQlKcY0a5+j/48edL9XkF2R8jTtKgZd9JbOOyD4EHD6uLX5;\nDMARC: Fail', 'subject': 'Legal Team Expansion Strategy', 'content': "<p>Join us to discuss the <strong>expansion plans for our legal team</strong>. We'll also explore how ChatNPT might streamline our legal research.</p>", 'date': '2023-07-30 12:00:00', 'status': 1, 'id': 23}
DMARC not passed -- DMARC: Fail --> BADDY --> {'from': 'quincy.adams@geeseislands.com', 'to': 'admin.networking@geeseislands.com', 'headers': 'Return-Path: <quincy.adams@geeseislands.com>\nReceived: from mail.geeseislands.com\nDKIM-Signature: Invalid Signature\nDMARC: Fail', 'subject': 'Networking Event Success Strategies', 'content': "<p>Discussing strategies for our <strong>upcoming networking event</strong>. Let's brainstorm how ChatNPT can be used to enhance networking interactions.</p>", 'date': '2023-07-25 10:10:00', 'status': 1, 'id': 24}
DKIM not passed -- geeseislands.com != DKIM-Signature: v=1; a=rsa-sha256; d=externalserver.com; s=default; b=HJgZP0lGJb8xK3t18YsOUpZ+YvgcCj2h3ZdCQF/TN0XQlWgZt4Ll3cEjy1O4Ed9BwFkN8XfOaKJbnN+lCzA8DyQ9PDPkT9PeZw2+JhQK1RmZdJlfg8aIlXvB2Jy2b2RQlKcY0a5+j/48edL9XkF2R8jTtKgZd9JbOOyD4EHD6uLX5; --> BADDY --> {'from': 'michael.roberts@geeseislands.com', 'to': 'admin.compliance@geeseislands.com', 'headers': 'Return-Path: <michael.roberts@externalserver.com>\nReceived: from externalserver.com\nDKIM-Signature: v=1; a=rsa-sha256; d=externalserver.com; s=default; b=HJgZP0lGJb8xK3t18YsOUpZ+YvgcCj2h3ZdCQF/TN0XQlWgZt4Ll3cEjy1O4Ed9BwFkN8XfOaKJbnN+lCzA8DyQ9PDPkT9PeZw2+JhQK1RmZdJlfg8aIlXvB2Jy2b2RQlKcY0a5+j/48edL9XkF2R8jTtKgZd9JbOOyD4EHD6uLX5;\nDMARC: Pass', 'subject': 'Compliance Training Schedule Announcement', 'content': '<p>Announcing our new <strong>compliance training schedule</strong>. Interactive sessions with ChatNPT included!</p>', 'date': '2023-08-05 14:20:00', 'status': 1, 'id': 28}
DKIM not passed -- geeseislands.com != DKIM-Signature: v=1; a=rsa-sha256; d=otherdomain.com; s=default; b=HJgZP0lGJb8xK3t18YsOUpZ+YvgcCj2h3ZdCQF/TN0XQlWgZt4Ll3cEjy1O4Ed9BwFkN8XfOaKJbnN+lCzA8DyQ9PDPkT9PeZw2+JhQK1RmZdJlfg8aIlXvB2Jy2b2RQlKcY0a5+j/48edL9XkF2R8jTtKgZd9JbOOyD4EHD6uLX5; --> BADDY --> {'from': 'oliver.thomas@geeseislands.com', 'to': 'admin.research@geeseislands.com', 'headers': 'Return-Path: <oliver.thomas@otherdomain.com>\nReceived: from otherdomain.com\nDKIM-Signature: v=1; a=rsa-sha256; d=otherdomain.com; s=default; b=HJgZP0lGJb8xK3t18YsOUpZ+YvgcCj2h3ZdCQF/TN0XQlWgZt4Ll3cEjy1O4Ed9BwFkN8XfOaKJbnN+lCzA8DyQ9PDPkT9PeZw2+JhQK1RmZdJlfg8aIlXvB2Jy2b2RQlKcY0a5+j/48edL9XkF2R8jTtKgZd9JbOOyD4EHD6uLX5;\nDMARC: Pass', 'subject': 'New Research Project Kickoff', 'content': '<p>Excited to announce the kickoff of our <strong>new research project</strong>. How might ChatNPT contribute to our research methodologies?</p>', 'date': '2023-10-17 16:30:00', 'status': 1, 'id': 32}
```

#### ...code has been written...
While I was overthinking it and waiting for its moment, I wrote a random bruteforce script because, why not? It would be my pc working, not me 🙂 Code has been written and it is going to be reported:
```python
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
```

---
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
## [Na'an](/12%20-%20Na%27an/README.md)
## [KQL Kraken Hunt](/13%20-%20KQL%20Kraken%20Hunt/README.md)