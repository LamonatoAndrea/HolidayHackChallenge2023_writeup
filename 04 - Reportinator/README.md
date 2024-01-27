# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Snowball Fight
Difficulty: :christmas_tree::christmas_tree:  
Noel Boetie used ChatNPT to write a pentest report. Go to Christmas Island and help him clean it up.

### Solution
The wrong findings in [reportinator](https://hhc23-reportinator-dot-holidayhack2023.ue.r.appspot.com/) are:
> **3. Remote Code Execution via Java Deserialization of Stored Database Objects**  
> The finding references port `88555/TCP` which is not a valid port.

> **6. Stored Cross-Site Scripting Vulnerabilities**  
> The finding highlights how XSS are due to insufficient “encoding”, while they are related to insufficient input/output validation.

> **9. Internal IP Address Disclosure**  
> The finding references an `HTTP 7.4.33 request`, which seems incorrect. Additionally, the IP address in `Location: https://1192.168.112.16/content/` is not a valid one. The first recommendation is about setting the Windows registration key in the location header, which is not useful.

#### Actually...I bruteforced it
When I worked on the challenge, the finding “SQL Injection Vulnerability in Java Application” was definitely an hallucination because the link for OWASP ESAPI was pointing to https://owasp.org/www-project-developer-guide/draft/07-implementation/03-secure-libraries/01-esapi returning a 404 error code, after a quick sync with @mrjasinski, he confirmed that it was fixed afterward to https://owasp.org/www-project-enterprise-security-api/.

So... I bruteforced it... Code has been written and is gonna be reported 🙂
```python
import requests

url = 'https://hhc23-reportinator-dot-holidayhack2023.ue.r.appspot.com/check'

for i in range(0, int('111111111', 2) + 1):
	bin_i = '{0:09b}'.format(i)
	data = {
		'input-1': bin_i[0],
		'input-2': bin_i[1],
		'input-3': bin_i[2],
		'input-4': bin_i[3],
		'input-5': bin_i[4],
		'input-6': bin_i[5],
		'input-7': bin_i[6],
		'input-8': bin_i[7],
		'input-9': bin_i[8]
	}
	response = requests.post(url, data=data)
	print("ATTEMPT {}".format(bin_i))

	if "FAILURE" not in response.text:
		print("SOLUTION IS {}".format(bin_i))
		exit()
```