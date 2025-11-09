from fontTools.ttLib import TTFont
from fontTools.pens.basePen import BasePen
import matplotlib.pyplot as plt
from matplotlib.path import Path
import matplotlib.patches as patches

class MatplotlibPen(BasePen):
    def __init__(self):
        super().__init__()
        self.paths = []
        self.current_path = []

    def _moveTo(self, pt):
        if self.current_path:
            self.paths.append(self.current_path)
        self.current_path = [(pt[0], pt[1], Path.MOVETO)]

    def _lineTo(self, pt):
        self.current_path.append((pt[0], pt[1], Path.LINETO))

    def _curveToOne(self, pt1, pt2, pt3):
        self.current_path.append((pt1[0], pt1[1], Path.CURVE3))
        self.current_path.append((pt2[0], pt2[1], Path.CURVE3))
        self.current_path.append((pt3[0], pt3[1], Path.CURVE3))

    def _closePath(self):
        if self.current_path:
            self.current_path.append((0, 0, Path.CLOSEPOLY))
            self.paths.append(self.current_path)
            self.current_path = []

    def get_paths(self):
        if self.current_path:
            self.paths.append(self.current_path)
        return self.paths

# 加载字体
font = TTFont('font.woff2')
glyph_set = font.getGlyphSet()
glyph = glyph_set["one"]
pen = MatplotlibPen()
glyph.draw(pen)
paths = pen.get_paths()

# 画图
fig, ax = plt.subplots(figsize=(4, 4))
for path_data in paths:
    if not path_data:
        continue
    vertices = [(x, y) for x, y, _ in path_data]
    codes = [code for _, _, code in path_data]
    path = Path(vertices, codes)
    patch = patches.PathPatch(path, fill=True, edgecolor='black', facecolor='lightgray')
    ax.add_patch(patch)

ax.set_aspect('equal')
ax.autoscale_view()
ax.axis('off')
plt.title("one")
plt.show()