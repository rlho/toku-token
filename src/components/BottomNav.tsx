"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "ホーム",
    href: "/",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" as const }}>
        <rect x="3" y="0" width="2" height="1" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="2" y="1" width="4" height="1" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="1" y="2" width="6" height="1" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="0" y="3" width="8" height="1" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="1" y="4" width="6" height="4" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="3" y="5" width="2" height="3" fill={active ? "#FFFEF2" : "#F5EFE4"} />
      </svg>
    ),
  },
  {
    label: "記録",
    href: "/record",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" as const }}>
        <rect x="6" y="0" width="1" height="1" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="5" y="1" width="1" height="1" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="4" y="2" width="1" height="1" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="3" y="3" width="1" height="1" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="2" y="4" width="1" height="1" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="1" y="5" width="1" height="1" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="0" y="6" width="2" height="2" fill={active ? "#3B1C1C" : "#A89888"} />
      </svg>
    ),
  },
  {
    label: "みんな",
    href: "/everyone",
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 8 8" style={{ imageRendering: "pixelated" as const }}>
        <rect x="1" y="0" width="2" height="2" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="5" y="0" width="2" height="2" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="0" y="2" width="4" height="1" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="4" y="2" width="4" height="1" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="0" y="3" width="4" height="3" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="4" y="3" width="4" height="3" fill={active ? "#3B1C1C" : "#A89888"} />
        <rect x="3" y="1" width="2" height="1" fill={active ? "#DAA520" : "#D4C8B8"} />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] bg-[#FFFEF2] border-t-2 border-border">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-1 py-1 px-4"
            >
              {item.icon(active)}
              <span
                className={`text-[10px] ${active ? "text-foreground font-bold" : "text-light"}`}
                style={{ fontFamily: "var(--font-dot-gothic), monospace" }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
