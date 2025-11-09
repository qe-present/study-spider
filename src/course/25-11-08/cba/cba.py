"""
跨域搜索 interceptors.response.use
        interceptors
"""
import requests
from DrissionPage import ChromiumPage
# 2024是赛季
# 29115是球队ID，CBA官网可以查到
res=requests.get("https://data-server.cbaleague.com/api/teams/29115/seasons/2024/players")
page=ChromiumPage()
page.get("http://localhost:63342/study-spider/src/course/25-11-08/cba/index.html")
# 需要去掉 "
arg=res.text.split('"')[1]
data=page.run_js("return crypt(arguments[0])",arg)
print(data)