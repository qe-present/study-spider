import requests
import json

url='https://crates.io/api/v1/crates/tokio'
res=requests.get(url=url)
# 保存json
data=res.json()['crate']['default_version']
print(data)