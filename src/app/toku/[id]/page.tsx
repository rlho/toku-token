"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { PixelCoin } from "@/components/PixelCoin";
import { PixelFlower } from "@/components/PixelFlower";
import { useTokuStore } from "@/store/useTokuStore";
import { useI18n } from "@/lib/i18n";

export default function TokuDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = usePrivy();
  const { t } = useI18n();
  const userId = user?.id;
  const { records, loading, toggleLike } = useTokuStore(userId);

  const record = records.find((r) => r.id === id);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFEF2]">
      <Header />

      <div className="flex-1 px-4 pt-4 pb-20">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-xs text-muted mb-4 hover:text-foreground transition-colors"
          style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          <svg width="12" height="12" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
            <rect x="3" y="0" width="1" height="1" fill="currentColor" />
            <rect x="2" y="1" width="1" height="1" fill="currentColor" />
            <rect x="1" y="2" width="1" height="1" fill="currentColor" />
            <rect x="0" y="3" width="1" height="1" fill="currentColor" />
            <rect x="1" y="4" width="1" height="1" fill="currentColor" />
            <rect x="2" y="5" width="1" height="1" fill="currentColor" />
            <rect x="3" y="6" width="1" height="1" fill="currentColor" />
            <rect x="1" y="3" width="6" height="1" fill="currentColor" />
          </svg>
          {t("detail.back")}
        </button>

        {loading ? (
          <div className="flex justify-center mt-12">
            <PixelCoin size={32} className="animate-spin" />
          </div>
        ) : !record ? (
          <div className="text-center mt-12">
            <PixelCoin size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm text-light" style={{ fontFamily: "var(--font-dot-gothic), monospace" }}>
              {t("detail.notFound")}
            </p>
          </div>
        ) : (
          <div
            className="card-parchment rounded-lg p-5"
            style={{ boxShadow: "3px 3px 0px #D4C8B8" }}
          >
            {/* Flower + Date */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-lg bg-parchment-dark flex items-center justify-center border-2 border-border">
                <PixelFlower seed={record.id} size={36} />
              </div>
              <span
                className="text-xs text-light"
                style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
              >
                {record.date}
              </span>
            </div>

            {/* Text */}
            <p className="text-base leading-relaxed text-foreground mb-4">
              {record.text}
            </p>

            {/* Image */}
            {record.imageUrl && (
              <div className="rounded-lg overflow-hidden border-2 border-border mb-4">
                <Image
                  src={record.imageUrl}
                  alt=""
                  width={600}
                  height={400}
                  className="w-full object-contain max-h-80"
                />
              </div>
            )}

            {/* Location */}
            {record.latitude && record.longitude && (
              <div className="flex items-center gap-1 mb-4 text-xs text-muted">
                <svg width="12" height="12" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" }}>
                  <rect x="3" y="0" width="2" height="1" fill="currentColor" />
                  <rect x="2" y="1" width="4" height="1" fill="currentColor" />
                  <rect x="2" y="2" width="4" height="1" fill="currentColor" />
                  <rect x="3" y="3" width="2" height="1" fill="currentColor" />
                  <rect x="3" y="4" width="2" height="1" fill="currentColor" />
                  <rect x="3" y="5" width="2" height="1" fill="currentColor" />
                  <rect x="4" y="6" width="1" height="1" fill="currentColor" />
                </svg>
                <span style={{ fontFamily: "var(--font-dot-gothic), monospace" }}>
                  {record.latitude.toFixed(3)}, {record.longitude.toFixed(3)}
                </span>
              </div>
            )}

            {/* Footer: toku badge + like */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-1">
                <PixelCoin size={16} />
                <span
                  className="text-xs text-accent"
                  style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
                >
                  +1 toku
                </span>
              </div>

              <button
                onClick={() => toggleLike(record.id)}
                className="flex items-center gap-1.5 group"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 8 8"
                  style={{ imageRendering: "pixelated" }}
                >
                  {record.likedByMe ? (
                    <>
                      <rect x="1" y="1" width="2" height="2" fill="#C85A54" />
                      <rect x="5" y="1" width="2" height="2" fill="#C85A54" />
                      <rect x="0" y="2" width="8" height="2" fill="#C85A54" />
                      <rect x="1" y="4" width="6" height="1" fill="#C85A54" />
                      <rect x="2" y="5" width="4" height="1" fill="#C85A54" />
                      <rect x="3" y="6" width="2" height="1" fill="#C85A54" />
                    </>
                  ) : (
                    <>
                      <rect x="1" y="1" width="2" height="1" fill="#A89888" />
                      <rect x="5" y="1" width="2" height="1" fill="#A89888" />
                      <rect x="0" y="2" width="1" height="1" fill="#A89888" />
                      <rect x="3" y="2" width="2" height="1" fill="#A89888" />
                      <rect x="7" y="2" width="1" height="1" fill="#A89888" />
                      <rect x="0" y="3" width="1" height="1" fill="#A89888" />
                      <rect x="7" y="3" width="1" height="1" fill="#A89888" />
                      <rect x="1" y="4" width="1" height="1" fill="#A89888" />
                      <rect x="6" y="4" width="1" height="1" fill="#A89888" />
                      <rect x="2" y="5" width="1" height="1" fill="#A89888" />
                      <rect x="5" y="5" width="1" height="1" fill="#A89888" />
                      <rect x="3" y="6" width="2" height="1" fill="#A89888" />
                    </>
                  )}
                </svg>
                <span
                  className={`text-xs ${record.likedByMe ? "text-pixel-red" : "text-light"}`}
                  style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
                >
                  {record.likeCount > 0 ? record.likeCount : ""}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
