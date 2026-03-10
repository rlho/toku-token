"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { TokuBar } from "@/components/TokuBar";
import { TokuCard } from "@/components/TokuCard";
import { PixelCoin } from "@/components/PixelCoin";
import { useTokuStore } from "@/store/useTokuStore";

export default function HomePage() {
  const { ready, authenticated, login, user } = usePrivy();
  const userId = user?.id;
  const { records, tokuCount, loading } = useTokuStore(userId);
  const [activeTab, setActiveTab] = useState<"you" | "everyone">("you");

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
          onClick={() => setActiveTab("you")}
          className={`flex-1 py-2 text-xs text-center transition-colors ${
            activeTab === "you"
              ? "bg-foreground text-parchment font-bold"
              : "bg-parchment text-muted"
          }`}
          style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          あなた
        </button>
        <button
          onClick={() => setActiveTab("everyone")}
          className={`flex-1 py-2 text-xs text-center transition-colors ${
            activeTab === "everyone"
              ? "bg-foreground text-parchment font-bold"
              : "bg-parchment text-muted"
          }`}
          style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          みんな
        </button>
      </div>

      {/* Content */}
      <div className={`flex-1 px-4 pb-32 ${!authenticated ? "flex flex-col items-center justify-center" : "pt-4"}`}>
        {!ready ? (
          <p className="text-sm text-light text-center">読み込み中...</p>
        ) : !authenticated ? (
          <div className="text-center">
            <div className="mb-4">
              <PixelCoin size={64} className="mx-auto animate-coin-drop" />
            </div>
            <p
              className="text-sm text-muted leading-relaxed mb-4"
              style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
            >
              接続して
              <br />
              tokuを積み始めよう
            </p>
            <button onClick={login} className="btn-pixel text-sm rounded px-6 py-2">
              接続する
            </button>
          </div>
        ) : loading ? (
          <div className="flex justify-center mt-8">
            <PixelCoin size={32} className="animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {visibleRecords.map((record) => (
              <TokuCard key={record.id} record={record} />
            ))}
            {visibleRecords.length === 0 && (
              <div className="text-center mt-12">
                <PixelCoin size={48} className="mx-auto mb-3 opacity-30" />
                <p
                  className="text-sm text-light"
                  style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
                >
                  まだ記録がありません
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
