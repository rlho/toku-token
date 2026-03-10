"use client";

export function PixelCoin({ size = 32, className = "" }: { size?: number; className?: string }) {
  const s = size / 16; // scale factor
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={{ imageRendering: "pixelated" }}>
      {/* Outer circle */}
      <rect x="4" y="0" width="8" height="1" fill="#DAA520" />
      <rect x="2" y="1" width="2" height="1" fill="#DAA520" />
      <rect x="12" y="1" width="2" height="1" fill="#DAA520" />
      <rect x="1" y="2" width="1" height="2" fill="#DAA520" />
      <rect x="14" y="2" width="1" height="2" fill="#DAA520" />
      <rect x="0" y="4" width="1" height="8" fill="#DAA520" />
      <rect x="15" y="4" width="1" height="8" fill="#DAA520" />
      <rect x="1" y="12" width="1" height="2" fill="#B8860B" />
      <rect x="14" y="12" width="1" height="2" fill="#B8860B" />
      <rect x="2" y="14" width="2" height="1" fill="#B8860B" />
      <rect x="12" y="14" width="2" height="1" fill="#B8860B" />
      <rect x="4" y="15" width="8" height="1" fill="#B8860B" />
      {/* Fill */}
      <rect x="2" y="2" width="12" height="12" fill="#FFD700" />
      <rect x="4" y="1" width="8" height="1" fill="#FFD700" />
      <rect x="4" y="14" width="8" height="1" fill="#FFD700" />
      <rect x="1" y="4" width="1" height="8" fill="#FFD700" />
      <rect x="14" y="4" width="1" height="8" fill="#FFD700" />
      {/* Inner shine */}
      <rect x="3" y="3" width="4" height="1" fill="#FFE44D" />
      <rect x="3" y="4" width="1" height="3" fill="#FFE44D" />
      {/* 徳 character - simplified pixel art lotus */}
      <rect x="7" y="4" width="2" height="1" fill="#B8860B" />
      <rect x="6" y="5" width="1" height="1" fill="#B8860B" />
      <rect x="9" y="5" width="1" height="1" fill="#B8860B" />
      <rect x="5" y="6" width="1" height="2" fill="#B8860B" />
      <rect x="10" y="6" width="1" height="2" fill="#B8860B" />
      <rect x="6" y="8" width="4" height="1" fill="#B8860B" />
      <rect x="7" y="9" width="2" height="1" fill="#B8860B" />
      <rect x="7" y="10" width="2" height="2" fill="#B8860B" />
    </svg>
  );
}
