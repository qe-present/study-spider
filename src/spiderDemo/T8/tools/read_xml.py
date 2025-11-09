from fontTools.ttLib import TTFont

# 1. 打开字体
font = TTFont("../font.woff")      # 换成你的 ttf 路径

# 2. 拿到 glyf 表对象
glyf_table = font["glyf"]

# 3. 遍历所有字形
for glyph_name in glyf_table.keys():
    glyph = glyf_table[glyph_name]   # Glyph 对象

    # 3.1 简单信息
    print("glyph:", glyph_name)
    print("  numberOfContours:", glyph.numberOfContours)

    # 3.2 有轮廓（numberOfContours>0）才解析坐标
    if glyph.numberOfContours >= 0:
        glyph.expand(font["glyf"])   # 展开复合字形
        print("  coordinates:", glyph.coordinates)   # 轮廓点 [(x,y),...]
        print("  flags:", glyph.flags)               # 点类型
        print("  endPtsOfContours:", glyph.endPtsOfContours)
    else:
        print("  这是一个空字形（numberOfContours = -1）")

    # 3.3 如果是复合字形（由其他字形拼成）
    if glyph.isComposite():
        for comp in glyph.components:
            print("  component glyph:", comp.glyphName)
            print("    transform:", comp.transform)   # 2×2 变换矩阵
            print("    offset:", (comp.x, comp.y))

