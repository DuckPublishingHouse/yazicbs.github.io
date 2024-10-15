/* 
* JS输出分类: 游戏-猜数字
*/
var gm_random_number;
var guess_max;
var guess_min;
gm_init(0, 1000)
console.log("[INFO(游戏-猜数字)] 试试 gm(n) 吗？[已自动初始化(Max:1000 | Min:0)]")
console.warn("%c[WARN(游戏-猜数字-加载)]加载的游戏为简化版", "color: yellow;")

// 创建一个函数,生成指定范围内的随机整数
function gm_init(min, max) {
  guess_max = max;
  guess_min = min;
  gm_random_number = Math.floor(Math.random() * (max - min + 1)) + min;
  if (Number.isNaN(guess_max) && Number.isNaN(guess_min)) { // 避免重复输出, 还是不懂去了自己试下就知道了
    console.log(`[Game\\Guess Number] 已成功初始化猜数字游戏 (Max:${guess_max} | Min:${guess_min})`)
  }
}

// 游戏函数 - 猜数字
function gm(n) {

  var numberToGuess = gm_random_number; // 使用全局变量中存储的随机数

  // 判断猜测结果
  if (n < numberToGuess) {
    console.log("[Game\\Guess Number] 太小了, 再猜看看?");
  } else if (n > numberToGuess) {
    console.log("[Game\\Guess Number] 太大了, 再猜看看?");
  } else if (Number.isInteger(n)) {
    // NOTE:
    // Number.isNaN() 判断的是他是不是数字类型
    // MDN Docs: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
    //
    // Number.isInteger() 判断的是他是不是整数类型 (整型)
    // MDN Docs: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
    //
    // 用 console.log/warn/error 不好吗? 为什么在不需要返回的时候硬要 return
    gm_init(guess_max, guess_min);
    console.log("[Game\\Guess Number] 恭喜, 您猜对了！\n[Game\\Guess Number] 已自动初始化下一局游戏, 如需修改范围请重新使用 gm_init(最小数, 最大数) 初始化");
  } else {
    console.error("[Game\\Guess Number] 传入的数据类型不对");
  }
}
