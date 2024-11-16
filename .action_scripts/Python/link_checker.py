import os
import re
import sys
import requests

DIRECTORY = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
IGNORE_FOLDERS = ['music_games'] # 忽略的文件夹
IGNORE_FILES = ['Duck Parkour.html'] # 忽略的文件
IGNORE_URLS = [
    # 常时
    'https://duckduckstudio.github.io/yazicbs.github.io/Interesting/sounds/*.mp3',
    'https://duckduckstudio.github.io/yazicbs.github.io/music_games/photos/show.png'
] # 忽略的链接

# 更新后的链接正则表达式
URL_REGEX = re.compile(r'"https://[^\'"\n\r\s<>]*(?=[\'"])')

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
        return 'Connection Error', 'pass'
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
                        if url.startswith(("'", '"')):
                            url = url.strip('\'"') # 去除引号
                        status_code, status_message = check_link(url)
                        if status_message == 'ignored':
                            print(f'\n[IGNORED] 文件: {relative_file_path} | 行号: {line_number} | 链接: {url} | 返回代码: {status_code}')
                        elif status_code == 200:
                            print('*', end='')
                        else:
                            if status_message == "pass":
                                print(f'\n[WARNING] 文件: {relative_file_path} | 行号: {line_number} | 链接: {url} | 返回代码: {status_code}')
                            elif status_message == "faild":
                                print(f'\n[ERROR] 文件: {relative_file_path} | 行号: {line_number} | 链接: {url} | 返回代码: {status_code}')
                                sys.exit(1)

if __name__ == '__main__':
    check_files()
