import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const input = path.join(process.cwd(), 'public', 'iguessbro.webp');
const outputDir = path.join(process.cwd(), 'public', 'frames');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function extractFrames() {
  console.log('Extracting frames from iguessbro.webp...');
  try {
    const metadata = await sharp(input).metadata();
    const pages = metadata.pages;

    if (!pages) {
      console.log('Not an animated webp!');
      return;
    }

    console.log(`Found ${pages} frames. Extracting...`);

    for (let i = 0; i < pages; i++) {
        const frameBuffer = await sharp(input, { page: i })
          .toFormat('webp', { quality: 80 })
          .toBuffer();
        
        // Pad the frame number with leading zeros (e.g., frame_0001.webp)
        const frameName = `frame_${String(i).padStart(4, '0')}.webp`;
        fs.writeFileSync(path.join(outputDir, frameName), frameBuffer);
        
        if (i % 20 === 0) {
            console.log(`Processed frame ${i}/${pages}`);
        }
    }

    console.log(`Successfully extracted ${pages} frames to public/frames/`);
  } catch (error) {
    console.error('Error extracting frames:', error);
  }
}

extractFrames();
