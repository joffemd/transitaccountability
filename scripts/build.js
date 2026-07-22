const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Clean and recreate dist
if (fs.existsSync(distDir)) {
  try {
    fs.rmSync(distDir, { recursive: true, force: true });
  } catch (err) {
    console.warn("Could not remove dist dir (might be locked by preview server). Overwriting contents instead.");
  }
}
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Get footer content
const footerHtml = fs.readFileSync(path.join(rootDir, 'components', 'footer.html'), 'utf8');

// Copy files and process HTML
const exclude = [
  'node_modules', '.git', 'dist', 'styles.css', 'site.js', 
  'styles.min.css', 'site.min.js', 'package.json', 
  'pnpm-workspace.yaml', 'pnpm-lock.yaml', '.gitignore', 
  'components', 'scripts', '.github', 'README.md', 'AGENTS.md'
];

fs.readdirSync(rootDir).forEach(f => {
  if (!exclude.includes(f) && !f.startsWith('.')) {
    const srcPath = path.join(rootDir, f);
    const destPath = path.join(distDir, f);
    
    fs.cpSync(srcPath, destPath, { recursive: true });
    
    // Inject footer if it's an HTML file
    if (f.endsWith('.html') && fs.statSync(destPath).isFile()) {
      let content = fs.readFileSync(destPath, 'utf8');
      content = content.replace('<site-footer></site-footer>', footerHtml);
      fs.writeFileSync(destPath, content, 'utf8');
    }
  }
});

// Copy minified assets to dist (and rename them for the live site)
fs.copyFileSync(path.join(rootDir, 'styles.min.css'), path.join(distDir, 'styles.css'));
fs.copyFileSync(path.join(rootDir, 'site.min.js'), path.join(distDir, 'site.js'));

console.log("Build complete. Static HTML files generated in /dist");
