/*控制台输出DuckStudio*/
console.log(`
    aaaad                 a         oaaa                   a  a             
    a     a          vav  a   a     a      a            hh a       bg       
    a     a  h   a  a     a a        aad  aaa  a   u  a    a  a  a    a     
    a     a  h   a  c     a a           a  a   a   s  a    a  a  a    a     
    aooaa    a a a  am cp a   a     aw ra  a   hb l    a  aa  a  ya  a      

    本站维护人员：
    鸭鸭「カモ」
    欢迎关注我们的bilibili频道：@鸭鸭_カモ
    https://space.bilibili.com/2054654702/
`)

document.addEventListener('DOMContentLoaded', () => {
    // 定义时间
    const startDate = new Date();
    console.log(`%c[log] 当前时间: ${startDate}`, "color: cyan");

    // ----- 寒暑假日期，仅为大概 -----
    const summer_vacation_start = new Date(startDate.getFullYear(), 8, 1);
    const summer_vacation_end = new Date(startDate.getFullYear(), 10, 1);
    const winter_vacation_start = new Date(startDate.getFullYear(), 0, 20);
    const winter_vacation_end = new Date(startDate.getFullYear(), 1, 17);
    // ------------------------------

    function getNextWinterVacationStart(now) {
        let nextWinterStart = new Date(now.getFullYear() + 1, 0, 20);
        if (now < winter_vacation_start) {
            nextWinterStart = winter_vacation_start;
        }
        return nextWinterStart;
    }

    function updateTime() {
        const now = new Date();
        let message_a = '';
        let seconds = 0;

        if (now < winter_vacation_start) {
            // 当前时间在寒假之前
            seconds = Math.floor((winter_vacation_start - now) / 1000);
            message_a = `距离寒假还有...`;
            message_b = formatSeconds(seconds);
        } else if (now < winter_vacation_end) {
            // 当前时间在寒假期间
            seconds = Math.floor((winter_vacation_end - now) / 1000);
            message_a = `距离寒假结束还有...`;
            message_b = formatSeconds(seconds);
        } else if (now < summer_vacation_start) {
            // 当前时间在寒假结束之后，暑假开始之前
            seconds = Math.floor((summer_vacation_start - now) / 1000);
            message_a = `距离暑假还有...`;
            message_b = formatSeconds(seconds);
        } else if (now < summer_vacation_end) {
            // 当前时间在暑假期间
            seconds = Math.floor((summer_vacation_end - now) / 1000);
            message_a = `距离暑假结束还有...`;
            message_b = formatSeconds(seconds);
        } else {
            // 当前时间在暑假结束之后
            const nextWinterStart = getNextWinterVacationStart(now);
            seconds = Math.floor((nextWinterStart - now) / 1000);
            message_a = `距离寒假还有...`;
            message_b = formatSeconds(seconds);
        }

        // 更新显示内容
        document.getElementById('all-title').innerHTML = message_a;
        document.getElementById('Time-Remaining').innerHTML = message_b;
    }

    function formatSeconds(seconds) {
        return seconds.toLocaleString().replace(/,/g, '<span class="comma">,</span>');
    }

    // 每秒更新一次
    setInterval(updateTime, 1000);

    // 初次调用以显示时间
    updateTime();
});
