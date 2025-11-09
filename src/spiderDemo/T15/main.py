import requests
import time
import base64
t=int(time.time()*1000)


res=requests.get(f'https://www.spiderdemo.cn/captcha/api/cap5_challenge/captcha_image/?t={t}',
                 cookies={'sessionid':'ub6zyoe3zq0wjgeeyf7ucr0dlso5zgpu'},
                 headers={
                     'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
                 })
data=res.json()
mask_url=data['masked']
overlay_url=data['overlay']
with open('mask.png','wb') as f:
    f.write(base64.b64decode(mask_url))
with open('overlay.png','wb') as f:
    f.write(base64.b64decode(overlay_url))