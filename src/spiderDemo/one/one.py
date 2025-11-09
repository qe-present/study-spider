import httpx
import time
from DrissionPage import ChromiumPage
import requests

html = ChromiumPage()
html.get("http://localhost:63342/study-spider/src/spiderDemo/a.html")
timestamp = int(time.time() * 1000)
page_number=1
sign = html.run_js(f"return hex_md5('{timestamp}{page_number}');")
cookies = {
    'sessionid':'iacvf3dkwt0mm7nymxh6mg99cq93fvk4'
}
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'
}
base_url='https://www.spiderdemo.cn/ob/api/ob_challenge1'
params={
    'challenge_type':'ob_challenge1',
    'sign':sign,
    'timestamp':str(timestamp)
}

client = httpx.Client(cookies=cookies, headers=headers)  # 单例客户端
# response=client.get(f'{base_url}/page/{page_number}/', params=params)
response=requests.get(f'{base_url}/page/{page_number}/',headers=headers,params=params,cookies=cookies)
print(response.json())