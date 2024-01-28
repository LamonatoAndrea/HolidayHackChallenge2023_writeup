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
| ------------------------------------------------ | ------------------ | --------------------------------- ------------- |
| alabaster_snowball@santaworkshopgeeseislands.org | cwombley@gmail.com | \[EXTERNAL\] Invoice foir reindeer food past due |