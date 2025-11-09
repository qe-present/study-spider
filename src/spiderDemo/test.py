import requests
import time
url=f'https://www.spiderdemo.cn/ob/api/ob_challenge1/page/2/?'
headers = {
    'Cookie': 'csrftoken=Z35RnwfYg9KGueqv1fZvWgoPka8MXzK8; sessionid=iacvf3dkwt0mm7nymxh6mg99cq93fvk4',
    'referer': 'https://www.spiderdemo.cn/ob/ob_challenge1/?challenge_type=ob_challenge1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
}
params={
    'challenge_type':'ob_challenge1',
    'sign':'abb12a1c22fee811b0c292c87aa85dd1',
    'timestamp':'1761226835340'
}
print(params)
print(headers)
response=requests.get(url,params=params,headers=headers)
print(response.status_code)
print(response.text)