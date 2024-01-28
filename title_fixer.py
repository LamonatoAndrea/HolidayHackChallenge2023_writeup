import os
import re
import urllib.parse
import pprint

directory = "."

dirs = []
for filename in (os.listdir(directory)):
	if re.match(r'^\d+.*?', filename):
		dirs.append (filename)
dirs.append("/")
dirs.sort()


dir_objs = []
for d in dirs:
	challenge_name = d[5:]
	readme_url = "/{}/README.md".format(urllib.parse.quote(d))
	dir_obj = {'original': d, 'readme_url': readme_url, 'challenge_name': challenge_name}
	dir_objs.append(dir_obj)

	print ("## [{}]({})".format(challenge_name, readme_url))