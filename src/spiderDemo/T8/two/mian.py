import time
from io import BytesIO
import base64
import requests
from pathlib import Path
import matplotlib.pyplot as plt
from matplotlib import font_manager
from ddddocr import DdddOcr

ocr = DdddOcr(show_ad=False,beta=True)
def get_map(page):
    font_path = Path(f'./font/font_{page}.woff2')
    font_prop = font_manager.FontProperties(fname=font_path)
    fig, ax = plt.subplots(figsize=(12, 4))
    fig.patch.set_facecolor('white')
    ax.set_facecolor('white')
    ax.axis('off')
    text = '0123456789'
    char_spacing = 0.2
    for i, char in enumerate(text):
        x_pos = 0.01 + i * 0.5 * char_spacing
        ax.text(x_pos, 0.5, char,
                fontproperties=font_prop,
                fontsize=70,
                color='black',
                ha='center', va='center')
    buf = BytesIO()
    plt.savefig(buf, format='png', facecolor='white', dpi=300, bbox_inches='tight')
    buf.seek(0)
    png_bytes = buf.read()
    res = ocr.classification(png_bytes)
    digit_dict = {str(idx): ch for idx, ch in enumerate(res)}
    buf.close()
    plt.close()
    return digit_dict

cookie={
    'sessionid':'ivyip05u34h3tdsm06otmm66clfgqikt'
}
params={
    'challenge_type':'font_anti_challenge',
}
headers={
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
}
total=0
Path('./font').mkdir(exist_ok=True)
for page in range(1,101):
    url=f'https://www.spiderdemo.cn/font_anti/api/font_anti_challenge/page/{page}'
    res=requests.get(url=url,params=params,cookies=cookie,headers=headers)
    data=res.json()
    b64_font=data['b64Font']
    page_data=data['page_data']
    with open(f'./font/font_{page}.woff2','wb') as f:
        f.write(base64.b64decode(b64_font))
    mapping=get_map(page)
    print(mapping)
    for item in page_data:
        number_str = ''
        for ch in item:
            number_str += str(mapping[ch])
        print(number_str)
        total += int(number_str)
    print("第{}页获取完成".format(page))
print(total)
