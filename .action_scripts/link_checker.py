import os
import re
import sys
import requests

# 配置
DIRECTORY = '..' # 指定要检查的目录
IGNORE_FOLDERS = ['ignore_folder'] # 忽略的文件夹
IGNORE_FILES = ['ignore_file.js', 'ignore_file.css', 'Duck Parkour.html'] # 忽略的文件
IGNORE_URLS = ['https://space.bilibili.com/2054654702/'] # 忽略的链接

# 链接正则表达式
URL_REGEX = re.compile(r'https?://[^\s\"\'<>]+')

def check_link(url):
    if url in IGNORE_URLS:
        return 'Ignored URL', 'ignored'
    try:
        response = requests.head(url, allow_redirects=True)
        if response.status_code == 412:
            return '412 Precondition Failed', 'pass'
        elif response.status_code == 404:
            return '404 Not Found', 'faild'
        elif response.status_code == 200:
            return 200, 'pass'
        return response.status_code, 'pass'
    except requests.ConnectionError:
        return 'Connection Error', 'faild'
    except requests.Timeout:
        return 'Timeout', 'faild'
    except requests.RequestException as e:
        return f'Error: {str(e)}', 'faild'

def check_files():
    for root, dirs, files in os.walk(DIRECTORY):
        # 忽略指定的文件夹
        if any(ignore in root for ignore in IGNORE_FOLDERS):
            continue
        
        for file in files:
            # 忽略指定的文件
            if file in IGNORE_FILES or not file.endswith(('.html', '.css', '.js')):
                continue
            
            file_path = os.path.join(root, file)
            relative_file_path = os.path.relpath(file_path, DIRECTORY) # 计算相对路径
            with open(file_path, 'r', encoding='utf-8') as f:
                for line_number, line in enumerate(f, start=1):
                    urls = URL_REGEX.findall(line)
                    for url in urls:
                        status_code, status_message = check_link(url)
                        if status_message == 'ignored':
                            continue
                        if status_code == 200:
                            print('*', end='')
                        else:
                            if status_message == "pass":
                                print(f'\n[WARN] 文件: {relative_file_path}, 行号: {line_number}, 链接: {url}, 返回代码: {status_code}')
                            elif status_message == "faild":
                                print(f'\n[ERROR] 文件: {relative_file_path}, 行号: {line_number}, 链接: {url}, 返回代码: {status_code}')
                                sys.exit(1)

if __name__ == '__main__':
    check_files()
