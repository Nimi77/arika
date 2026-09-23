import { House, Inbox, Send, Book, Settings } from "lucide-react";

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    mobileLabel: "Home",
    href: "/dashboard",
    icon: House,
  },
  { label: "Inbox", href: "/dashboard/inbox", icon: Inbox },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: Send },
  { label: "Knowledge", href: "/dashboard/knowledge", icon: Book },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];
