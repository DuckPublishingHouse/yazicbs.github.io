// 所有变量添加 _year 避免与其他 JS 代码冲突产生 SyntaxError
const Now_year = new Date();
const StartTime_year = new Date(Now_year.getFullYear() + "-01-01T06:00:00+08:00"); // 转换成日期对象
const EndTime = new Date(Now_year.getFullYear() + "-02-12T18:00:00+08:00"); // 转换成日期对象

if (Now_year >= StartTime_year) {
    if (Now_year <= EndTime) {
        console.log("欢天喜地\n过 大 年 ！")
        console.error(`
            |    xxxx     |
           /|\\  -------  /|\\
           /|\\  |     |  /|\\
           /|\\  | *   |  /|\\
           /|\\  |     |  /|\\
           / \\  |     |  / \\
        `)
        console.log("话说...你看得出来这是一扇门+两串鞭炮吗？")

        /* --- 灯笼 --- */
        // 动态引入 CSS 文件
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://duckduckstudio.github.io/yazicbs.github.io/zh_cn/css/灯笼.css';
        document.head.appendChild(link);

        // 动态插入 HTML 内容
        const lanternHTML = `
            <!-- 灯笼 -->
            <div class="deng-box1">
                <div class="deng">
                    <div class="xian"></div>
                    <div class="deng-a">
                        <div class="deng-b">
                            <div class="deng-t">新年</div>
                        </div>
                    </div>
                    <div class="shui shui-a">
                        <div class="shui-c"></div>
                        <div class="shui-b"></div>
                    </div>
                </div>
            </div>
            <div class="deng-box2">
                <div class="deng">
                    <div class="xian"></div>
                    <div class="deng-a">
                        <div class="deng-b">
                            <div class="deng-t">快乐</div>
                        </div>
                    </div>
                    <div class="shui shui-a">
                        <div class="shui-c"></div>
                        <div class="shui-b"></div>
                    </div>
                </div>
            </div>
        `;
        
        // 将 HTML 内容插入到页面中
        document.body.innerHTML += lanternHTML;
    }
}
