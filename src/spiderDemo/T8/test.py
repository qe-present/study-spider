import ddddocr

ocr = ddddocr.DdddOcr(show_ad=False)
with open('./img.png', 'rb') as f:
    img_bytes = f.read()
res = ocr.classification(img_bytes)
print(res)  # 输出识别结果