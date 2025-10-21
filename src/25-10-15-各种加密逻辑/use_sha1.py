from hashlib import sha1
s='123456'
h=sha1(s.encode('utf-8')).hexdigest()
print(h)