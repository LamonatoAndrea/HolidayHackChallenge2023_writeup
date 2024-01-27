import requests

url = 'https://hhc23-reportinator-dot-holidayhack2023.ue.r.appspot.com/check'

for i in range(0, int('111111111', 2) + 1):
	bin_i = '{0:09b}'.format(i)
	data = {
		'input-1': bin_i[0],
		'input-2': bin_i[1],
		'input-3': bin_i[2],
		'input-4': bin_i[3],
		'input-5': bin_i[4],
		'input-6': bin_i[5],
		'input-7': bin_i[6],
		'input-8': bin_i[7],
		'input-9': bin_i[8]
	}
	response = requests.post(url, data=data)
	print("ATTEMPT {}".format(bin_i))

	if "FAILURE" not in response.text:
		print("SOLUTION IS {}".format(bin_i))
		exit()