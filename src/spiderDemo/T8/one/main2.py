import ddddocr
import requests
import time
import base64
from DrissionPage import ChromiumPage
from paddleocr import PaddleOCR
import numpy as np
from PIL import Image, ImageOps
import io
import json
import re

html = ChromiumPage()
paddle = PaddleOCR()

table= str.maketrans({
    'L':'7'
})

def ocr_classification(png_bytes: bytes) -> str:
    image = Image.open(io.BytesIO(png_bytes)).convert('RGB')
    result = paddle.ocr(np.array(image))
    str_number=result[0]['rec_texts'][0]
    return str_number.translate(table)


html.get("http://localhost:63342/study-spider/src/spiderDemo/T8/one/index.html")

cookie = {
    'sessionid': 'ivyip05u34h3tdsm06otmm66clfgqikt'
}
params = {
    'challenge_type': 'font_anti_challenge',
}
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
}

total = 0
for page in range(1, 101):
    url = f'https://www.spiderdemo.cn/font_anti/api/font_anti_challenge/page/{page}'
    res = requests.get(url=url, params=params, cookies=cookie, headers=headers)
    data = res.json()
    b64_font = data['b64Font']
    page_data = data['page_data']
    page_data_str = json.dumps(page_data)

    html.run_js('return renderNumbers(JSON.parse(arguments[0]))', page_data_str)
    html.run_js('return loadCustomFont(arguments[0])', b64_font)

    grid = html.ele("@class=numbers-grid")
    children = grid.eles("tag:div")
    page_total = 0
    for child in children:
        screenshot_bytes = child.get_screenshot(path='temp.png')
        ocr_result = ocr_classification(screenshot_bytes)
        print(ocr_result)
        page_total += int(ocr_result)

    total += page_total
    print(f'第{page}页获取完成, 本页合计: {page_total}, 累计总计: {total}')

print(f"最终总计: {total}")
