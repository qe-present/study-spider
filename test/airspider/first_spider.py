import json
import demjson3
import feapder
from items import HsCodeItem

class FirstSpider(feapder.AirSpider):
    def start_requests(self):
        data={
            'param': '{"gName":"银","codeTs":"","sysDate":"2025-10-22","nextPage":1,"pageSize":"10"}'
        }
        yield feapder.Request("https://online.customs.gov.cn/ociswebserver/ocis/taxRateQuery/query/queryImpTariffRate",data=data)

    def parse(self, request, response):
        raw = response.json  # 外层 dict
        inner = demjson3.decode(raw['res'])

        for i in inner['data']:
            item = HsCodeItem()
            item.id = None  # 数据库自增，代码里不用赋值
            item.codeTs = i.get("codeTs")
            item.gName = i.get("gName")
            item.impDiscountRate = i.get("impDiscountRate")
            item.impOrdinaryRate = i.get("impOrdinaryRate")
            yield item

if __name__ == "__main__":
    FirstSpider().start()