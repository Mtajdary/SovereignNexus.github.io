export class ImageProcessor {
  // تحلیل لبه‌ها و ترک‌های بتن با عملگر سوبل (Sobel Edge Detection)
  static analyzeImage(imageSrc, threshold = 65) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const width = Math.min(img.width, 400);
        const height = Math.floor((img.height / img.width) * width);

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;
        const gray = new Float32Array(width * height);

        // ۱. تبدیل به خاکستری (Grayscale)
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          gray[i / 4] = 0.299 * r + 0.587 * g + 0.114 * b;
        }

        // ۲. فیلتر همسایگی سوبل ۳×۳ برای محاسبه گرادیان افقی و عمودی
        const edges = new Uint8ClampedArray(width * height);
        let crackPixelCount = 0;
        let minX = width, maxX = 0, minY = height, maxY = 0;

        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const idx = y * width + x;

            const gx =
              -1 * gray[(y - 1) * width + (x - 1)] + 1 * gray[(y - 1) * width + (x + 1)] +
              -2 * gray[y * width + (x - 1)]       + 2 * gray[y * width + (x + 1)] +
              -1 * gray[(y + 1) * width + (x - 1)] + 1 * gray[(y + 1) * width + (x + 1)];

            const gy =
              -1 * gray[(y - 1) * width + (x - 1)] - 2 * gray[(y - 1) * width + x] - 1 * gray[(y - 1) * width + (x + 1)] +
               1 * gray[(y + 1) * width + (x - 1)] + 2 * gray[(y + 1) * width + x] + 1 * gray[(y + 1) * width + (x + 1)];

            const magnitude = Math.sqrt(gx * gx + gy * gy);

            if (magnitude > threshold) {
              edges[idx] = 255;
              crackPixelCount++;
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            } else {
              edges[idx] = 0;
            }
          }
        }

        // ۳. ساخت تصویر خروجی پردازش‌شده
        const outputImgData = ctx.createImageData(width, height);
        for (let i = 0; i < edges.length; i++) {
          const val = edges[i];
          const outIdx = i * 4;
          if (val > 0) {
            outputImgData.data[outIdx] = 239;     // R (قرمز نئونی برای ترک‌ها)
            outputImgData.data[outIdx + 1] = 68;  // G
            outputImgData.data[outIdx + 2] = 68;  // B
            outputImgData.data[outIdx + 3] = 255; // Alpha
          } else {
            outputImgData.data[outIdx] = 15;
            outputImgData.data[outIdx + 1] = 23;
            outputImgData.data[outIdx + 2] = 42;
            outputImgData.data[outIdx + 3] = 220;
          }
        }

        ctx.putImageData(outputImgData, 0, 0);

        const totalPixels = width * height;
        const crackRatio = (crackPixelCount / totalPixels) * 100;
        const hasSevereCrack = crackRatio > 1.2;

        resolve({
          processedCanvasUrl: canvas.toDataURL(),
          crackRatio: crackRatio.toFixed(2),
          hasCrack: crackPixelCount > 50,
          crackCount: crackPixelCount,
          severity: hasSevereCrack ? 'بحرانی (عمق نفوذ بالا)' : crackPixelCount > 50 ? 'سطحی (ریزترک ریزساختاری)' : 'المان سالم بدون ترک مشهود',
          boundingBox: crackPixelCount > 50 ? { minX, maxX, minY, maxY, width, height } : null
        });
      };
      img.onerror = reject;
      img.src = imageSrc;
    });
  }
}
