import os
import re

directory = "."

for filename in (os.listdir(directory)):
	if re.match(r'$\d+.*?', filename):
		print (filename)