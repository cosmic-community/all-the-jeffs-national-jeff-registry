const fs = require('fs');
const path = require('path');

function injectConsoleCapture() {
  const distPath = path.join(process.cwd(), '.next');
  const publicPath = path.join(process.cwd(), 'public');
  
  // Check if this is a Next.js build
  if (!fs.existsSync(distPath)) {
    console.log('No .next directory found. Skipping console capture injection.');
    return;
  }
  
  // Check if console capture script exists
  const consoleCaptureScript = path.join(publicPath, 'dashboard-console-capture.js');
  if (!fs.existsSync(consoleCaptureScript)) {
    console.log('Console capture script not found. Skipping injection.');
    return;
  }
  
  // Find all HTML files in the build directory
  function findHtmlFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...findHtmlFiles(fullPath));
      } else if (item.endsWith('.html')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }
  
  const htmlFiles = findHtmlFiles(distPath);
  let injectedCount = 0;
  
  for (const htmlFile of htmlFiles) {
    try {
      let content = fs.readFileSync(htmlFile, 'utf8');
      
      // Skip if already injected
      if (content.includes('dashboard-console-capture.js')) {
        continue;
      }
      
      // Inject script tag before closing head tag
      const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
      
      if (content.includes('</head>')) {
        content = content.replace('</head>', `${scriptTag}</head>`);
        fs.writeFileSync(htmlFile, content);
        injectedCount++;
      }
    } catch (error) {
      console.error(`Error injecting into ${htmlFile}:`, error);
    }
  }
  
  console.log(`Console capture script injected into ${injectedCount} HTML files.`);
}

// Run the injection
injectConsoleCapture();