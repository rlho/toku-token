"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { TokuGarden } from "@/components/TokuGarden";
import { PixelCoin } from "@/components/PixelCoin";
import { SBT_ABI } from "@/lib/sbtAbi";
import { useI18n } from "@/lib/i18n";

const RPC_URL = "https://sepolia.base.org";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SBT_CONTRACT_ADDRESS!;

function useTotalMinted() {
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, SBT_ABI, provider);
        const minted = await contract.totalMinted();
        setTotal(Number(minted));
      } catch (e) {
        console.error("Failed to fetch totalMinted:", e);
      }
      setLoading(false);
    };

    fetchTotal();
  }, []);

  return { total, loading };
}

export default function ProfilePage() {
  const { total, loading } = useTotalMinted();
  const { t } = useI18n();
  const tokuCount = total ?? 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFEF2]">
      <Header />

      <div className="flex-1 px-4 pt-4 pb-20 overflow-y-auto">
        {/* Title */}
        <h2
          className="text-center text-sm text-muted mb-4"
          style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          {t("garden.title")}
        </h2>

        {/* Garden */}
        {loading ? (
          <div className="flex justify-center py-12">
            <PixelCoin size={32} className="animate-spin" />
          </div>
        ) : (
          <TokuGarden tokuCount={tokuCount} />
        )}

        {/* Stats */}
        <div
          className="mt-4 p-4 rounded-lg bg-foreground text-parchment"
          style={{ boxShadow: "3px 3px 0px #1a0d0d" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PixelCoin size={24} />
              <div>
                <p
                  className="text-2xl font-bold text-accent-bright"
                  style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
                >
                  {tokuCount}
                </p>
                <p
                  className="text-[10px] opacity-60"
                  style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
                >
                  {t("garden.total")}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className="text-[10px] opacity-60 mb-1"
                style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
              >
                Base Sepolia
              </p>
              <a
                href={`https://sepolia.basescan.org/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-accent underline"
                style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
              >
                {t("garden.contract")}
              </a>
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          className="mt-4 text-center text-xs text-light leading-relaxed"
          style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          {t("garden.desc1")}
          <br />
          {t("garden.desc2")}
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
