"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { NAV_ITEMS } from "./NavItems";
import logo from "@/public/logo.svg";
import { apiFetch } from "@/lib/api";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {}
    localStorage.removeItem("accessToken");
    router.push("/");
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-(--color-bg-surface) px-4 py-6">
      <div className="flex items-center gap-2 px-2 mb-8">
        <span>
          <Image
            src={logo}
            alt=""
            width={30}
            height={30}
            className="h-9 w-auto"
            priority
          />
        </span>
        <span className="text-xl font-extrabold text-(--color-action-primary)">
          Arika
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-(--color-active-icon)/5 font-semibold text-(--color-active-icon)"
                  : "text-(--color-text-secondary) hover:bg-(--color-bg-surface-hover)"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-(--color-inactive-icon) hover:bg-(--color-bg-surface-hover) transition-colors"
      >
        Log Out
        <LogOut size={18} className="text-(--color-inactive-icon)" />
      </button>
    </aside>
  );
}
