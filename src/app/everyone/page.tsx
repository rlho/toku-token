"use client";

import { useMemo } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { TokuCard } from "@/components/TokuCard";
import { PixelCoin } from "@/components/PixelCoin";
import { useTokuStore } from "@/store/useTokuStore";
import { useI18n } from "@/lib/i18n";
import { getRandomQuote } from "@/lib/buddhaQuotes";

export default function EveryonePage() {
  const { user } = usePrivy();
  const { t, locale } = useI18n();
  const userId = user?.id;
  const { records, loading, toggleLike } = useTokuStore(userId);

  const publicRecords = records.filter((r) => !r.isPrivate);
  const quote = useMemo(() => getRandomQuote(locale), [locale]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFEF2]">
      <Header />

      {/* Buddha quote banner */}
      <div
        className="mx-4 mt-3 p-4 rounded-lg bg-foreground text-parchment"
        style={{ boxShadow: "3px 3px 0px #1a0d0d" }}
      >
        <p
          className="text-xs leading-relaxed text-center opacity-90"
          style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          &ldquo;{quote}&rdquo;
        </p>
        <p
          className="text-[10px] text-center mt-2 opacity-50"
          style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          — {locale === "ja" ? "釈迦" : "Buddha"}
        </p>
      </div>

      {/* Feed */}
      <div className="flex-1 px-4 pt-4 pb-20">
        {loading ? (
          <div className="flex justify-center mt-8">
            <PixelCoin size={32} className="animate-spin" />
          </div>
        ) : publicRecords.length === 0 ? (
          <div className="text-center mt-12">
            <PixelCoin size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm text-light" style={{ fontFamily: "var(--font-dot-gothic), monospace" }}>
              {t("everyone.empty")}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {publicRecords.map((record) => (
              <TokuCard key={record.id} record={record} showUser onLike={toggleLike} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
