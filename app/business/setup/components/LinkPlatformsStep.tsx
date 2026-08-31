"use client";

import { useState } from "react";
import ContinueButton from "./ContinueButton";
import StepCircles from "./StepCircles";
import Image from "next/image";
const InstagramIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="shrink-0"
  >
    <defs>
      <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDD55" />
        <stop offset="50%" stopColor="#FF543E" />
        <stop offset="100%" stopColor="#C837AB" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#ig-gradient)" />
    <path
      fill="#fff"
      d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.92a3.12 3.12 0 1 1 0-6.24 3.12 3.12 0 0 1 0 6.24zM18.4 7.03a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0z"
    />
    <path
      fill="#fff"
      d="M16.98 3H7.02A4.03 4.03 0 0 0 3 7.02v9.96A4.03 4.03 0 0 0 7.02 21h9.96A4.03 4.03 0 0 0 21 16.98V7.02A4.03 4.03 0 0 0 16.98 3zm2.5 13.98a2.5 2.5 0 0 1-2.5 2.5H7.02a2.5 2.5 0 0 1-2.5-2.5V7.02a2.5 2.5 0 0 1 2.5-2.5h9.96a2.5 2.5 0 0 1 2.5 2.5v9.96z"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <Image
    src="/whatsapp-business.jpg"
    alt="WhatsApp Business"
    width={32}
    height={32}
    className="shrink-0 rounded-lg object-cover"
  />
);

function ConnectMetaButton({
  connected,
  onConnect,
}: {
  connected: boolean;
  onConnect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onConnect}
      disabled={connected}
      className={`shrink-0 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
        connected
          ? "bg-white text-(--color-action-primary) px-3 py-1.5 sm:py-1.5"
          : "bg-(--color-action-primary) text-(--color-text-on-primary) px-4 py-2 sm:w-full sm:py-2.5 hover:bg-(--color-action-primary) hover:text-white"
      }`}
    >
      {connected ? "Connected" : "Connect via Meta"}
    </button>
  );
}

export default function LinkPlatformsStep({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [whatsappConnected, setWhatsappConnected] = useState(false);

  function handleConnectInstagram() {
    setInstagramConnected(true);
  }

  function handleConnectWhatsApp() {
    setWhatsappConnected(true);
  }

  return (
    <section
      aria-labelledby="link-platform-heading"
      className="
        mx-auto w-full max-w-2xl
        px-4 py-6
        sm:px-6 sm:py-8
        lg:px-8 lg:py-10
      "
    >
      {/* Header */}
      <div
        className="
          mx-auto
          flex max-w-xl flex-col
          items-center
          gap-2
          text-center
        "
      >
        <h1
          id="link-platform-heading"
          className="
            text-2xl font-black leading-tight
            text-(--color-text)
            sm:text-3xl
            lg:text-4xl
          "
        >
          Link your platforms
        </h1>
        <p className="max-w-xl text-sm leading-6 text-(--color-text-subtle) sm:text-base">
          Securely connect your accounts through Meta's official platform so
          that Arika can manage your customer conversations.
        </p>
      </div>

      {/* Step indicator */}
      <div className="my-6 sm:my-8 lg:my-10">
        <StepCircles step={3} />
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-row sm:flex-col items-center sm:items-stretch justify-between sm:justify-start gap-3 sm:gap-4 flex-1 rounded-2xl bg-(--color-bg-surface) p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <InstagramIcon />
              <div className="flex flex-col text-left">
                <span className="lg:text-sm text-xs font-semibold text-(--color-text)">
                  Instagram DMs
                </span>
                <span className="text-[8px] text-subtle">Connect via Meta</span>
              </div>
            </div>
            <ConnectMetaButton
              connected={instagramConnected}
              onConnect={handleConnectInstagram}
            />
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-stretch justify-between sm:justify-start gap-3 sm:gap-4 flex-1 rounded-2xl bg-(--color-bg-surface) p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <WhatsAppIcon />
              <div className="flex flex-col text-left">
                <span className="lg:text-sm text-xs font-semibold text-(--color-text)">
                  WhatsApp
                </span>
                <span className="text-[8px] text-subtle">Connect via Meta</span>
              </div>
            </div>
            <ConnectMetaButton
              connected={whatsappConnected}
              onConnect={handleConnectWhatsApp}
            />
          </div>
        </div>

        <ContinueButton onClick={onComplete} />
      </div>
    </section>
  );
}
