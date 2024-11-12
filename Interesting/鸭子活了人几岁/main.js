/*========================*/
/*       中文变量版        */
/*========================*/

// 前面不要加空格
console.log(`
ddddd                 k         ssss                   d  i
d     d         c c c k   k     s      t            dddd      oooo
d     d  u   u  a     k k        sss  ttt  u   u  d    d  i  o    o
d     d  u   u  c     k k           s  t   u   u  d    d  i  o    o
ddddd    u u u  c c c k   k     sssss  t   u u u   ddddd  i   oooo

本站维护人员：
鸭鸭「カモ」
欢迎关注我的bilibili频道：@鸭鸭_カモ
https://space.bilibili.com/2054654702/
回到主页：https://duckduckstudio.github.io/yazicbs.github.io/
`)

document.addEventListener('DOMContentLoaded', () => {
    const 当前时间 = new Date(); // 我获取这个干啥
    console.log(`%c[log] 当前时间: ${当前时间}`, "color: cyan"); // 输出好看?

    const 鸭子出生 = new Date(2023, 11, 6); // 2023年12月5日
    const 鸭子没嘎 = true;
    let showDay = true; // 初始时显示“日”

    function 格式化岁数(岁数) {
        const 年 = Math.floor(岁数);
        const 月 = Math.floor((岁数 - 年) * 365 / 30); // 365天1年 30天1月
        const 日 = (((岁数 - 年) * 365 ) % 30).toFixed(2);
        const 返回 = [`${年} 岁 ${月} 月`, `${日}日`];
        return 返回;
    }

    function 更新岁数() {
        const 现在 = new Date();
        let 岁数 = ["🦆嘎了🦆",""];
        let 活了多久;

        // 鸭子活 8 年
        // 人活 80 岁

        try {
            if (鸭子没嘎) {
                活了多久 = (现在 - 鸭子出生) / 1000 / (365 * 24 * 60 * 60); // 年
                鸭子占比 = 活了多久 / 8;
                岁数 = 80 * 鸭子占比
                岁数 = 格式化岁数(岁数);
            }
        } catch (error) {
            岁数 = "没算出来";
            console.error(`[ERROR] 没算出来，因为:\n${error}`);
        }

        // 更新显示内容
        document.getElementById('age').innerHTML = 岁数[0];
        
        // 根据showDay控制是否显示“日”
        if (showDay) {
            document.getElementById('day').innerHTML = 岁数[1];
        } else {
            document.getElementById('day').innerHTML = "";
        }
    }

    // 每秒更新一次
    setInterval(更新岁数, 1000);

    // 初次调用以显示时间
    更新岁数();

    // 添加按钮点击事件来切换显示“日”
    document.getElementById('toggleDay').addEventListener('click', () => {
        showDay = !showDay;  // 切换显示状态
        更新岁数();  // 更新显示
    });
});
