"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { TokuCard } from "@/components/TokuCard";
import { PixelCoin } from "@/components/PixelCoin";
import { PixelFlower } from "@/components/PixelFlower";
import { useTokuStore } from "@/store/useTokuStore";

export default function EveryonePage() {
  const { user } = usePrivy();
  const userId = user?.id;
  const { records, loading } = useTokuStore(userId);

  const publicRecords = records.filter((r) => !r.isPrivate);

  // Simple stats
  const uniqueUsers = new Set(publicRecords.map((r) => r.userId)).size;
  const totalToku = publicRecords.length;

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFEF2]">
      <Header />

      {/* Stats banner */}
      <div
        className="mx-4 mt-3 p-4 rounded-lg bg-foreground text-parchment"
        style={{ boxShadow: "3px 3px 0px #1a0d0d" }}
      >
        <p
          className="text-xs mb-3 opacity-70"
          style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          みんなのtoku
        </p>
        <div className="flex items-center justify-around">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <PixelCoin size={20} />
              <span
                className="text-2xl text-accent-bright font-bold"
                style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
              >
                {totalToku}
              </span>
            </div>
            <p className="text-[10px] opacity-60" style={{ fontFamily: "var(--font-dot-gothic), monospace" }}>
              トータルtoku
            </p>
          </div>
          <div className="w-px h-8 bg-parchment opacity-20" />
          <div className="text-center">
            <span
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
            >
              {uniqueUsers}
            </span>
            <p className="text-[10px] opacity-60" style={{ fontFamily: "var(--font-dot-gothic), monospace" }}>
              tokuを積む人
            </p>
          </div>
          <div className="w-px h-8 bg-parchment opacity-20" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-0.5 mb-1">
              {[0, 1, 2].map((i) => (
                <PixelFlower key={i} seed={`stat-${i}`} size={14} />
              ))}
            </div>
            <p className="text-[10px] opacity-60" style={{ fontFamily: "var(--font-dot-gothic), monospace" }}>
              咲いた花
            </p>
          </div>
        </div>
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
              まだ誰もtokuを積んでいません
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {publicRecords.map((record) => (
              <TokuCard key={record.id} record={record} showUser />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
