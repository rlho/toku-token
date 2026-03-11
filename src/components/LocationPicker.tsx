"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useI18n } from "@/lib/i18n";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

type Location = { lat: number; lng: number };

type Props = {
  value: Location | null;
  onChange: (loc: Location | null) => void;
};

export function LocationPicker({ value, onChange }: Props) {
  const { t } = useI18n();
  const [mode, setMode] = useState<"none" | "current" | "pick">("none");
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = useCallback(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setMode("current");
        setLoading(false);
      },
      () => {
        setLoading(false);
        alert(t("location.error"));
      }
    );
  }, [onChange, t]);

  const handleModeChange = (newMode: "none" | "current" | "pick") => {
    if (newMode === "none") {
      onChange(null);
      setMode("none");
    } else if (newMode === "current") {
      getCurrentLocation();
    } else {
      setMode("pick");
      if (!value) {
        onChange({ lat: 35.6762, lng: 139.6503 });
      }
    }
  };

  return (
    <div className="mt-4">
      <p className="text-sm text-muted mb-2">{t("location.label")}</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleModeChange("none")}
          className={`text-xs px-3 py-1.5 rounded border transition-colors ${
            mode === "none" ? "bg-foreground text-white border-foreground" : "border-border hover:bg-surface"
          }`}
        >
          {t("location.none")}
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("current")}
          className={`text-xs px-3 py-1.5 rounded border transition-colors ${
            mode === "current" ? "bg-foreground text-white border-foreground" : "border-border hover:bg-surface"
          }`}
        >
          {loading ? t("location.fetching") : t("location.current")}
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("pick")}
          className={`text-xs px-3 py-1.5 rounded border transition-colors ${
            mode === "pick" ? "bg-foreground text-white border-foreground" : "border-border hover:bg-surface"
          }`}
        >
          {t("location.pick")}
        </button>
      </div>

      {(mode === "current" || mode === "pick") && value && (
        <div className="mt-3">
          <div className="h-48 rounded-lg overflow-hidden border border-border">
            <MapComponent
              position={value}
              draggable={mode === "pick"}
              onPositionChange={onChange}
            />
          </div>
          <p className="text-xs text-light mt-1">
            {value.lat.toFixed(4)}, {value.lng.toFixed(4)}
          </p>
        </div>
      )}
    </div>
  );
}
