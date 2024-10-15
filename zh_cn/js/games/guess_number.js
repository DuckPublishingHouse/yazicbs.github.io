/* 
* JS输出分类: 游戏-猜数字
*/
var Guess_number_random_number;
Guess_number_random_number = "No_init";
var guess_max = NaN;
var guess_min = NaN;
Guess_number_init(0, 1000)
console.log("[INFO(游戏-猜数字)] 试试 Guess_number(n) 吗？[已自动初始化(Max:1000 | Min:0)]")

// 创建一个函数,生成指定范围内的随机整数
function Guess_number_init(min, max) {
  guess_max = max;
  guess_min = min;
  Guess_number_random_number = Math.floor(Math.random() * (max - min + 1)) + min;
  return `已成功初始化猜数字游戏 (Max:${guess_max} | Min:${guess_min})`
}

// 游戏函数 - 猜数字
function Guess_number(n) {

  var numberToGuess = Guess_number_random_number; // 使用全局变量中存储的随机数

  // 判断猜测结果
  if (n < numberToGuess) {
    return '太小了,再猜看看?';
  } else if (n > numberToGuess) {
    return '太大了,再猜看看?';
  } else if (Guess_number_random_number === "No_init") {
    console.warn("[Game\\Guess Number] 请先使用 Guess_number_init(最小数, 最大数) 来初始化游戏！");
  } else {
    if (!Number.isNaN(guess_max) && !Number.isNaN(guess_min)) {
      Guess_number_init(guess_max, guess_min);
      return '恭喜,您猜对了！\n已自动初始化下一局游戏,如需修改范围请重新使用 Guess_number_init(最小数, 最大数) 初始化';
    }
    return '恭喜,您猜对了！';
  }
}
