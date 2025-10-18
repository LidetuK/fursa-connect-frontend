import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OLD_URL = 'https://premium-promospace-production.up.railway.app';
const NEW_URL = 'https://fursaconnet-production.up.railway.app';

function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    content = content.replace(new RegExp(OLD_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), NEW_URL);
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      return true;
    } else {
      console.log(`⏭️  No changes: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let updatedCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
      updatedCount += walkDir(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (updateFile(filePath)) {
        updatedCount++;
      }
    }
  });
  
  return updatedCount;
}

console.log('🔄 Updating API endpoints...');
console.log(`From: ${OLD_URL}`);
console.log(`To: ${NEW_URL}`);
console.log('');

const updatedFiles = walkDir('./src');

console.log('');
console.log(`🎉 Updated ${updatedFiles} files successfully!`);
console.log('');
console.log('Next steps:');
console.log('1. Test your application locally');
console.log('2. Deploy to your frontend hosting (cPanel, Vercel, etc.)');
console.log('3. Make sure your Railway backend is running'); 