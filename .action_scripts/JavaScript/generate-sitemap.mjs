import { writeFileSync, readdirSync, statSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// 获取当前脚本文件所在目录的辅助函数
const getScriptDir = () => path.dirname(new URL(import.meta.url).pathname);

// 获取指定文件的最后修改日期（使用本地 Git 仓库）
function getLastModifiedFromGit(filePath) {
  try {
    // 执行 git log 获取最后一次提交的时间
    const result = execSync(`git log -1 --format=%cd -- ${filePath}`, { encoding: 'utf8' });
    return result.trim().split(' ')[0]; // 提取日期部分（格式：YYYY-MM-DD）
  } catch (error) {
    console.error(`[ERROR] 获取文件 ${filePath} 的 Git 提交日期失败: ${error.message}`);
    return null;
  }
}

try {
  // 获取当前脚本所在目录
  const scriptDir = getScriptDir();
  // 获取仓库的根目录，假设脚本在仓库的根目录或更深层次
  const repoRoot = path.join(scriptDir, '..', '..');
  // 仓库的根 URL，用于构建每个 HTML 文件的完整 URL
  const repoUrl = 'https://duckduckstudio.github.io/yazicbs.github.io';

  const urls = new Set(); // 用于存储生成的 URL 集合，确保每个 URL 唯一

  // 扫描目录并生成 URL 列表
  async function scanDirectory(dir) {
    const files = readdirSync(dir); // 读取当前目录中的所有文件
    for (const file of files) {
      const fullPath = path.join(dir, file); // 获取文件的完整路径
      const stat = statSync(fullPath); // 获取文件或目录的状态信息

      // 如果是目录，则递归扫描子目录
      if (stat.isDirectory()) {
        await scanDirectory(fullPath);
      }
      // 如果是 HTML 文件，则生成 URL 并获取提交日期
      else if (file.endsWith('.html')) {
        const relativePath = path.relative(repoRoot, fullPath).replace(/\\/g, '/'); // 相对路径
        // 将路径中的 `/` 编码为 URL 兼容格式
        const encodedPath = encodeURIComponent(relativePath).replace(/%2F/g, '/');
        const fullUrl = `${repoUrl}/${encodedPath}`; // 构建完整的 URL

        // 获取该文件的最后修改日期
        const lastModified = getLastModifiedFromGit(relativePath);
        
        // 如果获取到提交日期，则添加 URL 和最后修改日期
        if (lastModified) {
          urls.add({ url: fullUrl, lastmod: lastModified });
        } else {
          // 如果获取失败，跳过此文件并输出警告
          console.warn(`[WARN] 无法获取 ${fullUrl} 的最后修改日期，跳过此文件`);
        }
      }
    }
  }

  // 执行目录扫描
  scanDirectory(repoRoot).then(() => {
    // 获取当前日期并将其格式化为 ISO 字符串（用于 sitemap 注释）
    const currentDate = new Date().toISOString();

    // 构建 sitemap.xml 文件的内容
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<!-- Generated on ${currentDate} -->\n`; // 在文件开头添加生成日期的注释
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                   xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                                       http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n`;

    // 生成每个 URL 的 XML 标签，并加入 lastmod 元素（表示文件的最新修改时间）
    urls.forEach(({ url, lastmod }) => {
      sitemap += `<url>\n`;
      sitemap += `  <loc>${url}</loc>\n`; // URL 地址
      sitemap += `  <lastmod>${lastmod}</lastmod>\n`; // 文件的最后修改日期
      sitemap += `</url>\n`;
    });

    sitemap += `</urlset>\n`;

    // 将生成的 sitemap 内容写入文件系统
    writeFileSync(path.join(repoRoot, 'sitemap.xml'), sitemap, 'utf8');

    console.log('[INFO] 已成功生成并保存为 sitemap.xml');
  }).catch((error) => {
    // 捕获扫描过程中的错误并输出
    console.error('[ERROR] 扫描目录时发生错误:', error.message);
  });

} catch (error) {
  // 捕获整个脚本运行中的错误并输出
  console.error('[ERROR] 生成 Sitemap 时发生错误:', error.message);
}
