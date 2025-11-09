from httpx import Client
import time
from DrissionPage import ChromiumPage

html = ChromiumPage()
html.get("http://localhost:63342/study-spider/src/spiderDemo/T21/index.html")
a=html.run_js(f'return get_params(arguments[0],arguments[1])',1,int(time.time()*1000))


cookies = {
    'sessionid':'19qomew1k3n5lajhw15vp29goer5s7of'
}
# total=0
for page_number in range(1,2):
    timestamp = str(int(time.time()))
    url=f'https://www.spiderdemo.cn/sec1/api/wasm_challenge/page/{page_number}/'
    wasm_auth = html.run_js(f'return get({page_number},"{timestamp}");')
    headers = {
        'Content-Type': 'application/json',
        'X-Wasm-Page': str(page_number),
        'X-Wasm-Timestamp': str(timestamp),
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'
    }
    params={
        'challenge_type':'hash_challenge',
        'wasm_auth':wasm_auth
    }
    response = Client().get(url=url,params=params,cookies=cookies, headers=headers)
    print(response.text)
    total+=sum(response.json()['page_data'])
print(total)