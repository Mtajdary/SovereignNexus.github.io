/* eslint-disable no-restricted-globals */

self.onmessage = function (e) {
  const { type, payload, id } = e.data;

  switch (type) {
    // ۱. تحلیل توزیع اندازه ذرات خاک (Sieve Analysis & Particle Distribution)
    case 'CALC_SOIL_SIEVE': {
      const { sieves } = payload; // آرایه‌ای از { size, retainedWeight }
      let totalWeight = 0;
      sieves.forEach(s => { totalWeight += s.retainedWeight; });

      let cumulative = 0;
      const distribution = sieves.map(s => {
        cumulative += s.retainedWeight;
        const percentPassing = Math.max(0, 100 - (cumulative / (totalWeight || 1)) * 100);
        return {
          size: s.size,
          passing: parseFloat(percentPassing.toFixed(2))
        };
      });

      self.postMessage({ id, type, result: { totalWeight, distribution } });
      break;
    }

    // ۲. تولید داده‌های منحنی رشد ۹۰ روزه مقاومت بتن بر اساس روابط ACI/CEB-FIP
    case 'CALC_CONCRETE_SERIES': {
      const { fck, temp } = payload;
      const series = [];

      for (let day = 1; day <= 90; day++) {
        // ضریب تصحیح دمای عمل‌آوری
        const tempFactor = (temp + 10) / 30;
        const maturityTime = day * tempFactor;
        const beta = Math.exp(0.25 * (1 - Math.sqrt(28 / Math.max(maturityTime, 0.1))));
        const estimatedStrength = parseFloat((fck * beta).toFixed(2));

        series.push({
          day,
          strength: estimatedStrength,
          pct: parseFloat(((estimatedStrength / fck) * 100).toFixed(1))
        });
      }

      self.postMessage({ id, type, result: { series } });
      break;
    }

    // ۳. شبیه‌سازی تراز احجام خاکی و محاسبه خط تعادل (Mass Haul Diagram)
    case 'CALC_MASS_HAUL': {
      const { sections } = payload; // آرایه‌ای از { station, cutArea, fillArea }
      let cumulativeMass = 0;
      const points = [];

      for (let i = 0; i < sections.length - 1; i++) {
        const s1 = sections[i];
        const s2 = sections[i + 1];
        const length = s2.station - s1.station;

        const cutVol = ((s1.cutArea + s2.cutArea) / 2) * length;
        const fillVol = ((s1.fillArea + s2.fillArea) / 2) * length;
        const netVolume = cutVol - fillVol; // مثبت: خاکبرداری مازاد | منفی: خاکریزی مازاد

        cumulativeMass += netVolume;
        points.push({
          station: s2.station,
          cutVolume: parseFloat(cutVol.toFixed(1)),
          fillVolume: parseFloat(fillVol.toFixed(1)),
          cumulative: parseFloat(cumulativeMass.toFixed(1))
        });
      }

      self.postMessage({ id, type, result: { points, finalBalance: cumulativeMass } });
      break;
    }

    default:
      self.postMessage({ id, type: 'ERROR', error: 'دستور پردازشی نامعتبر است' });
  }
};
