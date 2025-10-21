from hashlib import md5
s='123456'
print(md5(s.encode('utf-8')).hexdigest())