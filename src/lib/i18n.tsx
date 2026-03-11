"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Locale = "ja" | "en";

const translations = {
  // BottomNav
  "nav.home": { ja: "ホーム", en: "Home" },
  "nav.record": { ja: "記録", en: "Record" },
  "nav.everyone": { ja: "みんな", en: "Everyone" },
  "nav.garden": { ja: "庭", en: "Garden" },

  // Header
  "header.connected": { ja: "接続済", en: "Connected" },
  "header.connect": { ja: "接続する", en: "Connect" },

  // Home
  "home.tab.everyone": { ja: "みんな", en: "Everyone" },
  "home.tab.you": { ja: "あなた", en: "You" },
  "home.connect.message": { ja: "接続して\ntokuを積み始めよう", en: "Connect and\nstart earning toku" },
  "home.connect.button": { ja: "接続する", en: "Connect" },
  "home.empty.you": { ja: "まだ記録がありません", en: "No records yet" },
  "home.empty.everyone": { ja: "まだ誰もtokuを積んでいません", en: "No one has earned toku yet" },

  // Record
  "record.placeholder": { ja: "今日のちょっといいこと教えて...", en: "Share something good you did today..." },
  "record.addImage": { ja: "画像を追加", en: "Add image" },
  "record.private": { ja: "みんなのタイムラインに表示しない", en: "Don't show on public timeline" },
  "record.submitting": { ja: "記録中...", en: "Recording..." },
  "record.submit": { ja: "tokuを積む", en: "Earn toku" },
  "record.connect.message": { ja: "接続して記録を保存しよう", en: "Connect to save your records" },
  "record.connect.button": { ja: "接続する", en: "Connect" },
  "record.success": { ja: "tokuが溜まりました！", en: "You earned toku!" },

  // Everyone
  "everyone.title": { ja: "みんなのtoku", en: "Everyone's toku" },
  "everyone.total": { ja: "トータルtoku", en: "Total toku" },
  "everyone.flowers": { ja: "咲いた花", en: "Flowers" },
  "everyone.empty": { ja: "まだ誰もtokuを積んでいません", en: "No one has earned toku yet" },

  // Detail
  "detail.back": { ja: "もどる", en: "Back" },
  "detail.notFound": { ja: "記録が見つかりません", en: "Record not found" },

  // Profile / Garden
  "garden.title": { ja: "みんなの庭", en: "Our Garden" },
  "garden.total": { ja: "みんなで積んだtoku", en: "Total toku earned" },
  "garden.contract": { ja: "コントラクトを見る", en: "View contract" },
  "garden.desc1": { ja: "tokuを積むたびに蓮の花が咲きます", en: "A lotus blooms with every toku earned" },
  "garden.desc2": { ja: "みんなの善行で蓮池を満たそう", en: "Fill the pond with everyone's good deeds" },
  "garden.empty": { ja: "tokuを積んで蓮を咲かせよう", en: "Earn toku to bloom a lotus" },

  // Location
  "location.label": { ja: "位置情報", en: "Location" },
  "location.none": { ja: "なし", en: "None" },
  "location.fetching": { ja: "取得中...", en: "Fetching..." },
  "location.current": { ja: "現在地", en: "Current" },
  "location.pick": { ja: "地図から選ぶ", en: "Pick on map" },
  "location.error": { ja: "位置情報を取得できませんでした", en: "Could not get location" },

  // TokuBar
  "tokubar.label": { ja: "あなたのtoku", en: "Your toku" },

  // Meta
  "meta.description": { ja: "tokuを積んで、花を咲かせよう", en: "Do good deeds, bloom flowers" },
} as const;

type TranslationKey = keyof typeof translations;

type I18nContextType = {
  locale: Locale;
  t: (key: TranslationKey) => string;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("toku-locale");
      if (saved === "en" || saved === "ja") return saved;
    }
    return "ja";
  });

  const t = useCallback(
    (key: TranslationKey) => translations[key]?.[locale] ?? key,
    [locale]
  );

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "ja" ? "en" : "ja";
      localStorage.setItem("toku-locale", next);
      return next;
    });
  }, []);

  return (
    <I18nContext.Provider value={{ locale, t, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
