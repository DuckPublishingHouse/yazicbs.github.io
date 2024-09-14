// 所有变量添加 _year 避免与其他 JS 代码冲突产生 SyntaxError
var Now_year = new Date();
var currentYear_year = Now_year.getFullYear(); // 获取当前年份
var startTimeString_year = currentYear_year + "-01-28T18:00:00+08:00";
var StartTime_year = new Date(startTimeString_year); // 转换成日期对象

// 计算目标时间加上 18 小时后的时间
const EndTime = new Date(StartTime_year.getTime() + (18 * 60 * 60 * 1000)); // 18 小时的毫秒数

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
    }
}
