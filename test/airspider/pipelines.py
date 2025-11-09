import sqlite3
from feapder.pipelines import BasePipeline
class SQLitePipeline(BasePipeline):
    def __init__(self):
        self.db = sqlite3.connect("air.db", check_same_thread=False)

    def save_items(self, table, items):
        """feapder 每次批量调用这里，items 是 list[Item]"""
        for item in items:
            cur = self.db.execute(
                """INSERT INTO hs_code(codeTs, gName, impDiscountRate, impOrdinaryRate)
                   VALUES (?,?,?,?)""",
                (item['codeTs'], item['gName'],
                 item['impDiscountRate'], item['impOrdinaryRate'])
            )
            # 把每条记录的自增 id 写回对应 item
            item['id'] = cur.lastrowid
        self.db.commit()          # 整批提交一次即可
        return True

    def close(self):
        self.db.close()
