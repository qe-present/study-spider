import os

def find_project_root(start=None):
    cur = os.path.abspath(start or os.getcwd())
    start_cur = cur
    while True:
        parent = os.path.dirname(cur)
        if parent == cur:
            return start_cur
        cur = parent

def current_file_relative_path(root=None):
    root_dir = os.path.abspath(root or find_project_root())
    file_path = os.path.abspath(__file__)
    return os.path.relpath(file_path, root_dir)

if __name__ == '__main__':
    print(current_file_relative_path())  # 输出: study-spider\src\course\25-11-08\__init__.py
