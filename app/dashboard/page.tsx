"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Inbox as InboxIcon, Sparkles, AlertCircle, Book } from "lucide-react";
import StatCard from "./components/StatCard";
import ChannelRow from "./components/ChannelRow";
import QuickActionCard from "./components/QuickActionCard";
import { InstagramIcon, WhatsAppIcon } from "@/app/svg-icons";
import { apiFetch } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [instagramConnected, setInstagramConnected] = useState(true);
  const [whatsappConnected, setWhatsappConnected] = useState(false);

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const data = await apiFetch("/business/me");
        const business = data?.data ?? data;
        setDisplayName(business?.businessName ?? business?.name ?? null);
      } catch (err) {
        // if this fails, just fall back to a generic greeting below
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
    <div>
      <h1 className="text-2xl lg:mt-auto mt-6 font-black text-(--color-text)">
        Good Morning{displayName ? ` ${displayName}` : ""}
      </h1>
      <p className="text-sm text-(--color-text-subtle) mt-1 mb-6">
        Here is what is happening across your channels today.
      </p>

      {/* ...rest of the file stays exactly the same... */}

      {/* Stats */}
      <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto snap-x pb-2 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
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
      <h2 className="text-sm font-semibold text-(--color-text) mb-3">
        Connected Channels
      </h2>
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <ChannelRow
          icon={
            <div className="w-7 h-7">
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
            <div className="w-8 h-8">
              <WhatsAppIcon />
            </div>
          }
          title="WhatsApp Business"
          subtitle="Connect via Meta"
          connected={whatsappConnected}
          onConnect={handleConnectWhatsApp}
        />
      </div>

      {/* Quick Actions */}
      <h2 className="text-sm font-semibold text-(--color-text) mb-3">
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
          icon={<Book size={25} className="text-orange-400 rotate-180" />}
          title="Add Knowledge Base"
          description="Add custom store policies, delivery zones, or product FAQs to boost response accuracy."
          actionLabel="Add Policies"
          onAction={() => router.push("/knowledge")}
        />
      </div>
    </div>
  );
}
