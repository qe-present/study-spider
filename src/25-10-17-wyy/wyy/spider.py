from service import ListSpider,MusicSpider

if __name__ == '__main__':
    spider = MusicSpider(ids=[28059417])
    spider.start()