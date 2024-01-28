import json

emails = json.load(open('phishing.db', 'r'))["data"]["data"][0]["rows"]

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