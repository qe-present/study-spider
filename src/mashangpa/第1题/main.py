import requests
from pprint import pprint
total=0
for page in range(1,21):
    url=f'https://www.mashangpa.com/api/problem-detail/1/data/?page={page}'
    cookies={
        'sessionid':'csposanqkyl5gq8o5mtjpwai466oa7x7'
    }
    resp=requests.get(url,cookies=cookies)
    total+=sum(resp.json()['current_array'])
pprint(total)