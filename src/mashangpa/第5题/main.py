from httpx import Client
import time
from pprint import pprint
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import json
import binascii

def encrypt(plain_text: str) -> str:
    key = b'jo8j9wGw%6HbxfFn'          # 16 字节 → AES-128
    iv  = b'0123456789ABCDEF'         # 16 字节
    data = plain_text.encode('utf-8')

    cipher = AES.new(key, AES.MODE_CBC, iv)
    ct_bytes = cipher.encrypt(pad(data, AES.block_size))
    return binascii.hexlify(ct_bytes).decode()   # 小写 hex，与 CryptoJS 一致
total=0
for page in range(1,21):
    url=f'https://www.mashangpa.com/api/problem-detail/5/data/?page={page}'
    cookies={
        'sessionid':'csposanqkyl5gq8o5mtjpwai466oa7x7'
    }
    headers={
        'referer':'https://www.mashangpa.com/problem-detail/5/',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
    }
    timestamp=int(time.time()*1000)
    plain_text={
        '_ts':str(timestamp),
        'page':str(page)
    }
    plain_text=json.dumps(plain_text,separators=(',',':'))
    sign_value=encrypt(plain_text)
    print(sign_value)
    params={
        'xl':sign_value
    }
    data=json.dumps(params,separators=(',',':'))
    res=Client().post(url=url,data=data,cookies=cookies,headers=headers)
    total += sum(res.json()['current_array'])
print(total)