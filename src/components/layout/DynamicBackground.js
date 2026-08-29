import React from 'react';
import { useSovereign } from '../../context/SovereignContext';

const DynamicBackground = () => {
  const { theme } = useSovereign();
  const isLight = theme === 'light';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* ۱. لایه مشبک ماتریسی آزمایشگاهی */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isLight ? 0.08 : 0.04,
          backgroundImage: `radial-gradient(${isLight ? '#996515' : '#D4AF37'} 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* ۲. گوی اول: طلایی / کهربایی درخشان */}
      <div
        className="absolute -top-10 -right-10 w-72 h-72 sm:w-96 sm:h-96 rounded-full anim-orb-1 transition-all duration-700"
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, rgba(217, 119, 6, 0.15) 50%, transparent 75%)'
            : 'radial-gradient(circle, rgba(212, 175, 55, 0.5) 0%, rgba(180, 83, 9, 0.2) 50%, transparent 75%)',
          filter: 'blur(40px)'
        }}
      />

      {/* ۳. گوی دوم: نیلی / بنفش کوانتومی هوش مصنوعی */}
      <div
        className="absolute top-1/3 -left-16 w-80 h-80 sm:w-[26rem] sm:h-[26rem] rounded-full anim-orb-2 transition-all duration-700"
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, rgba(234, 88, 12, 0.15) 50%, transparent 75%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(67, 56, 202, 0.2) 50%, transparent 75%)',
          filter: 'blur(45px)'
        }}
      />

      {/* ۴. گوی سوم: نئون زمردی زیستی */}
      <div
        className="absolute -bottom-10 right-1/4 w-72 h-72 sm:w-80 sm:h-80 rounded-full anim-orb-3 transition-all duration-700"
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(52, 211, 153, 0.35) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 75%)'
            : 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(5, 150, 105, 0.15) 50%, transparent 75%)',
          filter: 'blur(40px)'
        }}
      />

      {/* ۵. شکلک ۴‌پر گوگل لبز (Google Labs 4-Point Star) - بالا سمت چپ */}
      <svg
        className="absolute top-28 left-[10%] w-8 h-8 anim-star transition-colors duration-500"
        viewBox="0 0 24 24"
        fill={isLight ? '#996515' : '#D4AF37'}
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>

      {/* ۶. شکلک ۴‌پر گوگل لبز دوم - پایین سمت راست */}
      <svg
        className="absolute bottom-40 right-[12%] w-6 h-6 anim-star transition-colors duration-500"
        style={{ animationDelay: '2.5s' }}
        viewBox="0 0 24 24"
        fill={isLight ? '#ea580c' : '#38bdf8'}
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>

      {/* ۷. المان چرخان هندسی آزمایشگاهی (Orbit Ring) */}
      <div
        className="absolute top-1/2 right-[6%] w-20 h-20 rounded-full border border-dashed anim-spin-slow transition-colors duration-500"
        style={{
          borderColor: isLight ? 'rgba(153, 101, 21, 0.3)' : 'rgba(212, 175, 55, 0.3)'
        }}
      />
    </div>
  );
};

export default DynamicBackground;
