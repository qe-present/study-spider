# -*- coding: utf-8 -*-
"""
Created on 2025-10-22 21:31:01
---------
@summary:
---------
@author: 26644
"""
import demjson3
import feapder
from tax_item import TaxItem
from feapder.pipelines.mysql_pipeline import MysqlPipeline
from feapder.utils.log import log

class MysqlSpider(feapder.AirSpider):
    def start_requests(self):
        data={
            'param': '{"gName":"银","codeTs":"","sysDate":"2025-10-22","nextPage":1,"pageSize":"10"}'
        }
        log.info("开始请求数据...")
        log.info(data)
        yield feapder.Request("https://online.customs.gov.cn/ociswebserver/ocis/taxRateQuery/query/queryImpTariffRate",data=data)

    def parse(self, request, response):
        raw = response.json  # 外层 dict
        inner = demjson3.decode(raw['res'])

        for i in inner['data']:
            item = TaxItem()
            item.codeTs = i.get("codeTs")
            item.gName = i.get("gName")
            item.impDiscountRate = i.get("impDiscountRate")
            item.impOrdinaryRate = i.get("impOrdinaryRate")
            yield item

if __name__ == "__main__":
    MysqlSpider().start()