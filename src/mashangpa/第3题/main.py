from httpx import Client
from pprint import pprint
total=0
for page in range(1,21):
    url=f'https://www.mashangpa.com/api/problem-detail/3/data/?page={page}'
    cookies={
        'sessionid':'csposanqkyl5gq8o5mtjpwai466oa7x7'
    }
    headers={
        'referer':'https://www.mashangpa.com/problem-detail/3/',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
    }

    res=Client().get(url=url,cookies=cookies,headers=headers)
    total += sum(res.json()['current_array'])
pprint(total)
