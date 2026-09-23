"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { AIIcon, InstagramIcon, UserIcon, WhatsAppIcon } from "@/app/svg-icons";

type Conversation = {
  id: number;
  name: string;
  profileImage: string;
  message: string;
  time: string;
  platform: "WhatsApp" | "Instagram";
  handledBy: "AI" | "You";
  requiresAttention: boolean;
};

type MessageFilter = "all" | "attention" | "ai" | "you";
const filters: { label: string; value: MessageFilter }[] = [
  { label: "All messages", value: "all" },
  { label: "Requires Attention", value: "attention" },
  { label: "AI Handling", value: "ai" },
  { label: "Handled by you", value: "you" },
];

const mockConversations: Conversation[] = [
  {
    id: 1,
    name: "Amara Okafor",
    profileImage: "",
    message: "Hi, I would like to know more about your products.",
    time: "10:42 AM",
    platform: "Instagram",
    handledBy: "AI",
    requiresAttention: false,
  },
  {
    id: 2,
    name: "David Williams",
    profileImage: "",
    message: "Can someone help me with my order?",
    time: "9:18 AM",
    platform: "WhatsApp",
    handledBy: "You",
    requiresAttention: true,
  },
  {
    id: 3,
    name: "Chioma Eze",
    profileImage: "",
    message: "Is this item available in black?",
    time: "Yesterday",
    platform: "WhatsApp",
    handledBy: "AI",
    requiresAttention: false,
  },
  {
    id: 4,
    name: "Michael Adeyemi",
    profileImage: "",
    message: "I have an issue with my payment.",
    time: "Yesterday",
    platform: "Instagram",
    handledBy: "You",
    requiresAttention: true,
  },
];

export default function UserInbox() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<MessageFilter>("all");

  const filteredMessages = useMemo(() => {
    return mockConversations.filter((conversation) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        conversation.name.toLowerCase().includes(searchValue) ||
        conversation.message.toLowerCase().includes(searchValue);

      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "attention" && conversation.requiresAttention) ||
        (activeFilter === "ai" && conversation.handledBy === "AI") ||
        (activeFilter === "you" && conversation.handledBy === "You");

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  return (
    <div className="inbox">
      <h1 className="mt-6 text-2xl font-black text-(--color-text) lg:mt-auto">
        Inbox
      </h1>

      <div className="mt-4 mb-6 flex flex-col gap-6">
        <div className="search-box relative">
          <Search
            size={12}
            className="absolute top-4.5 left-4 text-(--color-inactive-icon)"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full border-transparent rounded-full px-8 py-3 overflow-hidden"
          />
        </div>

        <div className="filter-messages flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`w-max bg-(--color-bg-surface) text-sm font-medium rounded-full px-4 py-2
                    ${activeFilter === filter.value ? "text-(--color-action-primary)" : "text-(--color-inactive-icon)"}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="messages flex flex-col gap-4">
        {filteredMessages.map((conversation) => (
          <div key={conversation.id} className="flex items-center gap-3">
            <div className="relative">
              <div className="user-logo h-11 w-11 shrink-0 overflow-hidden rounded-full bg-(--color-bg-surface)">
                {conversation.profileImage ? (
                  <Image
                    src={conversation.profileImage}
                    alt={conversation.name}
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-(--color-inactive-icon)">
                    {conversation.name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-(--color-bg-surface)">
                {conversation.platform === "WhatsApp" ? (
                  <WhatsAppIcon />
                ) : (
                  <InstagramIcon />
                )}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-(--color-text)">
                {conversation.name}
              </p>
              <p className="truncate text-sm text-(--color-inactive-icon)">
                {conversation.message}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-xs text-(--color-action-primary)">
                {conversation.time}
              </p>
              <div className="mt-2 bg-(--color-bg-surface) px-3 py-1 rounded-full flex items-center gap-1.5">
                <p className="text-xs text-(--color-inactive-icon)">
                  {conversation.handledBy === "AI"
                    ? "Handled by AI"
                    : "Handled by you"}
                </p>
                <span>
                  {conversation.handledBy === "AI" ? <AIIcon /> : <UserIcon />}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredMessages.length === 0 && (
          <p className="text-sm text-(--color-inactive-icon)">
            No conversations found.
          </p>
        )}
      </div>
    </div>
  );
}
