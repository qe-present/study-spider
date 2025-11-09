
from feapder.network.response import Response
import feapder
import random





class AirSpiderDemo(feapder.AirSpider):
    __custom_setting__ = dict(
        DOWNLOADER="my_download.RequestsDownloader"
    )

    def start_requests(self):
        url = "https://tls.browserleaks.com/json"
        yield feapder.Request(url=url, method="GET")


    def parse(self, request, response: Response):
        print(response.text)
        print(response)


if __name__ == "__main__":
    spider = AirSpiderDemo(thread_count=2)
    spider.start()