import requests
from DrissionPage import ChromiumPage
page= ChromiumPage()
url = 'https://www.endata.com.cn/API/GetData.ashx'
data = {
    'pageIndex': '4',
    'pageSize': '12',
    'SceneID': '2',
    'TagID': '',
    'MethodName': 'Data_ReportListNew'
}

resp = requests.post(url, data=data)
page.get('http://localhost:63342/study-spider/src/course/25-11-08/endata/index.html')
decrypted_data = page.run_js("return JSON.parse(webInstace.shell(arguments[0]))", resp.text)
print(decrypted_data)