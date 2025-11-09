import xml.etree.ElementTree as ET
import matplotlib.pyplot as plt
from matplotlib.path import Path
import matplotlib.patches as mpatches
import numpy as np
import ddddocr
import io

# ---------- 数据 ----------
xml = '''<root><TTGlyph name="seven" xMin="0" yMin="-32" xMax="320" yMax="416"><contour>
<pt x="320" y="103" on="1"/><pt x="319" y="46" on="0"/><pt x="280" y="8" on="1"/><pt x="280" y="8" on="1"/><pt x="242" y="-31" on="0"/><pt x="185" y="-32" on="1"/><pt x="105" y="-32" on="1"/><pt x="69" y="-32" on="0"/><pt x="41" y="-12" on="1"/><pt x="13" y="8" on="0"/><pt x="2" y="42" on="1"/><pt x="-2" y="55" on="0"/><pt x="3" y="67" on="1"/><pt x="9" y="78" on="0"/><pt x="22" y="83" on="1"/><pt x="35" y="87" on="0"/><pt x="46" y="81" on="1"/><pt x="58" y="75" on="0"/><pt x="62" y="62" on="1"/><pt x="74" y="34" on="0"/><pt x="105" y="32" on="1"/><pt x="185" y="32" on="1"/><pt x="215" y="33" on="0"/><pt x="235" y="53" on="1"/><pt x="255" y="73" on="0"/><pt x="256" y="103" on="1"/><pt x="255" y="134" on="0"/><pt x="235" y="154" on="1"/><pt x="215" y="174" on="0"/><pt x="185" y="175" on="1"/><pt x="32" y="175" on="1"/><pt x="17" y="175" on="0"/><pt x="7" y="186" on="1"/><pt x="-2" y="198" on="0"/><pt x="1" y="212" on="1"/><pt x="33" y="390" on="1"/><pt x="39" y="414" on="0"/><pt x="64" y="416" on="1"/><pt x="256" y="416" on="1"/><pt x="270" y="416" on="0"/><pt x="279" y="407" on="1"/><pt x="288" y="398" on="0"/><pt x="288" y="384" on="1"/><pt x="288" y="370" on="0"/><pt x="279" y="361" on="1"/><pt x="270" y="352" on="0"/><pt x="256" y="352" on="1"/><pt x="91" y="352" on="1"/><pt x="70" y="239" on="1"/><pt x="185" y="239" on="1"/><pt x="242" y="237" on="0"/><pt x="280" y="199" on="1"/><pt x="319" y="161" on="0"/><pt x="320" y="103" on="1"/></contour><instructions/></TTGlyph></root>'''
root = ET.fromstring(xml)
glyph = root.find('TTGlyph')

def make_path(pts):
    pts = pts + [pts[0]]
    v, c = [], []
    for i, (x, y, on) in enumerate(pts[:-1]):
        if on:
            v.append((x, y))
            c.append(Path.MOVETO if i == 0 else Path.LINETO)
        elif not pts[i + 1][2]:  # 双 off
            x2, y2, _ = pts[i + 2]
            v.extend([(x, y), (x2, y2)])
            c.extend([Path.CURVE3, Path.CURVE3])
        else:
            v.append((x, y))
            c.append(Path.LINETO)
    c[-1] = Path.CLOSEPOLY
    return Path(v, c)

fig, ax = plt.subplots(figsize=(2, 3), dpi=64)
for ctr in glyph.findall('contour'):
    pts = [(int(p.get('x')), int(p.get('y')), int(p.get('on'))) for p in ctr.findall('pt')]
    ax.add_patch(mpatches.PathPatch(make_path(pts), fc='black', ec='black', lw=1))
ax.set(xlim=(-10, 330), ylim=(-40, 420), aspect='equal')


# ---------- 画布 → 数组 ----------
buf = io.BytesIO()
fig.canvas.print_png(buf)  # 无窗口，纯内存
buf.seek(0)
print(ddddocr.DdddOcr(show_ad=False).classification(buf.read()))