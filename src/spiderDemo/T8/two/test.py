from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

font = TTFont('font.woff2')
gs   = font.getGlyphSet()
pen  = SVGPathPen(gs)

for name in ['zero','one','two','three','four','five','six','seven','eight','nine']:
    pen.__init__(gs)
    gs[name].draw(pen)

    g = font['glyf'][name]
    w, h = g.xMax - g.xMin, g.yMax - g.yMin

    svg_str = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="{g.xMin} {-g.yMax} {w} {h}" xmlns="http://www.w3.org/2000/svg">
  <g transform="scale(1,-1)">
    <path d="{pen.getCommands()}" fill="#000"/>
  </g>
</svg>'''

    with open(f'{name}.svg', 'w', encoding='utf-8') as f:
        f.write(svg_str)