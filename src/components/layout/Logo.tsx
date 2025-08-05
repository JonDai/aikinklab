import React from 'react';

export function Logo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transform hover:scale-110 transition-transform duration-300"
    >
      <defs>
        <linearGradient id="magenta-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#D946EF', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#C0A062', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      {/* Base shape with subtle glow */}
      <path
        d="M60 10L110 60L60 110L10 60L60 10Z"
        fill="url(#magenta-gold)"
        filter="url(#glow)"
      />
      <path
        d="M60 10L110 60L60 110L10 60L60 10Z"
        stroke="#F5F5F5"
        strokeWidth="4"
        strokeOpacity="0.5"
      />
      {/* Stylized 'AK' */}
      <text
        x="60"
        y="68"
        fontFamily="Playfair Display, serif"
        fontSize="48"
        fill="#1A1A1A"
        textAnchor="middle"
        dominantBaseline="middle"
        fontWeight="bold"
      >
        AK
      </text>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}