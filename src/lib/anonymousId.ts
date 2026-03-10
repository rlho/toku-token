"use client";

const STORAGE_KEY = "toku_anonymous_id";

export function getAnonymousId(): string {
  if (typeof window === "undefined") return "";

  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = "anon_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}
