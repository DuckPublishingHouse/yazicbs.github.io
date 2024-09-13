/*========================*/
/*       中文变量版        */
/*========================*/

console.log(`
    aaaad                 a         oaaa                   a  a
    a     a          vav  a   a     a      a            hh a       bg
    a     a  h   a  a     a a        aad  aaa  a   u  a    a  a  a    a
    a     a  h   a  c     a a           a  a   a   s  a    a  a  a    a
    aooaa    a a a  am cp a   a     aw ra  a   hb l    a  aa  a  ya  a

    本站维护人员：
    鸭鸭「カモ」

    ========================
           中文变量版        
    ========================

    欢迎关注我们的bilibili频道：@鸭鸭_カモ
    https://space.bilibili.com/2054654702/
`)

document.addEventListener('DOMContentLoaded', () => {
    // 定义时间
    const 当前时间 = new Date();
    console.log(`%c[log] 当前时间: ${当前时间}`, "color: cyan");

    // ----- 寒暑假日期，仅为大概 -----
    const 暑假开始 = new Date(当前时间.getFullYear(), 7, 1);
    const 暑假结束 = new Date(当前时间.getFullYear(), 8, 1);
    const 寒假开始 = new Date(当前时间.getFullYear(), 0, 20);
    const 寒假结束 = new Date(当前时间.getFullYear(), 1, 17);
    // ------------------------------

    function 获取下一个寒假开始时间(现在) {
        let 下一个寒假开始 = new Date(现在.getFullYear() + 1, 0, 20);
        if (现在 < 寒假开始) {
            下一个寒假开始 = 寒假开始;
        }
        return 下一个寒假开始;
    }

    function 更新时间() {
        const 现在 = new Date();
        let 消息_a = '';
        let 秒数 = 0;

        if (现在 < 寒假开始) {
            // 当前时间在寒假之前
            秒数 = Math.floor((寒假开始 - 现在) / 1000);
            消息_a = `距离寒假还有...`;
            消息_b = 格式化秒数(秒数);
        } else if (现在 < 寒假结束) {
            // 当前时间在寒假期间
            秒数 = Math.floor((寒假结束 - 现在) / 1000);
            消息_a = `距离寒假结束还有...`;
            消息_b = 格式化秒数(秒数);
        } else if (现在 < 暑假开始) {
            // 当前时间在寒假结束之后，暑假开始之前
            秒数 = Math.floor((暑假开始 - 现在) / 1000);
            消息_a = `距离暑假还有...`;
            消息_b = 格式化秒数(秒数);
        } else if (现在 < 暑假结束) {
            // 当前时间在暑假期间
            秒数 = Math.floor((暑假结束 - 现在) / 1000);
            消息_a = `距离暑假结束还有...`;
            消息_b = 格式化秒数(秒数);
        } else {
            // 当前时间在暑假结束之后
            const 下一个寒假开始 = 获取下一个寒假开始时间(现在);
            秒数 = Math.floor((下一个寒假开始 - 现在) / 1000);
            消息_a = `距离寒假还有...`;
            消息_b = 格式化秒数(秒数);
        }

        // 更新显示内容
        document.getElementById('all-title').innerHTML = 消息_a;
        document.getElementById('Time-Remaining').innerHTML = 消息_b;
    }

    function 格式化秒数(秒数) {
        return 秒数.toLocaleString().replace(/,/g, '<span class="comma">,</span>');
    }

    // 每秒更新一次
    setInterval(更新时间, 1000);

    // 初次调用以显示时间
    更新时间();
});
