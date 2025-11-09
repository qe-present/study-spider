from httpx import Client
import time
from DrissionPage import ChromiumPage

html = ChromiumPage()
html.get("http://localhost:63343/study-spider/src/spiderDemo/four/a.html")

while True:
    ready = html.run_js('return get_ok();')
    print(ready)
    if ready is True:
        break

cookies = {
    'sessionid':'ex8ek5urz1zb8ywq4p14lylfth8gtsh4'
}
total=0
for page_number in range(1,101):
    timestamp = str(int(time.time()))
    url=f'https://www.spiderdemo.cn/sec1/api/wasm_challenge/page/{page_number}/'
    wasm_auth = html.run_js(f'return get_auth({page_number},"{timestamp}");')
    headers = {
        'Content-Type': 'application/json',
        'X-Wasm-Page': str(page_number),
        'X-Wasm-Timestamp': str(timestamp),
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'
    }
    params={
        'challenge_type':'wasm_challenge',
        'wasm_auth':wasm_auth
    }
    response = Client().get(url=url,params=params,cookies=cookies, headers=headers)
    total+=sum(response.json()['page_data'])
print(total)