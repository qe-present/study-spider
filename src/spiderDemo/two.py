from DrissionPage import ChromiumPage
import time
import requests
html = ChromiumPage()
html.get("http://localhost:63342/study-spider/src/spiderDemo/a.html")
total=0
for page in range(1,101):
    url=f'https://www.spiderdemo.cn/ob/api/ob_challenge1/page/{page}?'
    timestamp=int(time.time()*1000)
    sign=html.run_js(f"return hex_md5('{timestamp}{page}');")
    print("第"+str(page)+"页的参数sign是"+sign)
    cookies = {
        'sessionid': 'iacvf3dkwt0mm7nymxh6mg99cq93fvk4'
    }
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
    }
    params={
        'challenge_type':'ob_challenge1',
        'sign':sign,
        'timestamp':timestamp
    }
    response=requests.get(url,params=params,headers=headers,cookies=cookies)
    success=response.json()['success']
    if not success:
        print("Failed to get valid response")
    else:
        page_total=sum(response.json()['page_data'])
        total+=page_total
print(total)