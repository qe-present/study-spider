# 锚点
在 HTML 中，**锚点（Anchor）** 是一种用于在同一页面内或跨页面**跳转到指定位置**的机制。它通过 `id` 或 `name` 属性实现，常见于**目录跳转**或**返回顶部**等功能。

---

### ✅ 锚点的两种用法

#### 1. **同一页面内跳转**
```html
<!-- 目标位置 -->
<h2 id="section1">第一节</h2>
<p>这里是第一节的内容……</p>

<!-- 跳转链接 -->
<a href="#section1">跳转到第一节</a>
```

#### 2. **跨页面跳转**
```html
<!-- 在 index.html 中 -->
<a href="about.html#team">跳转到 about.html 的 team 部分</a>

<!-- 在 about.html 中 -->
<h3 id="team">团队介绍</h3>
```

---

### ⚠️ 注意事项
- `id` 是 HTML5 推荐的写法，**不要用 `name` 属性**（已过时）。
- `id` 必须是唯一的，不能重复。
- 锚点跳转**不会重新加载页面**，只是滚动到对应位置。

---

### ✅ 小例子：返回顶部
```html
<a href="#top">返回顶部</a>

<div id="top" style="height: 2000px;">页面顶部</div>
```

---

### ✅ 总结一句话：
> HTML 中的锚点就是**通过 `id` 标记位置，用 `#id` 实现跳转**的机制。
# url encoding
URL 编码（也称为百分号编码）是一种将 URL 中的特殊字符
转换为可传输格式的机制。它通过将字符转换为 `%` 后跟两位十六进制数来表示这些字符。
&a=1  变成 %26a%3D1
主页  变成 %E4%B8%BB  %E9%A1%B5
unicode  1个汉字 3个字节
gbk 1个汉字 2个字节
utf-8 1个汉字 3个字节
```python
s="主页"
print(s.encode("utf-8"))
# b'\xe4\xb8\xbb\xe9\xa1\xb5'
```
拼接url
```python
from urllib.parse import urljoin,quote,urlencode
url1='http://www.baidu.com/s/c'
url2='/a/b'
url3='a/b'
print(url1+url2)
print(url1+url3)
print(urljoin(url1,url2))
print(urljoin(url1,url3))
"""
http://www.baidu.com/s/c/a/b
http://www.baidu.com/s/ca/b
http://www.baidu.com/a/b
http://www.baidu.com/s/a/b
"""
my_params={
    'name':'张三',
    'age':20,
}
# 进行url编码
print(urlencode(my_params))
# name=%E5%BC%A0%E4%B8%89&age=20
```
有些网址，cookie需要一部分进行url编码，使用quote
```python
print(quote('http://www.baidu.com/'))
# http%3A//www.baidu.com/
print(quote_plus('http://www.baidu.com/'))
# http%3A%2F%2Fwww.baidu.com%2F
print(unquote('http%3A%2F%2Fwww.baidu.com%2F'))
# http://www.baidu.com/
```
使用工具网站解码[https://ctool.dev/tool.html](tool)
# 字符串
数字->字节
字节->数字
# hex  十六进制
"主页"=>[228,184,187,228,185,154]
     =>[11100100, 10111000, 10111011, 11100100, 10111001, 10011010]
     =>e4 b8 bb e9 a1 95
     =>e4b8bbe9a195
0-255 表示一个字节
```python
import binascii
s='主页'
bs=s.encode('utf-8')
print(bs)
# b 表示byte a 表示ascii hex表示十六进制
res=binascii.b2a_hex(bs)
print(res)
```
# base64
base64 是一种将二进制数据转换为文本格式的编码方式，常用于在电子邮件和 URL 中传输二进制数据。
它将每三个字节的数据转换为四个可打印字符，从而确保数据在传输过程中不会被损坏。
abc -> 01100001 01100010 01100011
     -> 011000 010110 001001 100011  0-63
     -> 24 22 9 35 
     -> [0-9] [A-Z] [a-z] [+ /]  映射表
        10+26+26+2=64 
     ->如果 [0,1,2...A,B,C...a,b,c...+ /]
     ->24 22 9 35作为索引，查表
上面 的过程可以用下面的代码实现
```python
ls='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'
result=ls[24]+ls[22]+ls[9]+ls[35]
print(result)
```
在末尾数量不够，填充=，出现等号
# 签名
签名是对数据进行加密处理，生成一段唯一的字符串，用于验证数据的完整性和真实性。
在密码学里，**签名**指的是**数字签名（digital signature）**——  
一种**用私钥生成、用公钥验证**的**比特串**，作用只有三句话：

1. **认证身份**：谁签的？  
2. **保证完整**：内容被改过吗？  
3. **防止抵赖**：签的人事后不能说“我没签过”。

---

### 1. 核心机制（非对称密码学）
1. 签名方有一对钥匙：  
   - 私钥（sk）——自己藏着  
   - 公钥（pk）——公开给全世界  

2. 对消息 m 的签名过程：  
   σ = Sign(sk, m)          // 内部先做哈希再做私钥运算，得到一串比特 σ  

3. 任何人拿到 (m, σ, pk) 后：  
   Verify(pk, m, σ) → True/False   // 用公钥验证 σ 是否匹配  

只要验证通过，就能确认：  
- 消息确实由持有对应私钥的人产生；  
- 消息在传输中 1 bit 都没被改；  
- 签名方无法否认。

---

### 2. 常用算法
| 算法/标准 | 密钥长度 | 签名长度 | 特点 |
|-----------|-----------|-----------|------|
| RSA-PSS   | 2048/3072 bit | 256/384 B | 最老牌，兼容广 |
| DSA       | 2048 bit L  | 40–56 B   | 美国老标准，已淘汰 |
| ECDSA     | 256 bit     | 64 B      | 区块链主流（Bitcoin、Ethereum） |
| EdDSA(Ed25519) | 256 bit | 64 B | 现代首选，常量时间、防侧信道 |
| SM2       | 256 bit     | 64 B      | 中国国密标准 |

---

### 3. 一个最小可运行的例子（Python 版）
```python
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa, padding

# 1. 生成密钥对
private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
public_key  = private_key.public_key()

# 2. 签名
message = b"Alice owes Bob 1 BTC"
signature = private_key.sign(
    message,
    padding.PSS(mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH),
    hashes.SHA256()
)

# 3. 验证
try:
    public_key.verify(signature, message,
                      padding.PSS(mgf=padding.MGF1(hashes.SHA256()),
                                  salt_length=padding.PSS.MAX_LENGTH),
                      hashes.SHA256())
    print("验证通过")
except Exception:
    print("验证失败")
```

---

### 4. 与“加密”区别
| 功能 | 加密 | 数字签名 |
|------|------|----------|
| 目的 | 保密性 | 认证+完整+不可抵赖 |
| 密钥用法 | 公钥加密，私钥解密 | 私钥签名，公钥验证 |
| 结果 | 密文 | 签名比特串 |

---

### 5. 高级扩展
- **聚合签名**：把 n 个签名压成 1 个（BLS12-381）。  
- **门限签名**：t-of-n 个人合作才能产生有效签名。  
- **盲签名**：签名者不知道消息内容（电子现金）。  
- **零知识证明**：证明“我知道私钥”却不暴露公钥。  

---

### 一句话记住
> **密码学里的“签名”就是“用私钥生成的、可被公钥验证的、对消息摘要的加密哈希”——它让比特世界拥有了手写签名级别的法律效力。**
> 
## 签名，在客户端的请求之前，把url,请求方式，随机值混合在一起，通过一个计算，生成一个结果，这个结果就是签名
你描述的这种“签名”并不是密码学里严格意义上的“数字签名”，而是**接口防篡改/防重放**常用的**“请求签名”**（request signing）机制。它的目标只有三点：

1. 服务端能确认**请求内容没被篡改**（完整性）。  
2. 服务端能确认**请求方知道某个密钥**（身份认证）。  
3. 服务端能拒绝**重复请求**（防重放）。

---

### 1. 典型流程（以 HTTP 为例）

| 步骤 | 客户端行为 | 举例 |
|----|-------------|------|
| ① 准备原始串 | 把 **method + URL + query/body + nonce + timestamp** 按固定顺序拼成一条字符串 | `POST\n/v1/pay\namount=10&to=Bob\nnonce=123456\nt=1710000000` |
| ② 加密钥 | 在串末尾拼上 **Secret**（只有客户端和服务端知道） | `…t=1710000000\nSecret=8bca12` |
| ③ 计算摘要 | 对最终串做一次 **HMAC-SHA256**（或纯 SHA256） | `sig = hex(HMAC(k, raw))` |
| ④ 放在请求里 | 把 `sig` 作为 header（或 query）发给服务端 | `Authorization: Bearer app_id:1710000000:123456:sig` |
| ⑤ 服务端验签 | 用同样算法、同样密钥复算一遍，一致即通过 | —— |

---

### 2. 与“数字签名”区别

| 维度 | 请求签名 | 数字签名 |
|------|-----------|-----------|
| 密钥类型 | 对称密钥（双方共享） | 非对称密钥对（私钥只签名方有） |
| 算法 | HMAC/哈希 | RSA/ECDSA/EdDSA |
| 作用域 | 单次 HTTP 请求 | 任意数据、长期有效、可公开验证 |
| 防抵赖 | ❌（双方都知道密钥，服务端也能伪造） | ✅（只有签名方持有私钥） |
| 性能 | 极快 | 相对慢 |

---

### 3. 一句话总结

> **“在客户端请求前把 URL、方法、随机数、密钥混在一起算个哈希/HMAC”** ——  
> 这不是密码学意义上的“数字签名”，而是**接口级请求签名**，用来**防篡改、防重放、做身份认证**，但**不能防抵赖**，因为密钥是双方共享的。
# md5 算法
```python
from hashlib import md5
s='123456'
print(md5(s.encode('utf-8')).hexdigest())
```
# 其他hash算法
sha1 sha256 sha512
```python
from hashlib import sha1
s='123456'
h=sha1(s.encode('utf-8')).hexdigest()
print(h) 
```






















