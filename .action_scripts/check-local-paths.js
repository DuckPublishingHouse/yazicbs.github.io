const fs = require('fs');
const glob = require('glob');

// 修改正则表达式，以匹配绝对路径或包含驱动器的路径
const pattern = /(?:[A-Z]:\\|\/[^\/:*?"<>|\r\n][^\\/:*?"<>|\r\n]*[\w\/\\][^\\/:*?"<>|\r\n]*|(?:\/[^\/:*?"<>|\r\n]+)+[^\\/:*?"<>|\r\n])/g;
const files = ['**/*.html', '**/*.js', '**/*.css'];

files.forEach(globPattern => {
    const filePaths = glob.sync(globPattern, { nodir: true });
    filePaths.forEach(filePath => {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        let foundPath = false;
        
        lines.forEach((line, lineNumber) => {
            let match;
            while ((match = pattern.exec(line)) !== null) {
                // 检测是否是绝对路径
                if (/^[A-Z]:\\/.test(match[0]) || /^\/[^\/:*?"<>|\r\n]/.test(match[0])) {
                    // 打印检测到的路径及其行号和列号
                    console.error(`✕ 在 ${filePath} 第 ${lineNumber + 1} 行第 ${match.index + 1} 列检测到本地路径: ${match[0]}`);
                    foundPath = true;
                }
            }
        });

        // 如果未找到路径，输出相应信息
        if (!foundPath) {
            console.log(`✓ ${filePath}: 没有检测到本地路径`);
        }
    });
});
