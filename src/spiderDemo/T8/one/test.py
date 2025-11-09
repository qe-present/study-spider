from DrissionPage import Chromium, ChromiumOptions

co = ChromiumOptions()
co.ignore_certificate_errors(True)
tab = Chromium(addr_or_opts=co).latest_tab
tab.get('https://www.doc88.com/p-781472637589.html')



# 使用示例
element = tab.ele('#pageContainer')
get_shot_by_canvas(tab, element, name='hd_shot.png')