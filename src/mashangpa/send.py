from setting import sessionid
from httpx import Client
from pprint import pprint
def send(
        all_page:int,
        is_sum:bool,
        method:str='get',
        data:dict={},

):
    total=0
    for page in range(1, all_page):
        url = f'https://www.mashangpa.com/api/problem-detail/6/data/?page={page}'
        cookies = {
            'sessionid': 'csposanqkyl5gq8o5mtjpwai466oa7x7'
        }
        time_ = str(int(time.time() * 1000))
        headers = {

            'referer': 'https://www.mashangpa.com/problem-detail/6/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
        }
        if method=='post':
            res = Client().post(url=url, data=data, cookies=cookies, headers=headers)
        else:
            res=Client().post(url=url, data=data, cookies=cookies, headers=headers)
        res = Client().get(url=url, cookies=cookies, headers=headers)
        if is_sum:
            res = Client().post(url=url, data=data, cookies=cookies, headers=headers)
            total += sum(res.json()['current_array'])

        return res