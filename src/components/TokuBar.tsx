"use client";

import { PixelCoin } from "./PixelCoin";
import { useI18n } from "@/lib/i18n";

export function TokuBar({ tokuCount }: { tokuCount: number }) {
  const { t } = useI18n();
  if (tokuCount === 0) return null;

  return (
    <div
      className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[375px] bg-toku-bar px-4 py-2.5 flex items-center justify-between"
      style={{ boxShadow: "0 -2px 0 #3B1C1C" }}
    >
      <span
        className="text-xs text-parchment"
        style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
      >
        {t("tokubar.label")}
      </span>
      <div className="flex items-center gap-2">
        <PixelCoin size={20} />
        <span
          className="text-xl text-accent-bright font-bold"
          style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          {tokuCount}
        </span>
      </div>
    </div>
  );
}
