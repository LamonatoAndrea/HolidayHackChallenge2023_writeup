# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Hashcat
Difficulty: :christmas_tree::christmas_tree:  
Eve Snowshoes is trying to recover a password. Head to the Island of Misfit Toys and take a crack at it!

### Solution
The motd gives the [link](https://hashcat.net/wiki/doku.php?id=example_hashes) for hashcat’s hash modes. The file `hash.txt` contains the hash:
```
$krb5asrep$23$alabaster_snowball@XMAS.LOCAL:22865a2bceeaa73227ea4021879eda02$8f07417379e610e2dcb0621462fec3675bb5a850aba31837d541e50c622dc5faee60e48e019256e466d29b4d8c43cbf5bf7264b12c21737499cfcb73d95a903005a6ab6d9689ddd2772b908fc0d0aef43bb34db66af1dddb55b64937d3c7d7e93a91a7f303fef96e17d7f5479bae25c0183e74822ac652e92a56d0251bb5d975c2f2b63f4458526824f2c3dc1f1fcbacb2f6e52022ba6e6b401660b43b5070409cac0cc6223a2bf1b4b415574d7132f2607e12075f7cd2f8674c33e40d8ed55628f1c3eb08dbb8845b0f3bae708784c805b9a3f4b78ddf6830ad0e9eafb07980d7f2e270d8dd1966
```
To use it with hashcat, we can specify the hash type with `-m 18200` (`Kerberos 5, etype 23, AS-REP`)
that allows to crack the file using the dictionary file `password_list.txt`:
```bash
elf@122153c22aa8:~$ hashcat --force -w 1 -u 1 --kernel-accel 1 --kernel-loops 1 -m 18200 -a 0 hash.txt
password_list.txt
hashcat (v5.1.0) starting...
# Output removed to shorten report
$krb5asrep$23$alabaster_snowball@XMAS.LOCAL:22865a2bceeaa73227ea4021879eda02$8f07417379e610e2dcb0621462f
ec3675bb5a850aba31837d541e50c622dc5faee60e48e019256e466d29b4d8c43cbf5bf7264b12c21737499cfcb73d95a903005a
6ab6d9689ddd2772b908fc0d0aef43bb34db66af1dddb55b64937d3c7d7e93a91a7f303fef96e17d7f5479bae25c0183e74822ac
652e92a56d0251bb5d975c2f2b63f4458526824f2c3dc1f1fcbacb2f6e52022ba6e6b401660b43b5070409cac0cc6223a2bf1b4b
415574d7132f2607e12075f7cd2f8674c33e40d8ed55628f1c3eb08dbb8845b0f3bae708784c805b9a3f4b78ddf6830ad0e9eafb
07980d7f2e270d8dd1966:IluvC4ndyC4nes!
# Output removed to shorten report
```
Revealing that the password is `IluvC4ndyC4nes!`.