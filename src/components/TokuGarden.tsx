"use client";

import { useI18n } from "@/lib/i18n";

// Lotus positions - spiral outward from center
const LOTUS_SLOTS = [
  { x: 50, y: 50 },
  { x: 38, y: 40 },
  { x: 62, y: 42 },
  { x: 35, y: 58 },
  { x: 65, y: 56 },
  { x: 50, y: 32 },
  { x: 25, y: 48 },
  { x: 75, y: 46 },
  { x: 30, y: 68 },
  { x: 70, y: 66 },
  { x: 50, y: 72 },
  { x: 42, y: 26 },
  { x: 58, y: 74 },
  { x: 18, y: 56 },
  { x: 82, y: 54 },
  { x: 20, y: 36 },
  { x: 80, y: 36 },
  { x: 15, y: 70 },
  { x: 85, y: 68 },
  { x: 50, y: 18 },
  { x: 35, y: 80 },
  { x: 65, y: 80 },
  { x: 28, y: 22 },
  { x: 72, y: 22 },
  { x: 12, y: 44 },
  { x: 88, y: 44 },
  { x: 45, y: 85 },
  { x: 55, y: 14 },
  { x: 10, y: 76 },
  { x: 90, y: 76 },
];

function PixelLotus({ seed, large }: { seed: number; large?: boolean }) {
  const hue = [0, 1, 2][seed % 3]; // 0=pink, 1=white, 2=deep pink
  const petals = ["#E8A0B0", "#E8D8D0", "#D88898"][hue];
  const petalDark = ["#C87888", "#C8B8A8", "#B86878"][hue];
  const center = "#DAA520";

  if (large) {
    return (
      <svg width="24" height="24" viewBox="0 0 12 12" style={{ imageRendering: "pixelated" }}>
        {/* Pad */}
        <rect x="2" y="9" width="8" height="1" fill="#3A6838" />
        <rect x="1" y="10" width="10" height="2" fill="#4A7848" />
        {/* Back petals */}
        <rect x="4" y="1" width="4" height="1" fill={petalDark} />
        <rect x="3" y="2" width="6" height="1" fill={petals} />
        {/* Side petals */}
        <rect x="1" y="3" width="2" height="3" fill={petals} />
        <rect x="9" y="3" width="2" height="3" fill={petals} />
        <rect x="1" y="6" width="2" height="1" fill={petalDark} />
        <rect x="9" y="6" width="2" height="1" fill={petalDark} />
        {/* Front petals */}
        <rect x="2" y="7" width="3" height="2" fill={petals} />
        <rect x="7" y="7" width="3" height="2" fill={petals} />
        {/* Center */}
        <rect x="3" y="3" width="6" height="4" fill={petals} />
        <rect x="4" y="4" width="4" height="2" fill={center} />
        <rect x="5" y="5" width="2" height="1" fill="#B8860B" />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
      {/* Pad */}
      <rect x="1" y="6" width="6" height="2" fill="#4A7848" />
      {/* Back petals */}
      <rect x="2" y="0" width="4" height="1" fill={petalDark} />
      {/* Side petals */}
      <rect x="0" y="1" width="2" height="2" fill={petals} />
      <rect x="6" y="1" width="2" height="2" fill={petals} />
      {/* Front petals */}
      <rect x="1" y="4" width="2" height="2" fill={petals} />
      <rect x="5" y="4" width="2" height="2" fill={petals} />
      {/* Center */}
      <rect x="2" y="1" width="4" height="3" fill={petals} />
      <rect x="3" y="2" width="2" height="1" fill={center} />
    </svg>
  );
}

function PixelLilyPad() {
  return (
    <svg width="14" height="10" viewBox="0 0 7 5" style={{ imageRendering: "pixelated" }}>
      <rect x="2" y="0" width="3" height="1" fill="#4A7848" />
      <rect x="1" y="1" width="5" height="2" fill="#3A6838" />
      <rect x="0" y="2" width="7" height="2" fill="#4A7848" />
      <rect x="1" y="4" width="5" height="1" fill="#3A6838" />
      {/* Notch */}
      <rect x="3" y="0" width="1" height="2" fill="#2A5060" />
    </svg>
  );
}

export function TokuGarden({ tokuCount }: { tokuCount: number }) {
  const { t } = useI18n();
  const visibleSlots = LOTUS_SLOTS.slice(0, Math.min(tokuCount, LOTUS_SLOTS.length));

  return (
    <div
      className="relative w-full aspect-[5/4] rounded-lg overflow-hidden border-2 border-border"
      style={{ boxShadow: "3px 3px 0px #D4C8B8" }}
    >
      {/* Pixel water background */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 80 64"
        preserveAspectRatio="none"
        className="absolute inset-0"
        style={{ imageRendering: "pixelated" }}
      >
        {/* Water layers */}
        {Array.from({ length: 64 }).map((_, y) => {
          const shade = y < 16 ? "#3A6B7A" : y < 32 ? "#2D5A68" : y < 48 ? "#2A5060" : "#1E4A58";
          return <rect key={y} x="0" y={y} width="80" height="1" fill={shade} />;
        })}
        {/* Pixel ripple dots */}
        {[
          { x: 10, y: 8 }, { x: 30, y: 12 }, { x: 55, y: 6 }, { x: 70, y: 15 },
          { x: 15, y: 28 }, { x: 45, y: 32 }, { x: 65, y: 25 },
          { x: 8, y: 48 }, { x: 38, y: 52 }, { x: 60, y: 45 }, { x: 75, y: 55 },
          { x: 22, y: 58 }, { x: 50, y: 60 },
        ].map((dot, i) => (
          <rect
            key={`dot-${i}`}
            x={dot.x}
            y={dot.y}
            width="2"
            height="1"
            fill="#4A8090"
            opacity="0.4"
          />
        ))}
      </svg>

      {/* Lotus flowers & lily pads */}
      {visibleSlots.map((slot, i) => (
        <div
          key={i}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${slot.x}%`,
            top: `${slot.y}%`,
            animation: `lotusBloom 0.6s ease-out ${i * 0.12}s both`,
          }}
        >
          {i >= 24 ? (
            <PixelLilyPad />
          ) : (
            <PixelLotus seed={i} large={i === 0} />
          )}
        </div>
      ))}

      {/* Empty state */}
      {tokuCount === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className="text-xs text-[#7ABFCF]"
            style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
          >
            {t("garden.empty")}
          </p>
        </div>
      )}

      {/* Overflow */}
      {tokuCount > LOTUS_SLOTS.length && (
        <div className="absolute bottom-2 right-2">
          <span
            className="text-[10px] text-accent-bright px-1.5 py-0.5 rounded"
            style={{
              fontFamily: "var(--font-dot-gothic), monospace",
              background: "rgba(30, 74, 88, 0.8)",
            }}
          >
            +{tokuCount - LOTUS_SLOTS.length}
          </span>
        </div>
      )}
    </div>
  );
}
