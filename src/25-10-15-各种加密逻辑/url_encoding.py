from urllib.parse import urljoin,quote,urlencode,quote_plus,unquote
url1='http://www.baidu.com/s/c'
url2='/a/b'
url3='a/b'
print(url1+url2)
print(url1+url3)
print(urljoin(url1,url2))
print(urljoin(url1,url3))
my_params={
    'name':'张三',
    'age':20,
}
# 进行url编码
print(urlencode(my_params))
# name=%E5%BC%A0%E4%B8%89&age=20
print(quote('http://www.baidu.com/'))
# http%3A//www.baidu.com/
print(quote_plus('http://www.baidu.com/'))
# http%3A%2F%2Fwww.baidu.com%2F
print(unquote('http%3A%2F%2Fwww.baidu.com%2F'))
# http://www.baidu.com/

# https://ctool.dev/tool.html