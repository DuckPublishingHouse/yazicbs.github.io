import requests
import json

# GitHub个人访问令牌（Personal Access Token）
token = 'ghp_oRsY3GwXjTugOWvggG4OLiJo5sx0Xd1198d1'

# API的URL，替换为你自己的仓库信息
owner = 'fjwxzde'  # 你的 GitHub 用户名
repo = 'yazicbs.github.io'  # 你的仓库名称
url = f'https://api.github.com/repos/{owner}/{repo}/labels'

# 请求头，包含认证信息
headers = {
    'Authorization': f'token {token}',
    'Content-Type': 'application/json'
}

# 请求体（JSON格式），定义标签的信息
data = {
    "name": "bug",         # 标签的名称
    "color": "d73a4a",     # 标签的颜色（六位 RGB 十六进制代码）
    "description": "Indicates a bug in the project"  # 标签的描述
}

# 发送POST请求
response = requests.post(url, headers=headers, data=json.dumps(data))

# 打印返回的状态码和响应内容
if response.status_code == 201:
    print('标签创建成功！')
    print('响应数据:', response.json())
else:
    print(f'请求失败！状态码: {response.status_code}')
    print('错误信息:', response.json())
