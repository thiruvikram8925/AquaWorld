import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'horizontal' | 'stacked' | 'symbol';
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'horizontal', light = false }) => {
  const primaryColor = light ? '#FFFFFF' : '#023E8A'; // Deep Navy or White
  const secondaryColor = '#00B4D8'; // Aqua Blue
  const accentColor = '#48CAE4'; // Cyan

  // Standard Symbol path of a Water Droplet containing a Globe and a Leaf
  const renderSymbol = () => (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full drop-shadow-md transition-all duration-300 hover:scale-105"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="dropGrad" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={accentColor} />
          <stop offset="50%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor="#03045E" />
        </linearGradient>
        <linearGradient id="globeGrad" x1="30" y1="35" x2="70" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F7FA" stopOpacity="0.8" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="leafGrad" x1="65" y1="25" x2="85" y2="15" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#81C784" />
        </linearGradient>
      </defs>

      {/* Main Premium Water Droplet Outline */}
      <path
        d="M50 5C50 5 15 45 15 68C15 85.67 29.33 100 47 100C64.67 100 79 85.67 79 68C79 45 50 5 50 5Z"
        fill="url(#dropGrad)"
      />

      {/* Glossy inner curved highlight for depth */}
      <path
        d="M50 8C50 8 20 46 20 68C20 82 30 94 45 96C32 92 25 80 25 68C25 48 50 14 50 14Z"
        fill="#FFFFFF"
        opacity="0.25"
      />

      {/* Glowing Inner Earth/Globe Sphere */}
      <circle cx="50" cy="65" r="22" fill="url(#globeGrad)" stroke="#FFFFFF" strokeWidth="1" opacity="0.9" />

      {/* Stylized Earth Continents */}
      {/* Americas / Atlantic */}
      <path
        d="M40 52C37 54 36 58 38 61C40 64 45 62 48 65C51 68 53 73 50 78C48 80 43 82 45 85C48 87 53 85 55 81C57 77 59 73 62 70C65 67 69 66 71 63C68 59 63 58 59 55C55 52 50 50 45 51C42 51.5 41 51.8 40 52Z"
        fill="#FFFFFF"
        opacity="0.85"
      />
      {/* Europe/Africa outline */}
      <path
        d="M52 48C55 49 58 47 61 49C64 51 63 56 66 59C69 62 68 66 65 68C63 70 60 71 58 74C56 77 56 80 54 82"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Dynamic Splash arcs around base */}
      <path
        d="M10 70C6 72 3 76 5 80C7 84 13 83 15 80C17 77 15 72 10 70Z"
        fill={accentColor}
        opacity="0.9"
      />
      <path
        d="M90 70C94 72 97 76 95 80C93 84 87 83 85 80C83 77 85 72 90 70Z"
        fill={accentColor}
        opacity="0.9"
      />

      {/* Sprouting Green Healing Leaves representing life and eco-friendliness */}
      <path
        d="M62 30C62 30 75 32 80 22C80 22 70 18 64 26C62 28 62 30 62 30Z"
        fill="url(#leafGrad)"
      />
      <path
        d="M67 38C67 38 78 37 81 29C81 29 72 27 68 33C67 35 67 38 67 38Z"
        fill="url(#leafGrad)"
        opacity="0.8"
      />
    </svg>
  );

  if (variant === 'symbol') {
    return <div className={`inline-block ${className}`}>{renderSymbol()}</div>;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="w-24 h-24 mb-4">
          {renderSymbol()}
        </div>
        <h1 className="font-display font-bold text-3xl tracking-wider uppercase" style={{ color: primaryColor }}>
          My Aqua
        </h1>
        <div className="flex items-center gap-2 my-2 w-full max-w-xs">
          <div className="h-[1px] flex-1" style={{ backgroundColor: secondaryColor, opacity: 0.5 }} />
          <span className="text-[10px] font-mono tracking-[0.25em] font-medium" style={{ color: light ? '#E0F7FA' : '#555555' }}>
            PURE WATER. PURE LIFE.
          </span>
          <div className="h-[1px] flex-1" style={{ backgroundColor: secondaryColor, opacity: 0.5 }} />
        </div>
        <p className="text-[11px] font-sans font-semibold tracking-[0.4em] uppercase" style={{ color: secondaryColor }}>
          Water Purifiers
        </p>
      </div>
    );
  }

  // Horizontal variant (Ideal for Navbars, Footers)
  return (
    <div id="aqua-world-logo" className={`flex items-center gap-3 select-none ${className}`}>
      <img src="/aqualogo.jpeg" alt="Aqua logo" className="w-10 h-10 object-contain" />
      <div className="flex flex-col leading-tight">
        <span className="font-display font-extrabold text-lg tracking-wider" style={{ color: light ? '#FFFFFF' : '#023E8A' }}>
          AQUA <span style={{ color: secondaryColor }}>WORLD</span>
        </span>
        <span className="text-[8px] font-mono tracking-[0.18em] font-semibold" style={{ color: light ? '#B4EBF0' : '#457B9D' }}>
          PURITY IN EVERY DROPS
        </span>
      </div>
    </div>
  );
};
