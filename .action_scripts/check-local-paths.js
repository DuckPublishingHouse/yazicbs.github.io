const fs = require('fs');
const path = require('path');

const pattern = /([A-Z]:\\|\/)[^\\/:*?"<>|\r\n]*/g; // 匹配 Windows 和 Unix 风格路径的正则表达式
const files = ['**/*.html', '**/*.js', '**/*.css'];

files.forEach(globPattern => {
    const filePaths = glob.sync(globPattern, { nodir: true });
    filePaths.forEach(filePath => {
        const content = fs.readFileSync(filePath, 'utf8');
        if (pattern.test(content)) {
            console.error(`✕ 在 ${filePath} 中检测到本地路径`);
            process.exit(1);
        }
    });
});
