const fs = require('fs');
const zlib = require('zlib');

function createSolidPNG(width, height, r, g, b) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const body = Buffer.concat([typeBuf, data]);
    let c = 0xffffffff;
    for (let i = 0; i < body.length; i++) {
      c ^= body[i];
      for (let j = 0; j < 8; j++) {
        c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
      }
    }
    crcBuf.writeInt32BE(~c, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2; // RGB
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const rawData = Buffer.alloc((width * 3 + 1) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (width * 3 + 1);
    rawData[rowStart] = 0;
    for (let x = 0; x < width; x++) {
      const idx = rowStart + 1 + x * 3;
      // پس‌زمینه دارک با مرکز طلایی
      const dist = Math.hypot(x - width/2, y - height/2);
      if (dist < width * 0.3) {
        rawData[idx] = 234;     // R (Gold)
        rawData[idx + 1] = 179; // G
        rawData[idx + 2] = 8;   // B
      } else {
        rawData[idx] = 9;       // Dark
        rawData[idx + 1] = 13;
        rawData[idx + 2] = 22;
      }
    }
  }
  const compressed = zlib.deflateSync(rawData);
  return Buffer.concat([signature, makeChunk('IHDR', ihdr), makeChunk('IDAT', compressed), makeChunk('IEND', Buffer.alloc(0))]);
}

fs.writeFileSync('public/logo192.png', createSolidPNG(192, 192, 234, 179, 8));
fs.writeFileSync('public/logo512.png', createSolidPNG(512, 512, 234, 179, 8));
fs.writeFileSync('public/favicon.ico', createSolidPNG(64, 64, 234, 179, 8));
console.log('PNG Icons Created!');
