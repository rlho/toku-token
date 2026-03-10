"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { PixelFlower } from "./PixelFlower";
import { PixelCoin } from "./PixelCoin";
import { TokuRecord } from "@/store/useTokuStore";

export function TokuCard({
  record,
  showUser = false,
  onLike,
}: {
  record: TokuRecord;
  showUser?: boolean;
  onLike?: (recordId: string) => void;
}) {
  const router = useRouter();

  return (
    <div
      className="card-parchment rounded-lg p-4 cursor-pointer hover:brightness-[0.98] transition-all"
      onClick={() => router.push(`/toku/${record.id}`)}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded bg-parchment-dark flex items-center justify-center shrink-0 border border-border">
          <PixelFlower seed={record.id} size={28} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-relaxed text-foreground">{record.text}</p>
        </div>
      </div>

      {record.imageUrl && (
        <div className="mt-3 rounded-lg overflow-hidden border border-border">
          <Image
            src={record.imageUrl}
            alt=""
            width={343}
            height={200}
            className="w-full h-40 object-cover"
          />
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <PixelCoin size={12} />
            <span className="text-[10px] text-accent" style={{ fontFamily: "var(--font-dot-gothic), monospace" }}>
              +1 toku
            </span>
          </div>
          {onLike && (
            <button
              onClick={(e) => { e.stopPropagation(); onLike(record.id); }}
              className="flex items-center gap-1 group"
            >
              <svg
                width="14"
                height="14"
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
                className={`text-[10px] ${record.likedByMe ? "text-pixel-red" : "text-light"}`}
                style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
              >
                {record.likeCount > 0 ? record.likeCount : ""}
              </span>
            </button>
          )}
        </div>
        <span className="text-[10px] text-light">{record.date}</span>
      </div>
    </div>
  );
}
