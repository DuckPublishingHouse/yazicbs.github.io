import os
import re
from datetime import datetime

# 定义目录路径
图片目录 = 'music_games/photos/Milthm'
html路径 = 'music_games/games/Milthm/index.html'

# 读取原始 HTML 文件
with open(html路径, 'r', encoding='utf-8') as 文件:
    内容 = 文件.read()

# 正则表达式模式，用于清除指定的 HTML 部分（移动端与电脑端内容和索引）
匹配 = [
    r'<!-- 移动端索引 Start -->.*?<!-- 移动端索引 End -->',
    r'<!-- 电脑端索引 Start -->.*?<!-- 电脑端索引 End -->',
    r'<!-- 移动端内容 Start -->.*?<!-- 移动端内容 End -->',
    r'<!-- 电脑端内容 Start -->.*?<!-- 电脑端内容 End -->'
]

# 使用正则替换，仅删除注释标签之间的内容，保留注释标签
for 单项匹配 in 匹配:
    # 这里通过在替换内容时仅删除标签之间的内容，而保留注释标签
    内容 = re.sub(单项匹配, lambda m: m.group(0).split('>')[0] + '> ', 内容, flags=re.DOTALL)

# 将清理后的 HTML 写回文件
with open(html路径, 'w', encoding='utf-8') as 文件:
    文件.write(内容)

print(f"旧内容已清空，注释标签保留。")

# 预定义等级和对应的颜色
等级颜色 = {
    'R': '#bba6f4',
    'Spp': '#bba6f4',
    'Sp': '#72c1e6',
    # S、A、B、C 等其他等级不需要颜色
}

# 正则表达式匹配图片文件名，提取歌名、分数和等级
图片正则 = re.compile(r'\[(.*?)\]-([\d]+)-(R|Spp|Sp|S|A|B|C)\.png')

# 存储移动端和电脑端的歌曲信息
移动端 = []
电脑端 = []

# 获取文件的最后修改日期，格式化为 YYYYMMDD
def 获取文件最后修改日期(文件):
    时间 = os.path.getmtime(文件) # 获取文件的最后修改时间
    return datetime.fromtimestamp(时间).strftime('%Y%m%d') # 转换为 YYYYMMDD 格式

# 遍历图片目录，处理所有图片文件
for 文件名 in os.listdir(图片目录):
    匹配 = 图片正则.match(文件名)
    if 匹配:
        曲名 = 匹配.group(1)
        成绩 = 匹配.group(2)
        等级 = 匹配.group(3)
        是电脑端 = "(PC)" in 曲名  # 判断是否为PC版本

        # 生成图片的相对 URL
        图片链接 = f"https://duckduckstudio.github.io/yazicbs.github.io/music_games/photos/Milthm/{文件名}"
        
        # 获取文件的最后修改日期并作为 alt 属性
        文件路径 = os.path.join(图片目录, 文件名)
        alt内容 = 获取文件最后修改日期(文件路径)

        if 是电脑端:
            曲名无PC = re.sub(r'\(PC\)', '', 曲名)
        else:
            曲名无PC = 曲名
        
        # 根据等级是否在 level_colors 中，决定是否添加颜色
        if 等级 in 等级颜色:
            内容标题 = f"{曲名无PC} {成绩} <span style='color: {等级颜色[等级]};'>{等级}</span>"
        else:
            内容标题 = f"{曲名无PC} {成绩} {等级}"

        # 判断是否是最后一个元素，避免添加 <hr />
        if 文件名 == os.listdir(图片目录)[-1]:
            内容 = f"<h3 id='{曲名}' class='center_text'>{内容标题}</h3>\n<img src='{图片链接}' alt='{alt内容}'>"
        else:
            内容 = f"<h3 id='{曲名}' class='center_text'>{内容标题}</h3>\n<img src='{图片链接}' alt='{alt内容}'>\n<hr />\n"
        
        # 分类为移动端或电脑端
        if 是电脑端:
            电脑端.append((曲名, 内容))
        else:
            移动端.append((曲名, 内容))

# 生成索引部分的 HTML 代码
def 生成索引部分(曲目, 是电脑端):
    索引内容 = ""
    for i, (曲名, _) in enumerate(曲目):        
        索引内容 += f'<a href="#{曲名}">{曲名}</a>\n'
        if i < len(曲目) - 1:
            索引内容 += '&nbsp;|&nbsp;\n'
    
    return 索引内容.strip()

# 生成完整的 HTML 内容并更新文件
def 生成完整内容():
    with open(html路径, 'r', encoding='utf-8') as 文件:
        html内容 = 文件.read()

    # 生成索引部分
    移动端索引 = 生成索引部分(移动端, 是电脑端=False)
    电脑端索引 = 生成索引部分(电脑端, 是电脑端=True)
    
    # 生成内容部分
    移动端内容 = ''.join([内容 for _, 内容 in 移动端])
    电脑端内容 = ''.join([内容 for _, 内容 in 电脑端])

    # 替换原始 HTML 中的内容
    html内容 = html内容.replace("<!-- 移动端索引 Start -->", f"<!-- 移动端索引 Start -->\n{移动端索引}")
    html内容 = html内容.replace("<!-- 电脑端索引 Start -->", f"<!-- 电脑端索引 Start -->\n{电脑端索引}")
    html内容 = html内容.replace("<!-- 移动端内容 Start -->", f"<!-- 移动端内容 Start -->\n{移动端内容}")
    html内容 = html内容.replace("<!-- 电脑端内容 Start -->", f"<!-- 电脑端内容 Start -->\n{电脑端内容}")

    # 写入更新后的 HTML 文件
    with open(html路径, 'w', encoding='utf-8') as file:
        file.write(html内容)
    print("HTML 文件已更新。")

# 执行更新 HTML 内容的操作
生成完整内容()
