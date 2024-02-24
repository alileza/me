import { promises as fs, readFileSync } from 'fs';
import path from 'path';

const distPath =  'dist';
const htmlFilePath = path.join(distPath, 'index.html');
const assetsPath = path.join(distPath, 'assets');

async function injectAssetsIntoHtml() {
  try {
    // Read the original HTML file
    let htmlContent = await fs.readFile(htmlFilePath, 'utf8');

    // Get all asset files
    const assetFiles = await fs.readdir(assetsPath);

    // Separate CSS and JS files
    const cssFiles = assetFiles.filter(file => file.endsWith('.css'));
    const jsFiles = assetFiles.filter(file => file.endsWith('.js'));

    // Inject CSS files
    for (const file of cssFiles) {
      const cssContent = await fs.readFile(path.join(assetsPath, file), 'utf8');
      htmlContent = htmlContent.replace('</head>', `<style>${cssContent}</style></head>`);
    }

    // Inject JS files
    for (const file of jsFiles) {
      const jsContent = await fs.readFile(path.join(assetsPath, file), 'utf8');
      htmlContent = htmlContent.replace('</body>', `<script>${jsContent}</script></body>`);
    }

    // Save the modified HTML content back to the file
    await fs.writeFile(htmlFilePath, htmlContent, 'utf8');

    console.log('Assets have been injected into index.html successfully.');
  } catch (error) {
    console.error('Error injecting assets into HTML:', error);
  }
}

injectAssetsIntoHtml();
