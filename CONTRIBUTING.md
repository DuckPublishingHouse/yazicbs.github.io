# 个人网站贡献文档
我知道，可能不会有人去为他人的网站修改BUG(顶多提出来)，但我还是要写这个贡献文档。不是因为闲，而是因为我希望如果真的有人可以帮助我优化网站，它可以清晰的获取到网站的信息。  

如果你对网页做出了贡献，我会在网页的明显位置做出感谢的。  
当然，你也可以写一个你自己的网页，如果你不希望我写的感谢网页的话。只要不要将你自己的网页和我的网页混在一起就行，免得我自己误删。  
你可以将其放在`other`文件夹中，那里面专门放其他人的网页。  

# 提交建议 / 直接修改
您可以通过在仓库的[Issues](https://github.com/DuckDuckStudio/yazicbs.github.io/issues)界面提交您的建议，您也可以Fork本仓库后直接修改并提交 PR。  
请确保您的修改没有与其他PR重复或者无效后再提交PR。  

## 不会处理的 PR
- 对个人主页信息进行大范围的误导性修改的
- 破坏目录夹架构的
- 含非法内容的
- 无效的
- 重复的
- 影响未在PR中提到的页面的内容的

## Issues与PR回复日期
如果你提交了Issues或PR，则我会在 **7日(1周)内** 做出回复，无论是否接受或者拒绝。由于个人技术原因，有些建议Issues可能迟迟无法实现。  

# 网页架构
以下为对网页依赖的说明，最后编辑于 **2024年5月18日**，可能有部分多余依赖，可以直接PR删掉。  
以下是有关网页文件夹的架构:  

yazicbs.github.io  
├───Articles  
│   ├───English Notes → 个人英语笔记，比较凌乱  
│   └───photos → 某鸭的日常记录使用的图片  
├───en → 英语翻译的页面  
├───GenshinImpact → 某鸭的原神日常页面  
│   └───photos → 某鸭的原神日常使用的图片  
│       ├───edited → 经过二次编辑的(包括裁剪)  
│       └───original → 原图  
│           ├───其他形状  
│           ├───整活  
│           ├───正方形  
│           └───竖屏  
├───icos → 网站图标汇总  
├───Interesting → 一些有趣的页面  
│   ├───duck_forever → 循环鸭叫  
│   │   └───sounds → 使用的音频文件  
│   └───Fake Blue screen of death → 假蓝屏页面  
│       └───imgs → 使用的图片  
├───minecraft → 某鸭的Minecraft世界页面  
│   ├───excel → 表格附件  
│   ├───photos → 使用的图片  
│   └───promotion → 推广页面(编的)  
│       └───oak_island → 橡木岛  
│           └───photos → 推广页面>橡木岛所需图片  
├───music_games → 某鸭的音游记录  
│   ├───disuke → ~~快把浴霸关上！~~  
│   ├───games → 对应音游的展示页  
│   │   ├───Arcaea  
│   │   ├───GenshinImpact  
│   │   ├───MuseDash  
│   │   ├───Orzmic  
│   │   ├───Paradigm_Reboot  
│   │   ├───Phigros  
│   │   └───Project_Sekai  
│   └───photos → 对应音游的图片  
│       ├───Arcaea  
│       ├───GenshinImpact  
│       ├───index  
│       ├───MuseDash  
│       ├───Orzmic  
│       ├───Paradigm_Reboot  
│       ├───Phigros  
│       └───Project_Sekai  
├───new_page → 摆烂了很久的新页面  
│   ├───css  
│   └───photos  
├───other → 其他人的网页，请将每个人的网页再用文件夹包起来！如果可以，请在这里添加对您的网页的说明。  
├───pictures → 网页所用图片(zh_cn)  
├───project_photos → 其他repo使用的图片  
│   └───文章图片 → repo Articles 使用的图片  
├───Tools → 自己做的一些小工具的索引页  
│   ├───chinese_git → repo Chinese_git 的网站  
│   │   └───photos  
│   └───Fufu_Tools → repo Fufu_Tools 的网站  
│       ├───least_update → 最后更新(正式版)  
│       ├───minimum → 最低系统要求  
│       ├───photos → 所用图片  
│       ├───versions → 版本定义  
│       ├───wiki → 芙芙工具箱的文档  
│       │   ├───config  
│       │   ├───files → 附件  
│       │   │   ├───ini  
│       │   │   │   ├───查看电脑配置默认config  
│       │   │   │   └───缓存清理默认config  
│       │   │   ├───py  
│       │   │   │   ├───返回查看电脑配置config默认配置  
│       │   │   │   └───返回缓存清理config默认配置  
│       │   │   └───text  
│       │   ├───photos → 所用图片  
│       │   ├───各个工具文档  
│       │   │   ├───实验性小工具  
│       │   │   │   ├───hosts修改  
│       │   │   │   ├───批量添加水印  
│       │   │   │   ├───水下音效  
│       │   │   │   └───自动化  
│       │   │   │       └───自动按键连按  
│       │   │   ├───摩斯密码  
│       │   │   ├───进制转换  
│       │   │   └───颜色代码展示  
│       │   ├───常见问题Q&A  
│       │   │   ├───主程序  
│       │   │   └───小工具  
│       │   └───通用  
│       └───分类解释  
├───zh_cn → 个人主页面  
│   ├───css → 样式表  
│   └───js → JS代码  
└───外部文件 → 外部依赖  

> [!NOTE]
> 以上的`photos`文件夹基本是 **仅为上级文件夹服务，请勿混用。**  
> 各个文件的详细作用在这里无法列出，因为实在是太多文件了，请见谅。  
> 如果你不了解某个文件的具体作用是什么，可以 **先打开看看里面是什么东西** ，然后你大概就知道那个文件是做什么的了。而且我大部分注释都没有删。  

# 通用样式
你可以直接使用以下通用样式:  
```html
<!-- 芙芙工具箱网页通用样式 by鸭鸭「カモ」 -->
<link rel="stylesheet" href="https://duckduckstudio.github.io/yazicbs.github.io/Tools/Fufu_Tools/css/universal.css">
```
