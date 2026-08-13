import sharp from 'sharp';
import { statSync, unlinkSync } from 'fs';

const inputPath = 'src/assets/logo.png';
const outputPath = 'src/assets/logo-optimized.png';

async function compressLogo() {
  try {
    const originalSize = statSync(inputPath).size;
    console.log(`Original logo size: ${(originalSize / 1024).toFixed(2)} KB`);

    // The logo doesn't need to be huge for a web header. 200px width is plenty.
    await sharp(inputPath)
      .resize({ width: 256 })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(outputPath);

    const newSize = statSync(outputPath).size;
    console.log(`Optimized logo size: ${(newSize / 1024).toFixed(2)} KB`);
    console.log(`Saved ${(100 - (newSize / originalSize) * 100).toFixed(2)}%`);
    
    // Replace old with new
    unlinkSync(inputPath);
    import('fs').then(fs => fs.renameSync(outputPath, inputPath));
    console.log('Successfully replaced logo.png');
  } catch (error) {
    console.error('Error compressing logo:', error);
  }
}

compressLogo();
