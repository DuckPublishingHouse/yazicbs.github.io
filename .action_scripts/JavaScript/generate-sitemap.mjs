import { writeFileSync, readdirSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 简化的辅助函数来获取当前模块的目录
const getScriptDir = () => path.dirname(fileURLToPath(import.meta.url));

try {
  const scriptDir = getScriptDir(); // 直接使用简化函数获取脚本目录
  const repoRoot = path.join(scriptDir, '..', '..'); // 当前目录向上两级，得到项目根目录
  const repoUrl = 'https://duckduckstudio.github.io/yazicbs.github.io';

  const urls = new Set();

  // 扫描目录并生成 URL 列表
  function scanDirectory(dir) {
    const files = readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (file.endsWith('.html')) {
        const relativePath = path.relative(repoRoot, fullPath).replace(/\\/g, '/');
        const encodedPath = encodeURIComponent(relativePath).replace(/%2F/g, '/'); // 对路径进行编码并替换%2F为/
        const fullUrl = `${repoUrl}/${encodedPath}`;
        urls.add(fullUrl);
      }
    });
  }

  scanDirectory(repoRoot);

  // 创建 sitemap.xml 文件内容
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
               xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                                   http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n`;

  // 生成 URL 列表
  urls.forEach(url => {
    sitemap += `<url>\n`;
    sitemap += `  <loc>${url}</loc>\n`;
    sitemap += `</url>\n`;
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
