import { PixelFlower } from "./PixelFlower";
import { PixelCoin } from "./PixelCoin";
import { TokuRecord } from "@/store/useTokuStore";

export function TokuCard({ record, showUser = false }: { record: TokuRecord; showUser?: boolean }) {
  return (
    <div className="card-parchment rounded-lg p-4 flex items-start gap-3">
      {/* Flower icon unique to each record */}
      <div className="w-12 h-12 rounded bg-parchment-dark flex items-center justify-center shrink-0 border border-border">
        <PixelFlower seed={record.id} size={28} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm leading-relaxed text-foreground">{record.text}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <PixelCoin size={12} />
            <span className="text-[10px] text-accent" style={{ fontFamily: "var(--font-dot-gothic), monospace" }}>
              +1 toku
            </span>
          </div>
          <span className="text-[10px] text-light">{record.date}</span>
        </div>
      </div>
    </div>
  );
}
