import requests


from DrissionPage import ChromiumPage
page=ChromiumPage()
session=requests.session()
page.get("http://localhost:63342/study-spider/src/course/25-11-08/minmetals/index.html")
url = "https://ec.minmetals.com.cn/open/homepage/zbs/by-lx-page"
pub_url="https://ec.minmetals.com.cn/open/homepage/public"
arg={
    "inviteMethod": "",
    "businessClassfication": "",
    "mc": "",
    "lx": "ZBGG",
    "dwmc": "",
    "pageIndex": 2
}
headers={
    "Referer":"https://ec.minmetals.com.cn/homepage/zbs",
    'Content-Type':'application/json;charset=UTF-8',
    'referer':'https://ec.minmetals.com.cn/open/home/purchase-info',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
}
pub=session.post(url=pub_url,headers=headers)

data={
    "param": page.run_js("return crypt(arguments[0],arguments[1])",arg,pub.text),
}

res=session.post(url=url,json=data,headers=headers)
print(res.json())