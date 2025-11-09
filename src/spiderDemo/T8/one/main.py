import ddddocr
import requests
import time
import base64
from DrissionPage import ChromiumPage,ChromiumOptions
import json

html=ChromiumPage()

ocr = ddddocr.DdddOcr(show_ad=False,beta=True)
html.get("http://localhost:54536/study-spider/src/spiderDemo/T8/one/index.html")

cookie={
    'sessionid':'ivyip05u34h3tdsm06otmm66clfgqikt'
}
params={
    'challenge_type':'font_anti_challenge',
}
headers={
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
}
total=0
for page in range(1,2):
    url=f'https://www.spiderdemo.cn/font_anti/api/font_anti_challenge/page/{page}'
    res=requests.get(url=url,params=params,cookies=cookie,headers=headers)
    data=res.json()
    b64_font=data['b64Font']
    page_data=data['page_data']
    page_data_str = json.dumps(page_data)
    html.run_js('return renderNumbers(JSON.parse(arguments[0]))',page_data_str)
    html.run_js('return loadCustomFont(arguments[0])',b64_font)
    numbers_list=html.run_js('return get_shot()')
    number_bytes = numbers_list[0].encode('latin1')
    grid = html.ele("@class=numbers-grid")
    child = grid.eles("tag:div")[0]
    child.get_screenshot(path='dp.png')
    with open('mod.png','wb') as f:
        f.write(number_bytes)

print(total)