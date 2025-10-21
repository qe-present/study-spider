import execjs

with open('a.js', encoding='utf-8') as f:
    data = f.read()

ctx = execjs.compile(data)
ret = ctx.call('a')
print(ret['intermediate_value'])