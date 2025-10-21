import base64
ls='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
result=ls[24]+ls[22]+ls[9]+ls[35]
print(result)
print("+++++++")

s='abc'
s_bytes=s.encode('utf-8')
s_base64_bytes=base64.b64encode(s_bytes)
print(s_base64_bytes)
print("+++++++")
bs_str='YWJj'
bs_bytes=bs_str.encode('utf-8')
s_bytes2=base64.b64decode(bs_bytes).decode('utf-8')
print(s_bytes2)
print("+++++++")
