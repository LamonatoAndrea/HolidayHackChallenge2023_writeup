# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Snowball Fight
Difficulty: :christmas_tree::christmas_tree:  
Noel Boetie used ChatNPT to write a pentest report. Go to Christmas Island and help him clean it up.

### Solution
The wrong findings in [reportinator](https://hhc23-reportinator-dot-holidayhack2023.ue.r.appspot.com/) are:
> **3. Remote Code Execution via Java Deserialization of Stored Database Objects**
>
> The finding references port `88555/TCP` which is not a valid port.

> **6. Stored Cross-Site Scripting Vulnerabilities**
>
> The finding highlights how XSS are due to insufficient “encoding”, while they are related to insufficient input/output validation.

> **9. Internal IP Address Disclosure**
>
> The finding references an `HTTP 7.4.33 request`, which seems incorrect. Additionally, the IP address in `Location: https://1192.168.112.16/content/` is not a valid one. The first recommendation is about setting the Windows registration key in the location header, which is not useful.

### Actually...I bruteforced it