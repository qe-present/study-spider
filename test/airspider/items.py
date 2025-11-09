from feapder import Item

class HsCodeItem(Item):
    # 数据库主键，自增
    __unique_key__ = "id"          # 如想按 codeTs 去重可改成 codeTs

    def __init__(self, *args, **kwargs):
        self.id = None              # 数据库自增，代码里不用赋值
        self.codeTs = None          # 商品编码
        self.gName = None           # 商品名称
        self.impDiscountRate = None # 最惠国税率
        self.impOrdinaryRate = None # 普通进口税率
        super().__init__(**kwargs)