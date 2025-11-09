from httpx import Client
from hashlib import md5
import time
from pprint import pprint
def sign(times_tamp,page_number):
    plain="tuling" + times_tamp + page_number
    result=md5(plain.encode('utf-8')).hexdigest()
    return result
total=0
for page in range(1,21):
    url=f'https://www.mashangpa.com/api/problem-detail/4/data/?page={page}'
    cookies={
        'sessionid':'csposanqkyl5gq8o5mtjpwai466oa7x7'
    }
    headers={
        'referer':'https://www.mashangpa.com/problem-detail/4/',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
    }
    timestamp=int(time.time()*1000)
    sign_value=sign(str(timestamp),str(page))
    params={
        '_ts':str(timestamp),
        'sign':sign_value,
        'page':str(page)
    }
    res=Client().get(url=url,params=params,cookies=cookies,headers=headers)
    total += sum(res.json()['current_array'])
print(total)