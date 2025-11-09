from DrissionPage import ChromiumPage
from httpx import Client
from src.setting import timestamp_10

html=ChromiumPage()
html.get('http://localhost:63342/study-spider/src/spa/spa14/index.html')
url='https://spa14.scrape.center/api/movie/'

limit=10
offset=0
sign=html.run_js(f'return get_sign({limit},{offset},{timestamp_10})')
params={
    'limit':limit,
    'offset':offset,
    'sign':sign,
}

res=Client().get(url=url,params=params)
print(res.text)
