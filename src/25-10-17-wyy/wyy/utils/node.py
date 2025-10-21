import os
import subprocess
from pathlib import Path
import execjs
def get_node(
        js_dir: str = 'js',
        js_path: str = 'index.js'
):
    """
    :param js_dir:  放 js 目录
    :param js_path: 需要执行的 js 文件路径
    :return: ctx 是 execjs context
    获取execjs的输出——Lib/site-packages/execjs/_external_runtime.py
    """
    js_dir = Path(js_dir).resolve()
    js_file = js_dir / js_path
    # 判断js文件是否存在
    if not js_file.exists():
        raise FileNotFoundError(f"没找到{js_file}文件")
    # 记录原始工作目录
    original_cwd = Path.cwd()

    try:
        # 1切到 js 目录，让 Node 能读到本地 node_modules
        os.chdir(js_dir)
        os.environ['NODE_PATH'] = str(js_dir / 'node_modules')
        # 2. 编译
        ctx = execjs.compile(js_file.read_text(encoding='utf-8'))
        return ctx
    finally:
        # 无论如何都把路径变回去
        os.chdir(original_cwd)