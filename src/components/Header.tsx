"use client";

import { usePrivy } from "@privy-io/react-auth";
import { PixelCoin } from "./PixelCoin";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { ready, authenticated, login, user } = usePrivy();
  const { locale, t, toggleLocale } = useI18n();

  const displayAddress = () => {
    const wallet = user?.wallet?.address;
    if (wallet) return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
    const email = user?.email?.address;
    if (email) return email.split("@")[0];
    return t("header.connected");
  };

  return (
    <header className="flex items-center justify-between px-4 pt-4 pb-2">
      <div className="flex items-center gap-2">
        <PixelCoin size={28} />
        <span
          className="text-sm font-bold tracking-wider text-foreground"
          style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          Toku Token
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleLocale}
          className="text-[10px] border-2 border-border bg-parchment rounded px-2 py-1 text-muted hover:text-foreground transition-colors"
          style={{ boxShadow: "2px 2px 0px #D4C8B8", fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          {locale === "ja" ? "EN" : "JA"}
        </button>
        {ready && authenticated ? (
          <span
            className="text-xs border-2 border-border bg-parchment rounded px-3 py-1.5 truncate max-w-[130px]"
            style={{ boxShadow: "2px 2px 0px #D4C8B8" }}
          >
            {displayAddress()}
          </span>
        ) : (
          <button
            onClick={login}
            disabled={!ready}
            className="btn-pixel text-xs rounded px-4 py-1.5"
          >
            {t("header.connect")}
          </button>
        )}
      </div>
    </header>
  );
}
