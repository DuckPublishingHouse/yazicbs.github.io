const fs = require('fs');
const glob = require('glob');

// 修改正则表达式，以匹配绝对路径或包含驱动器的路径
const pattern = /(?:[A-Z]:\\)/g;
const files = ['**/*.html', '**/*.js', '**/*.css'];

let foundPath = false; // 用于跟踪是否已经找到路径

files.forEach(globPattern => {
    const filePaths = glob.sync(globPattern, { nodir: true });
    filePaths.forEach(filePath => {
        if (foundPath) return; // 如果已经找到路径，则跳过进一步检查

        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        lines.forEach((line, lineNumber) => {
            let match;
            while ((match = pattern.exec(line)) !== null) {
                // 检测是否是绝对路径
                if (/^[A-Z]:\\/.test(match[0]) || /^\/[^\/:*?"<>|\r\n]/.test(match[0])) {
                    // 打印检测到的路径及其行号和列号
                    console.error(`✕ 在 ${filePath} 第 ${lineNumber + 1} 行第 ${match.index + 1} 列检测到本地路径: ${match[0]}`);
                    foundPath = true;
                    process.exit(1); // 找到路径后退出程序
                }
            }
        });

        // 如果未找到路径，输出相应信息
        if (!foundPath) {
            console.log(`✓ ${filePath}: 没有检测到本地路径`);
        }
    });
});
