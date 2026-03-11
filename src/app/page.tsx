"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { TokuBar } from "@/components/TokuBar";
import { TokuCard } from "@/components/TokuCard";
import { PixelCoin } from "@/components/PixelCoin";
import { useTokuStore } from "@/store/useTokuStore";
import { useI18n } from "@/lib/i18n";

export default function HomePage() {
  const { ready, authenticated, login, user } = usePrivy();
  const { t } = useI18n();
  const userId = user?.id;
  const { records, tokuCount, loading, toggleLike } = useTokuStore(userId);
  const [activeTab, setActiveTab] = useState<"you" | "everyone">("everyone");

  const visibleRecords =
    activeTab === "you"
      ? records.filter((r) => r.userId === userId)
      : records.filter((r) => !r.isPrivate);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFEF2]">
      <Header />

      {/* Tabs */}
      <div className="flex mx-4 mt-3 rounded-lg overflow-hidden border-2 border-border">
        <button
          onClick={() => setActiveTab("everyone")}
          className={`flex-1 py-2 text-xs text-center transition-colors ${
            activeTab === "everyone"
              ? "bg-foreground text-parchment font-bold"
              : "bg-parchment text-muted"
          }`}
          style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          {t("home.tab.everyone")}
        </button>
        <button
          onClick={() => setActiveTab("you")}
          className={`flex-1 py-2 text-xs text-center transition-colors ${
            activeTab === "you"
              ? "bg-foreground text-parchment font-bold"
              : "bg-parchment text-muted"
          }`}
          style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          {t("home.tab.you")}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-32 pt-4">
        {!ready || loading ? (
          <div className="flex justify-center mt-8">
            <PixelCoin size={32} className="animate-spin" />
          </div>
        ) : activeTab === "you" && !authenticated ? (
          <div className="text-center mt-12">
            <div className="mb-4">
              <PixelCoin size={64} className="mx-auto animate-coin-drop" />
            </div>
            <p
              className="text-sm text-muted leading-relaxed mb-4 whitespace-pre-line"
              style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
            >
              {t("home.connect.message")}
            </p>
            <button onClick={login} className="btn-pixel text-sm rounded px-6 py-2">
              {t("home.connect.button")}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {visibleRecords.map((record) => (
              <TokuCard key={record.id} record={record} onLike={toggleLike} />
            ))}
            {visibleRecords.length === 0 && (
              <div className="text-center mt-12">
                <PixelCoin size={48} className="mx-auto mb-3 opacity-30" />
                <p
                  className="text-sm text-light"
                  style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
                >
                  {activeTab === "you" ? t("home.empty.you") : t("home.empty.everyone")}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {authenticated && <TokuBar tokuCount={tokuCount} />}
      <BottomNav />
    </div>
  );
}
