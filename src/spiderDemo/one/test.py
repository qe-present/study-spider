# -*- coding: utf-8 -*-
"""
@File    : t1.py
@Author  : bb_bcxlc
@Date    : 2025-10-19 21:57
@Blog    : https://blog.csdn.net/xw1680
@Tool    : PyCharm
@Desc    :
"""

import httpx
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading


class HeaderCheckClient:
    def __init__(self, cookies: dict, headers: dict, base_url: str, max_workers: int = 10):
        self.cookies = cookies
        self.headers = headers
        self.base_url = base_url
        self.params = {'challenge_type': 'header_check'}
        self.result = 0
        self.lock = threading.Lock()  # 保证 result 累加安全
        self.max_workers = max_workers
        self.client = httpx.Client(cookies=self.cookies, headers=self.headers)  # 单例客户端

    def fetch_page(self, page_number: int):
        """
        请求单页数据，并安全累加 result
        """
        res = self.client.get(f'{self.base_url}/page/{page_number}/', params=self.params)
        data = res.json()
        print(data)  # 打印每页返回内容
        page_sum = sum(data.get('page_data', []))

        # 使用锁保证累加安全
        with self.lock:
            self.result += page_sum

    def run_multithread(self, start: int = 1, end: int = 101):
        """
        多线程请求页面
        """
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            futures = [executor.submit(self.fetch_page, i) for i in range(start, end)]
            # 等待所有线程完成
            for _ in as_completed(futures):
                pass
        print(f"Total sum: {self.result}")

    def close(self):
        self.client.close()  # 关闭客户端


if __name__ == "__main__":
    cookies = {
        'sessionid': 'iacvf3dkwt0mm7nymxh6mg99cq93fvk4',
    }

    headers = {
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'zh-CN,zh;q=0.9',
        'priority': 'u=1, i',
        'referer': 'https://www.spiderdemo.cn/sec1/header_check/',
        'sec-ch-ua': '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
    }

    client = HeaderCheckClient(cookies, headers, "https://www.spiderdemo.cn/sec1/api/challenge")
    client.run_multithread()
    client.close()
