"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./NavItems";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "10px" }}
      className="lg:hidden fixed bottom-3 left-0 right-0 z-40 flex items-center justify-around bg-(--color-bg-surface) rounded-full py-2 px-2"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-2 py-1 text-[10px] font-medium transition-colors ${
              isActive
                ? "text-(--color-action-primary)"
                : "text-(--color-text-subtle)"
            }`}
          >
            <Icon size={20} />
            {item.mobileLabel ?? item.label}
          </Link>
        );
      })}
    </nav>
  );
}
