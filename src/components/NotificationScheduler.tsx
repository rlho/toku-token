"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function subscribeToPush(): Promise<boolean> {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return false;

  const registration = await navigator.serviceWorker.ready;

  const existing = await registration.pushManager.getSubscription();
  if (existing) return true;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return false;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
  });

  await fetch("/api/push-subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscription.toJSON()),
  });

  return true;
}

type NotifState = "loading" | "unsupported" | "prompt" | "subscribed" | "denied" | "dismissed";

export function NotificationScheduler() {
  const [state, setState] = useState<NotifState>("loading");
  const { locale } = useI18n();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(console.error);
    }

    if (!("Notification" in window) || !("PushManager" in window)) {
      setState("unsupported");
      return;
    }

    if (Notification.permission === "denied") {
      setState("denied");
      return;
    }

    // Check if already subscribed
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(async (reg) => {
        const sub = await reg.pushManager.getSubscription();
        setState(sub ? "subscribed" : "prompt");
      });
    }

    // Check if user dismissed banner before
    const dismissed = localStorage.getItem("toku-notif-dismissed");
    if (dismissed) {
      setState("dismissed");
    }
  }, []);

  const handleEnable = async () => {
    const ok = await subscribeToPush();
    setState(ok ? "subscribed" : "denied");
  };

  const handleDismiss = () => {
    localStorage.setItem("toku-notif-dismissed", "1");
    setState("dismissed");
  };

  if (state !== "prompt") return null;

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] z-50 px-4 pt-2">
      <div
        className="bg-foreground text-parchment rounded-lg p-3 flex items-center gap-3"
        style={{ boxShadow: "3px 3px 0px #1a0d0d" }}
      >
        <svg width="24" height="24" viewBox="0 0 8 8" style={{ imageRendering: "pixelated", flexShrink: 0 }}>
          <rect x="3" y="0" width="2" height="1" fill="#FFD700" />
          <rect x="2" y="1" width="4" height="1" fill="#FFD700" />
          <rect x="1" y="2" width="6" height="4" fill="#FFD700" />
          <rect x="3" y="6" width="2" height="1" fill="#DAA520" />
          <rect x="2" y="7" width="4" height="1" fill="#DAA520" />
        </svg>
        <p
          className="text-xs flex-1"
          style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          {locale === "ja"
            ? "毎晩9時にtokuリマインド通知を受け取る？"
            : "Get a daily toku reminder at 9 PM?"}
        </p>
        <button
          onClick={handleEnable}
          className="text-[10px] bg-accent text-foreground font-bold px-2.5 py-1 rounded"
          style={{ boxShadow: "2px 2px 0px #B8860B", fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          OK
        </button>
        <button
          onClick={handleDismiss}
          className="text-[10px] text-light px-1"
          style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
