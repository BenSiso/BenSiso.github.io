import json
import codecs
data = json.load(codecs.open("codebeautify.json", 'r', 'utf-8-sig'))
for p in data['ROW']:
		print(p['שם_ישוב'])
	
