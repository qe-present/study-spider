import random

from feapder.network.downloader.base import Downloader
from curl_cffi import requests as cffi_requests
from feapder.network.response import Response

aaa = [
    "edge99",
    "edge101",
    "chrome99",
    "chrome100",
    "chrome101",
    "chrome104",
    "chrome107",
    "chrome110",
    "chrome116",
    "chrome119",
    "chrome120",
    "chrome123",
    "chrome124"
]

class RequestsDownloader(Downloader):
    def download(self, request) -> Response:
        response = cffi_requests.request(
            method=request.method,
            url=request.url,
            impersonate=random.choice(aaa),  # 随机选择一个浏览器指纹
            **request.requests_kwargs
        )
        response = Response(response)
        return response
