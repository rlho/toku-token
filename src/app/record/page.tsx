"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { PixelCoin } from "@/components/PixelCoin";
import { PixelFlower } from "@/components/PixelFlower";
import { LocationPicker } from "@/components/LocationPicker";
import { useTokuStore } from "@/store/useTokuStore";

export default function RecordPage() {
  const { ready, authenticated, login, user } = usePrivy();
  const userId = user?.id;
  const { addRecord } = useTokuStore(userId);
  const [text, setText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!text.trim() || submitting) return;
    setSubmitting(true);

    const ok = await addRecord(text.trim(), isPrivate, location ?? undefined);
    if (ok) {
      setSubmitted(true);
      setTimeout(() => router.push("/"), 2500);
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FFFEF2]">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {/* Coin drop animation */}
          <div className="relative">
            <PixelCoin size={80} className="animate-coin-drop" />
            {/* Sparkles */}
            <div className="absolute -top-2 -left-2 animate-sparkle" style={{ animationDelay: "0.2s" }}>
              <PixelFlower seed="sparkle1" size={12} />
            </div>
            <div className="absolute -top-1 -right-3 animate-sparkle" style={{ animationDelay: "0.5s" }}>
              <PixelFlower seed="sparkle2" size={10} />
            </div>
            <div className="absolute -bottom-2 left-0 animate-sparkle" style={{ animationDelay: "0.8s" }}>
              <PixelFlower seed="sparkle3" size={14} />
            </div>
          </div>
          <p
            className="text-lg text-foreground animate-level-up"
            style={{ fontFamily: "var(--font-dot-gothic), monospace", animationDelay: "0.3s" }}
          >
            tokuが溜まりました！
          </p>
          <p
            className="text-xs text-accent animate-level-up"
            style={{ fontFamily: "var(--font-dot-gothic), monospace", animationDelay: "0.6s" }}
          >
            +1 TOKU
          </p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFEF2]">
      <Header />

      <div className="flex-1 px-4 pt-6 pb-24 overflow-y-auto">
        {/* Coin icon */}
        <div className="flex justify-center mb-5">
          <div
            className="w-16 h-16 rounded-lg bg-parchment flex items-center justify-center border-2 border-border"
            style={{ boxShadow: "3px 3px 0px #D4C8B8" }}
          >
            <PixelCoin size={36} />
          </div>
        </div>

        {/* Text input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="今日のちょっといいこと教えて..."
          className="w-full h-28 border-2 border-border bg-parchment rounded-lg p-4 text-sm resize-none focus:outline-none focus:border-foreground placeholder:text-light"
          style={{ boxShadow: "3px 3px 0px #D4C8B8" }}
        />

        {ready && authenticated ? (
          <>
            <label className="flex items-center gap-2 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="w-4 h-4 rounded accent-foreground"
              />
              <span className="text-xs text-muted">みんなのタイムラインに表示しない</span>
            </label>

            <LocationPicker value={location} onChange={setLocation} />

            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                disabled={!text.trim() || submitting}
                className="btn-pixel text-sm rounded px-8 py-2.5 disabled:opacity-30"
              >
                {submitting ? "記録中..." : "tokuを積む"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center mt-8">
            <p className="text-sm text-muted" style={{ fontFamily: "var(--font-dot-gothic), monospace" }}>
              接続して記録を保存しよう
            </p>
            <button onClick={login} disabled={!ready} className="btn-pixel text-sm rounded px-6 py-2 mt-4">
              接続する
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
