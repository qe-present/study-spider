import requests
from DrissionPage import ChromiumPage

html=ChromiumPage()
html.get("http://localhost:63342/study-spider/src/course/12-11-9/qimai/index.html")
all_gener=str(36)
analysis=html.run_js("return get_an(arguments[0])",all_gener)
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',
}
params = {
    'analysis': analysis,
    'setting': '0',
    'genre': '36'
}
print(params)
url = 'https://api.qimai.cn/indexV2/getIndexRank'
res=requests.get(url=url,params=params,headers=headers)
print(res.json())
