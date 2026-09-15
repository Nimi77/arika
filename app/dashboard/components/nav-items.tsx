import { House, Inbox, Send, Book, Settings, Megaphone } from "lucide-react";

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    mobileLabel: "Home",
    href: "/dashboard",
    icon: House,
  },
  { label: "Inbox", href: "/inbox", icon: Inbox },
  { label: "Campaigns", href: "/campaigns", icon: Send },
  { label: "Knowledge", href: "/knowledge", icon: Book },
  { label: "Settings", href: "/settings", icon: Settings },
];
