import { writeFileSync, readdirSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// 简化的辅助函数来获取当前模块的目录
const getScriptDir = () => path.dirname(fileURLToPath(import.meta.url));

try {
  const scriptDir = getScriptDir(); // 直接使用简化函数获取脚本目录
  const repoRoot = path.join(scriptDir, '..', '..'); // 当前目录向上两级，得到项目根目录
  const repoUrl = 'https://duckduckstudio.github.io/yazicbs.github.io';

  const urls = new Set();

  // 通过 Git 命令，获取文件的最后提交日期
  function getLastCommitDate(filePath) {
    try {
      // 使用 git log 命令获取最后一次提交的时间
      const result = execSync(`git log -1 --format=%cI -- "${filePath}"`, { cwd: repoRoot });
      const lastCommitDate = result.toString().trim();
      return lastCommitDate
    } catch (err) {
      console.error(`[ERROR] 获取 ${filePath} 的最后提交时间失败: `, err);
      return ''; // 出错时返回空字符串
    }
  }

  // 扫描目录并生成 URL 列表
  function scanDirectory(dir) {
    // 定义一个忽略的文件路径列表，放在函数内部
    const ignorePatterns = [
      'debug.html',
      '404.html',
      '无聊闲话.html',
      'VerificationFailure.html',
      'test'
    ];

    const files = readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = statSync(fullPath);

      // 如果是目录，递归扫描
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (file.endsWith('.html')) {
        const relativePath = path.relative(repoRoot, fullPath).replace(/\\/g, '/');

        // 如果当前路径在忽略列表中，则跳过
        if (ignorePatterns.some(pattern => relativePath.includes(pattern))) {
          return; // 跳过此文件
        }

        const lastmod = getLastCommitDate(relativePath);

        const encodedPath = encodeURIComponent(relativePath).replace(/%2F/g, '/'); // 对路径进行编码并替换%2F为/

        const fullUrl = `${repoUrl}/${encodedPath}`;

        // 只在获取到有效的 lastmod 时添加 <lastmod> 标签
        const urlTag = `<url>\n  <loc>${fullUrl}</loc>`;
        if (lastmod) {
          // 如果 lastmod 存在，添加 <lastmod>
          urls.add(`${urlTag}\n  <lastmod>${lastmod}</lastmod>\n</url>`);
        } else {
          // 如果没有 lastmod，直接添加 <loc>
          urls.add(`${urlTag}\n</url>`);
        }
      }
    });
  }

  scanDirectory(repoRoot);

  // 获取当前日期并格式化
  const currentDate = new Date().toISOString();

  // 创建 sitemap.xml 文件内容
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<!-- 生成日期: ${currentDate} -->\n`; // 添加生成日期的注释
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
              xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                                  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n`;

  // 生成 URL 列表
  urls.forEach(url => {
    sitemap += url; // 每个 URL 包含 <loc> 和可能的 <lastmod>
    sitemap += `\n`; // 添加换行
  });

  sitemap += `</urlset>\n`;

  // 保存 sitemap.xml 文件
  writeFileSync(path.join(repoRoot, 'sitemap.xml'), sitemap, 'utf8');

  console.log('[INFO] 已成功生成并保存为 sitemap.xml');
  process.exit(0);
} catch (error) {
  console.error('[ERROR] 生成 Sitemap 时发生错误:', error.message);
  process.exit(1);
}
