"use client";

import { useState } from "react";
import { SocialIcon } from "react-social-icons";
import ContinueButton from "./ContinueButton";
import StepCircles from "./StepCircles";

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
    <div className="px-3 sm:px-6 lg:px-0">
      <h1 className="lg:text-[32px] text-[24px] mt-6 text-(--color-text) sm:text-3xl font-black text-center">
        Link your platforms
      </h1>
      <p className="mb-6 lg:text-sm text-[12px] text-neutral-500 text-left lg:text-center max-w-xs sm:max-w-md">
        Securely connect your accounts through Meta's official platform so that
        Arika can manage your customer conversations.
      </p>

      <StepCircles step={3} />

      <div className="w-full max-w-2xl mt-2">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-row sm:flex-col items-center sm:items-stretch justify-between sm:justify-start gap-3 sm:gap-4 flex-1 rounded-2xl bg-(--color-bg-surface) p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <SocialIcon
                network="instagram"
                style={{ width: 32, height: 32 }}
                className="shrink-0"
              />
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
              <SocialIcon
                network="whatsapp"
                style={{ width: 32, height: 32 }}
                className="shrink-0"
              />
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
    </div>
  );
}
