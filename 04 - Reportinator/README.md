# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Reportinator
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

### Thanks to @mrjasinski
Thank you for pointing out that the link was fixed 🙂

---
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
## [Conclusions](/README.md#conclusions)
---
## [thedead@dellian:~$ whoami](/README.md#thedeaddellian-whoami)
## [Holiday Hack Orientation](/01%20-%20Holiday%20Hack%20Orientation/README.md)
## [Snowball Fight](/02%20-%20Snowball%20Fight/README.md)
## [Linux 101](/03%20-%20Linux%20101/README.md)