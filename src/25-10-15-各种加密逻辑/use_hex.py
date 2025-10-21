import binascii
s='主页'
bs=s.encode('utf-8')
print(bs)
# b 表示byte a 表示ascii hex表示十六进制
res=binascii.b2a_hex(bs)
print(res)
s=res
# a 表示ascii b 表示byte hex表示十六进制
bs=binascii.a2b_hex(s)
print(bs.decode('utf-8'))