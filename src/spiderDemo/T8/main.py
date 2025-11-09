import requests
import time
import base64
from DrissionPage import ChromiumPage
import ddddocr
from paddleocr import PaddleOCR

page=ChromiumPage()
import json
ocr = ddddocr.DdddOcr(show_ad=False)
page.get("http://localhost:63342/study-spider/src/spiderDemo/T8/one/index.html")
url='https://www.spiderdemo.cn/font_anti/api/font_anti_challenge/page/2'
cookie={
    'sessionid':'ivyip05u34h3tdsm06otmm66clfgqikt'
}
params={
    'challenge_type':'font_anti_challenge',
}
headers={
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
}
res=requests.get(url=url,params=params,cookies=cookie,headers=headers)
data=res.json()


b64_font=data['b64Font']
page_data=data['page_data']
page_data_str = json.dumps(page_data)
page.run_js('return renderNumbers(JSON.parse(arguments[0]))',page_data_str)
page.run_js('return loadCustomFont(arguments[0])',b64_font)
import ddddocr
ocr = ddddocr.DdddOcr(show_ad=False)
grid =page.ele("@class=numbers-grid")
children = grid.eles("tag:div")
for child in children:
    real_number=ocr.classification(child.get_screenshot(as_bytes='png'))
    print('渲染后的数字：', real_number)




