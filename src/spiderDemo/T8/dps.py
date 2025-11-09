from DrissionPage import ChromiumPage
import ddddocr, io
from PIL import Image

page = ChromiumPage()
ocr = ddddocr.DdddOcr(show_ad=False)
page.get('http://localhost:63342/study-spider/src/spiderDemo/T8/index.html')

# 1. 整张 numbers-grid 截屏
png = page.ele('.numbers-grid').get_screenshot(as_bytes='png')

# 2. 放大 2 倍提精度（可选）
img = Image.open(io.BytesIO(png)).convert('L')
w, h = img.size
img = img.resize((w * 2, h * 2), Image.LANCZOS)
buf = io.BytesIO()
img.save(buf, format='png')

# 3. 一次性识别
real_number = ocr.classification(buf.getvalue())
print('渲染后的完整数字：', real_number)      # -> 356