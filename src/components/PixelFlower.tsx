"use client";

// Generate a pixel flower color from a hash/seed
function seedColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = ["#FF6B8A", "#FF8ED4", "#A78BFA", "#60A5FA", "#34D399", "#FBBF24", "#FB923C", "#F87171"];
  return colors[Math.abs(hash) % colors.length];
}

export function PixelFlower({ seed = "default", size = 16 }: { seed?: string; size?: number }) {
  const color = seedColor(seed);
  const dark = color + "CC";

  return (
    <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
      {/* Petals */}
      <rect x="3" y="0" width="2" height="2" fill={color} />
      <rect x="0" y="3" width="2" height="2" fill={color} />
      <rect x="6" y="3" width="2" height="2" fill={color} />
      <rect x="3" y="6" width="2" height="2" fill={color} />
      {/* Diagonal petals */}
      <rect x="1" y="1" width="2" height="2" fill={dark} />
      <rect x="5" y="1" width="2" height="2" fill={dark} />
      <rect x="1" y="5" width="2" height="2" fill={dark} />
      <rect x="5" y="5" width="2" height="2" fill={dark} />
      {/* Center */}
      <rect x="3" y="3" width="2" height="2" fill="#FBBF24" />
    </svg>
  );
}
