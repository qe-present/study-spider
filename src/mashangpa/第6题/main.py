import json
import time

from httpx import Client
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import hashlib
def sign(plainText: str) -> str:
    # md5 加密
    m = hashlib.md5()
    m.update(plainText.encode('utf-8'))
    return m.hexdigest()


def decrypt(encrypted_hex: str) -> str:
    # 与 JS 保持一致
    key = b'xxxxxxxxoooooooo'   # 16 字节 → AES-128
    iv  = b'0123456789ABCDEF'   # 16 字节

    cipher = AES.new(key, AES.MODE_CBC, iv)
    ct = bytes.fromhex(encrypted_hex)
    pt = unpad(cipher.decrypt(ct), AES.block_size)
    return pt.decode('utf-8')


total=0
for page in range(1,21):
    url=f'https://www.mashangpa.com/api/problem-detail/6/data/?page={page}'
    cookies={
        'sessionid':'csposanqkyl5gq8o5mtjpwai466oa7x7'
    }
    time_=str(int(time.time()*1000))
    headers={
        'S':sign("sssssbbbbb" + time_),
        'Tt':time_,
        'referer':'https://www.mashangpa.com/problem-detail/6/',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
    }
    res=Client().get(url=url,cookies=cookies,headers=headers)
    a=res.json()['t']
    p=json.loads(decrypt(a))
    total += sum(p['current_array'])


print(total)