from challenge_pb2 import ChallengeRequest, ChallengeResponse, NumberData
from Crypto.Hash import MD4
import time
import requests
import execjs
import hashlib, binascii
with open('p.js',encoding='utf-8') as f:
    js_code=f.read()
ctx=execjs.compile(js_code)
timestamp=int(time.time()*1000)
res=ctx.call('md_sign.hashString',str(timestamp))
res2=ctx.call('mencryptType',"protobuf_challenge")
signature=res['return_value']
challenge_type=res2['return_value']
print(signature)
page=1
url='https://www.spiderdemo.cn/authentication/api/protobuf_challenge/page/'+str(page)+"/"

def md_sign(data: bytes) -> str:
    return MD4.new(data).hexdigest()
req = ChallengeRequest(
    page=page,
    challengetype=challenge_type,
    timestamp=timestamp,
    signature=signature
)
cookies={
    'sessionid':'ex8ek5urz1zb8ywq4p14lylfth8gtsh4'
}
headers = {
    "Content-Type": "application/x-protobuf",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
}
res=requests.post(url=url, data=req.SerializeToString(),cookies=cookies,headers=headers)
print(res)
print(res.text)