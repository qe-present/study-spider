import requests
from DrissionPage import ChromiumPage
page=ChromiumPage()
page.get("http://localhost:63342/study-spider/src/course/25-11-08/hfhuizhan/index.html")
url = "https://www.hfhuizhan.com/prod-api/hfhz-exhibition/back/exhibition/listExhibitionNotPage"


script="return crypt(arguments[0])"
data=page.run_js(script,"2025-11")
payload = {"data": data}
resp = requests.post(url, json=payload)
script="return decrypt(arguments[0])"
data=page.run_js(script,resp.text)
print(data)