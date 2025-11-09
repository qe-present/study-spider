import ddddocr
import requests
import time
import base64
from DrissionPage import ChromiumPage,ChromiumOptions
from PIL import Image, ImageOps
import io
import json

from paddleocr import PaddleOCR
import numpy as np

html=ChromiumPage()
html.get("http://localhost:51024/study-spider/src/spiderDemo/T9/index.html")
ocr=ddddocr.DdddOcr(show_ad=False,beta=True)
cookie={
    'sessionid':'ivyip05u34h3tdsm06otmm66clfgqikt'
}
params={
    'challenge_type':'font_sprites_challenge',
}
headers={
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
}
mapping=str.maketrans({
    'o':'0',
    'O':'0',
    'I':'1'
})

total=0
for page in range(1,101):
    url=f'https://www.spiderdemo.cn/font_anti/api/font_sprites_challenge/page/{page}'
    res=requests.get(url=url,params=params,cookies=cookie,headers=headers)
    data=res.json()
    page_data=data['page_data']
    css_code=data['css_code']
    sprite=data['sprite']
    page_data_str = json.dumps(page_data)
    html.run_js('return loadPageData(arguments[0],arguments[1],JSON.parse(arguments[2]))',sprite,css_code,page_data_str)
    number_list = html.eles("@class=number-box")
    for child in number_list:
        string_result = ocr.classification(child.get_screenshot(as_bytes=True))
        try:
            number=int(string_result)
        except Exception as e:
            print("报错",string_result,e)
            result=string_result.translate(mapping)
            print('变成',result)
            number=int(result)
        finally:
            total+=number
    print('第' + str(page) + '页获取完成')
print(total)
