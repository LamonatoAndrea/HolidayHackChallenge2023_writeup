# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Linux 101
Difficulty: :christmas_tree:  
Visit Ginger Breddie in Santa's Shack on Christmas Island to help him with some basic Linux tasks. It's in the southwest corner of Frosty's Beach.

### Solution
The North Pole :gift: Present Maker:
All the presents on this system have been stolen by trolls. Capture trolls by following instructions here and :gift:'s will appear in the green bar below. Run the command "hintme" to receive a hint.
```bash
Type "yes" to begin: yes
```
```bash
Perform a directory listing of your home directory to find a troll and retrieve a present!
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~$ ls
HELP troll_19315479765589239
workshop
```
```bash
Now find the troll inside the troll.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~$ cat troll_19315479765589239
troll_24187022596776786
```
```bash
Great, now remove the troll in your home directory.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~$ rm troll_19315479765589239
```
```bash
Print the present working directory using a command.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~$ pwd
/home/elf
```
```bash
Good job but it looks like another troll hid itself in your home directory. Find the hidden troll!
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~$ ls -la
# Output removed to shorten report
-rw-r--r-- 1 elf elf 0 Dec 28 23:23 .troll_5074624024543078
-rw-r--r-- 1 elf elf 168 Nov 20 18:04 HELP
drwxr-xr-x 1 elf elf 24576 Dec 2 22:19 workshop
```
```bash
Excellent, now find the troll in your command history.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~$ history
1 echo troll_9394554126440791
2 ls
3 cat troll_19315479765589239
4 rm troll_19315479765589239
5 pwd
6 ls -la
7 history
```
```bash
Find the troll in your environment variables.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~$ env | grep -i troll
SESSNAME=Troll Wrangler
z_TROLL=troll_20249649541603754
```
```bash
Next, head into the workshop.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~$ cd workshop/
elf@e03c569da312:~/workshop$
```
```bash
A troll is hiding in one of the workshop toolboxes. Use "grep" while ignoring case to find which toolbox the troll is in.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~/workshop$ grep -i troll *
grep: electrical: Is a directory
toolbox_191.txt:tRoLl.4056180441832623
```
```bash
A troll is blocking the present_engine from starting. Run the present_engine binary to retrieve this troll.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~/workshop$ chmod +x present_engine && ./present_engine
troll.898906189498077
```
```bash
Trolls have blown the fuses in /home/elf/workshop/electrical. cd into electrical and rename blown_fuse0 to fuse0.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~/workshop$ cd electrical/ && mv blown_fuse0 fuse0
```
```bash
Now, make a symbolic link (symlink) named fuse1 that points to fuse0
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~/workshop/electrical$ ln -s fuse0 fuse1
```
```bash
Make a copy of fuse1 named fuse2.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~/workshop/electrical$ cp fuse1 fuse2
```
```bash
We need to make sure trolls don't come back. Add the characters "TROLL_REPELLENT" into the file fuse2.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~/workshop/electrical$ echo "TROLL_REPELLENT" > fuse2
```
```bash
Find the troll somewhere in /opt/troll_den.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~/workshop/electrical$ find /opt/troll_den/* -iname "*troll*"
/opt/troll_den/apps/showcase/src/main/resources/tRoLl.6253159819943018
# Output removed to shorten report
```
```bash
Find the file somewhere in /opt/troll_den that is owned by the user troll.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~/workshop/electrical$ find /opt/troll_den/* -user troll
/opt/troll_den/apps/showcase/src/main/resources/template/ajaxErrorContainers/tr0LL_9528909612014411
```
```bash
Find the file created by trolls that is greater than 108 kilobytes and less than 110 kilobytes located somewhere in /opt/troll_den.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~/workshop/electrical$ find /opt/troll_den/* -size +108k -size -110k
/opt/troll_den/plugins/portlet-mocks/src/test/java/org/apache/t_r_o_l_l_2579728047101724
```
```bash
List running processes to find another troll.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~/workshop/electrical$ ps -fae
UID          PID    PPID  C STIME TTY          TIME CMD
init           1       0  0 17:55 pts/0    00:00:00 /usr/bin/python3 /usr/local/bin/tmuxp load ./mysession.yaml
elf         1817    1812  2 17:58 pts/2    00:00:00 /usr/bin/python3 /14516_troll
elf         1905     142  0 17:58 pts/3    00:00:00 ps -fae
```
```bash
The 14516_troll process is listening on a TCP port. Use a command to have the only listening port display to the screen.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~/workshop/electrical$ netstat -an
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 0.0.0.0:54321           0.0.0.0:*               LISTEN     
Active UNIX domain sockets (servers and established)
Proto RefCnt Flags       Type       State         I-Node   Path
unix  2      [ ACC ]     STREAM     LISTENING     1428029  /tmp/tmux-1050/default
unix  3      [ ]         STREAM     CONNECTED     1431154  /tmp/tmux-1050/default
unix  3      [ ]         STREAM     CONNECTED     1430061  
```
```bash
The service listening on port 54321 is an HTTP server. Interact with this server to retrieve the last troll.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~/workshop/electrical$ curl localhost:54321
troll.73180338045875
```
```bash
Your final task is to stop the 14516_troll process to collect the remaining presents.
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~/workshop/electrical$ kill 1817
```
```bash
Congratulations, you caught all the trolls and retrieved all the presents!
Type "exit" to close...
───────────────────────────────────────────────────────────────────────
elf@e03c569da312:~/workshop/electrical$ exit
```
