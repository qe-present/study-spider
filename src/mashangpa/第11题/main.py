import json
import time

from httpx import Client

def encrypt(var0: int, var1: int) -> int:
    return var0 + var1 // 3 + 16358
total = 0
for page in range(1,21):
    url=f'https://www.mashangpa.com/api/problem-detail/11/data/?page={page}'
    cookies={
        'sessionid':'csposanqkyl5gq8o5mtjpwai466oa7x7'
    }
    time_=int(time.time())
    params={
        'page':page,
        'm':encrypt(page,time_),
        '_ts':str(time_)
    }

    headers={
        'referer':'https://www.mashangpa.com/problem-detail/11/',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
    }
    res=Client().get(url=url,cookies=cookies,headers=headers,params=params)
    # print(res.json())
    total += sum(res.json()['current_array'])

print(total)