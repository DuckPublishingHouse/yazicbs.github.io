const fs = require('fs');
const glob = require('glob');

// 修改正则表达式，以匹配绝对路径或包含驱动器的路径
const pattern = /(?:[A-Z]:\\)/g;
const files = ['**/*.html', '**/*.js', '**/*.css'];

// 自定义跳过文件列表（使用相对路径） 请勿随意添加！
const skipFiles = [
    'Tools\\Fufu_Tools\\wiki\\常见问题Q&A\\主程序\\index.html',
    'Tools\\Fufu_Tools\\wiki\\Dev\\index.html',
    'Tools\\Fufu_Tools\\minimum\\index.html',
];

let foundPath = false; // 用于跟踪是否已经找到路径

files.forEach(globPattern => {
    const filePaths = glob.sync(globPattern, { nodir: true });
    filePaths.forEach(filePath => {
        // 如果文件在跳过列表中，则跳过
        if (skipFiles.includes(filePath)) {
            return;
        }

        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        lines.forEach(line => {
            let match;
            while ((match = pattern.exec(line)) !== null) {
                // 检测是否是绝对路径
                if (/^[A-Z]:\\/.test(match[0]) || /^\/[^\/:*?"<>|\r\n]/.test(match[0])) {
                    // 打印检测到的路径及其行号和列号
                    console.error(`✕ 在 ${filePath} 检测到本地路径: ${match[0]}`);
                    foundPath = true;
                    return; // 找到路径后，跳过该文件的其他行
                }
            }
        });
    });
});

// 在所有文件处理完成后输出结果
if (foundPath) {
    process.exit(1); // 如果发现路径，退出并且有非零状态码
} else {
    console.log('✓ 所有文件检测完毕，未发现本地路径');
}
