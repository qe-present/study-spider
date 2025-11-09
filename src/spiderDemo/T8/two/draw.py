from pathlib import Path
import matplotlib.pyplot as plt
from matplotlib import font_manager
from ddddocr import DdddOcr
from io import BytesIO

ocr = DdddOcr(show_ad=False, beta=True)
font_path = Path('./font.woff2')
font_prop = font_manager.FontProperties(fname=str(font_path))

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

res = ocr.classification(png_bytes)      # 例如 '0123456789'
digit_dict = {idx: ch for idx, ch in enumerate(res)}
print(digit_dict)                        # {0: '0', 1: '1', ...}

buf.close()
plt.close()