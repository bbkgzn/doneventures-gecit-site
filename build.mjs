import { mkdirSync, copyFileSync, rmSync } from 'node:fs';
import { dirname } from 'node:path';
const files = ["index.html", "styles.css", "script.js", "config.js", "robots.txt", "sitemap.xml", "assets/babak-gozen-founder-v4.jpg", "connect/bg-7k29/index.html", "connect/bg-7k29/config.js", "connect/bg-7k29/portrait.jpg", "connect/bg-7k29/babak-gozen-apple-4be0045b98a6.vcf", "adres-saglik/magnet/AS-MAG-001/index.html"];
rmSync('dist', { recursive: true, force: true });
for (const file of files) {
  mkdirSync(dirname(`dist/${file}`), { recursive: true });
  copyFileSync(file, `dist/${file}`);
}
console.log(`Prepared ${files.length} static files; no dependencies or services.`);
