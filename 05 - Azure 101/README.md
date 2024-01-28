# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Azure 101
Difficulty: :christmas_tree::christmas_tree:  
Help Sparkle Redberry with some Azure command line skills. Find the elf and the terminal on Christmas Island.

### Hints
#### Azure CLI Reference
*From: Sparkle Redberry*  
The Azure CLI tools come with a builtin help system, but Microsoft also provides this [handy cheatsheet](https://learn.microsoft.com/en-us/cli/azure/reference-index?view=azure-cli-latest).

### Solution
```bash
You may not know this but the Azure cli help messages are very easy to access. First, try typing:
$ az help | less
───────────────────────────────────────────────────────────────────────
elf@7467e82d184b:~$ az help | less
```
```bash
Next, you've already been configured with credentials. Use 'az' and your 'account' to 'show' your current details and make sure to pipe to less ( | less )
───────────────────────────────────────────────────────────────────────
elf@7467e82d184b:~$ az account show
{
	"environmentName": "AzureCloud",
	"id": "2b0942f3-9bca-484b-a508-abdae2db5e64",
	"isDefault": true,
	"name": "northpole-sub",
	"state": "Enabled",
	"tenantId": "90a38eda-4006-4dd5-924c-6ca55cacc14d",
	"user": {
		"name": "northpole@northpole.invalid",
		"type": "user"
	}
}
```
```bash
Excellent! Now get a list of resource groups in Azure.
For more information: https://learn.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest
───────────────────────────────────────────────────────────────────────
elf@7467e82d184b:~$ az group list
[
	{
		"id": "/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resourceGroups/northpole-rg1",
		# Output removed to shorten report
		"name": "northpole-rg1",
		# Output removed to shorten report
	},
	{
		"id": "/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resourceGroups/northpole-rg2",
		# Output removed to shorten report
		"name": "northpole-rg2",
		# Output removed to shorten report
	}
]
```
```bash
Ok, now use one of the resource groups to get a list of function apps. For more information: https://learn.microsoft.com/en-us/cli/azure/functionapp?view=azure-cli-latest
Note: Some of the information returned from this command relates to other cloud assets used by Santa and his elves.
───────────────────────────────────────────────────────────────────────
elf@7467e82d184b:~$ az functionapp list -g northpole-rg1
[
	{
		"appServicePlanId": "/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resourceGroups/nor
		thpole-rg1/providers/Microsoft.Web/serverfarms/EastUSLinuxDynamicPlan",
		# Output removed to shorten report
		"defaultHostName": "northpole-ssh-certs-fa.azurewebsites.net",
		"enabled": true,
		"enabledHostNames": [
			"northpole-ssh-certs-fa.azurewebsites.net"
		],
		# Output removed to shorten report
		"hostNames": [
			"northpole-ssh-certs-fa.azurewebsites.net"
		],
		# Output removed to shorten report
		"id": "/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resourceGroups/northpole-rg1/pro
		viders/Microsoft.Web/sites/northpole-ssh-certs-fa",
		"identity": {
			"principalId": "d3be48a8-0702-407c-89af-0319780a2aea",
			"tenantId": "90a38eda-4006-4dd5-924c-6ca55cacc14d",
			"type": "SystemAssigned",
			"userAssignedIdentities": null
		},
		# Output removed to shorten report
		"name": "northpole-ssh-certs-fa",
		# Output removed to shorten report
		"tags": {
			"create-cert-func-url-path": "/api/create-cert?code=candy-cane-twirl",
			"project": "northpole-ssh-certs"
		},
		# Output removed to shorten report
	}
]
```
```bash
Find a way to list the only VM in one of the resource groups you have access to.
For more information: https://learn.microsoft.com/en-us/cli/azure/vm?view=azure-cli-latest
───────────────────────────────────────────────────────────────────────
elf@7467e82d184b:~$ az vm list -g northpole-rg2
[
	{
		"id": "/subscriptions/2b0942f3-9bca-484b-a508-abdae2db5e64/resourceGroups/northpole-rg2/pro
		viders/Microsoft.Compute/virtualMachines/NP-VM1",
		"location": "eastus",
		"name": "NP-VM1",
		# Output removed to shorten report
				"name": "VM1_OsDisk_1"
				}
			},
			"vmId": "e5f16214-18be-4a31-9ebb-2be3a55cfcf7"
		},
		"resourceGroup": "northpole-rg2",
		"tags": {}
	}
]
```
```bash
Find a way to invoke a run-command against the only Virtual Machine (VM) so you can RunShellScript and get a directory listing to reveal a file on the Azure VM.
For more information: https://learn.microsoft.com/en-us/cli/azure/vm/run-command?view=azure-cli-latest#az-vm-run-command-invoke
───────────────────────────────────────────────────────────────────────
elf@7467e82d184b:~$ az vm run-command invoke -g northpole-rg2 -n NP-VM1 --command-id RunShellScript --scripts "ls"
{
	"value": [
		{
			"code": "ComponentStatus/StdOut/succeeded",
			"displayStatus": "Provisioning succeeded",
			"level": "Info",
			"message": "bin\netc\nhome\njinglebells\nlib\nlib64\nusr\n",
			"time": 1703876493
		},
		# Output removed to shorten report
	]
}
```
```bash
Great, you did it all!
```

---
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
## [Reportinator](/04%20-%20Reportinator/README.md)