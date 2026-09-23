"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Inbox as InboxIcon, Sparkles, Book } from "lucide-react";

import StatCard from "./components/StatCard";
import ChannelRow from "./components/ChannelRow";
import QuickActionCard from "./components/QuickActionCard";
import { InstagramIcon, WhatsAppIcon } from "@/app/svg-icons";
import { apiFetch } from "@/lib/api";

type BusinessResponse = {
  data: {
    name?: string;
  };
};

export default function DashboardPage() {
  const router = useRouter();

  const [displayName, setDisplayName] = useState<string | null>(null);
  const [instagramConnected, setInstagramConnected] = useState(true);
  const [whatsappConnected, setWhatsappConnected] = useState(false);

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const data = await apiFetch<BusinessResponse>("/business/me");

        setDisplayName(data.data.name ?? null);
      } catch {
        // Fall back to a generic greeting.
      }
    }

    fetchBusiness();
  }, []);

  function handleConnectWhatsApp() {
    setWhatsappConnected(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/integrations/whatsapp/connect`;
  }

  function handleConnectInstagram() {
    setInstagramConnected(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/integrations/instagram/connect`;
  }

  return (
    <div className="dashboard home-page">
      <div className="top text my-6">
        <h1 className="text-2xl font-black text-(--color-text) lg:mt-auto">
          Good Morning, {displayName ? ` ${displayName}` : ""}
        </h1>

        <p className="mt-1 text-sm text-(--color-text-subtle)">
          Here is what is happening across your channels today.
        </p>
      </div>

      {/* Stats */}
      <div className="-mx-4 mb-8 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0">
        <StatCard
          label="Messages Today"
          value="0"
          icon={
            <InboxIcon size={20} className="text-(--color-action-primary)" />
          }
        />

        <StatCard
          label="AI Handled"
          value="--%"
          icon={<Sparkles size={20} className="text-green-400" />}
        />

        <StatCard
          label="Requires Human Action"
          value="0"
          icon={
            <Sparkles size={20} className="text-(--color-action-primary)" />
          }
        />
      </div>

      {/* Connected Channels */}
      <div className="channels mb-8 flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-(--color-text)">
          Connected Channels
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ChannelRow
            icon={
              <div className="h-7 w-7">
                <InstagramIcon />
              </div>
            }
            title="Instagram DMs"
            subtitle="@sarahs_couture"
            connected={instagramConnected}
            onConnect={handleConnectInstagram}
          />

          <ChannelRow
            icon={
              <div className="h-8 w-8">
                <WhatsAppIcon />
              </div>
            }
            title="WhatsApp Business"
            subtitle="Connect via Meta"
            connected={whatsappConnected}
            onConnect={handleConnectWhatsApp}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="channels flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-(--color-text)">
          Quick Actions
        </h2>

        <div className="flex gap-3">
          <QuickActionCard
            icon={<InboxIcon size={25} className="text-green-400" />}
            title="Test Your AI Agent"
            description="Send a WhatsApp message asking your standard delivery fee to see Arika reply in real time."
            actionLabel="Open Inbox"
            onAction={() => router.push("/inbox")}
          />

          <QuickActionCard
            icon={<Book size={25} className="rotate-180 text-orange-400" />}
            title="Add Knowledge Base"
            description="Add custom store policies, delivery zones, or product FAQs to boost response accuracy."
            actionLabel="Add Policies"
            onAction={() => router.push("/knowledge")}
          />
        </div>
      </div>
    </div>
  );
}
