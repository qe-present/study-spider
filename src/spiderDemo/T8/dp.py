from DrissionPage import ChromiumPage
import ddddocr
page=ChromiumPage()
ocr = ddddocr.DdddOcr(show_ad=False)
page.get("http://localhost:63342/study-spider/src/spiderDemo/T8/one/index.html")
grid =page.ele("@class=numbers-grid")
children = grid.eles("tag:div")
for child in children:
    real_number=ocr.classification(child.get_screenshot(as_bytes='png'))
    print('渲染后的数字：', real_number)