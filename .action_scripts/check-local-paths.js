const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 修改正则表达式，适用于路径的匹配
const pattern = /([A-Z]:\\|\/)[^\\/:*?"<>|\r\n]*/g;
const files = ['**/*.html', '**/*.js', '**/*.css'];

// 检测文件中的本地路径
files.forEach(globPattern => {
    const filePaths = glob.sync(globPattern, { nodir: true });
    filePaths.forEach(filePath => {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        lines.forEach((line, lineNumber) => {
            let match;
            while ((match = pattern.exec(line)) !== null) {
                // 打印检测到的路径及其行号和列号
                console.error(`✕ 在 ${filePath} 第 ${lineNumber + 1} 行第 ${match.index + 1} 列检测到本地路径: ${match[0]}`);
                process.exit(1);
            }
        });
    });
});
