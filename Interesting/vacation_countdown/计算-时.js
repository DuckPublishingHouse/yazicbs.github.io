document.addEventListener('DOMContentLoaded', () => {
    const 当前时间 = new Date();
    console.log(`%c[log] 当前时间: ${当前时间}`, "color: cyan");
    const 目标时间 = new Date(当前时间.getFullYear(), 当前时间.getMonth(), 当前时间.getDate(), 当前时间.getHours(), 35);
    console.log(`%c[log] 目标时间: ${目标时间}`, "color: cyan");

    function 更新时间() {
        const 现在时间 = new Date();
        const 秒数 = Math.floor((目标时间 - 现在时间) / 1000);
    
        let 消息_a, 消息_b;
    
        if (秒数 >= 0) {
            消息_a = `距离目标时间还有...`;
            消息_b = 格式化(秒数);
            //console.log(`%c[log] 秒数差: ${秒数}`, "color: cyan");
        } else {
            消息_a = `已超过目标时间...`;
            消息_b = 格式化(-秒数);
            //console.log(`%c[log] 秒数差: 超 ${-秒数}`, "color: cyan");
        }
    
        // 更新显示内容
        document.getElementById('all-title').innerHTML = 消息_a;
        document.getElementById('Time-Remaining').innerHTML = 消息_b;
    }    

    function 格式化(秒数) {
        return 秒数.toLocaleString().replace(/,/g, '<span class="comma">,</span>');
    }

    // 每秒更新一次
    setInterval(更新时间, 1000);

    // 初次调用以显示时间
    更新时间();
});
