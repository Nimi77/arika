"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function Campaigns() {
  const [is24HourEnabled, setIs24HourEnabled] = useState(true);
  const [isFollowUpEnabled, setIsFollowUpEnabled] = useState(false);

  return (
    <div className="campaigns">
      <h1 className="mt-6 text-2xl font-black text-(--color-text) lg:mt-auto">
        Campaigns
      </h1>

      <div className="mt-4 flex flex-col items-start">
        <h2 className="text-lg font-bold">Automated Recovery</h2>

        <p className="text-(--color-text-secondary) text-sm">
          Let Arika automatically chase pending sales and abandoned
          conversations.
        </p>
      </div>

      <div className="my-4 flex flex-col gap-3">
        <div className="px-4 py-3 bg-(--color-bg-surface) rounded-3xl flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-sm">24-Hour Check-in</h3>

            <p className="mt-1 text-(--color-text-subtle) text-xs">
              Send a gentle reminder to customers who stop responding after
              inquiring about a product.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={is24HourEnabled}
            aria-label="24-Hour Check-in"
            onClick={() => setIs24HourEnabled((current) => !current)}
            className={`flex h-6 w-10 items-center rounded-full p-1 transition-colors ${
              is24HourEnabled
                ? "bg-(--color-action-primary)"
                : "bg-(--color-inactive-icon)"
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-4 w-4 rounded-full bg-white transition-transform ${
                is24HourEnabled ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="px-4 py-3 bg-(--color-bg-surface) rounded-3xl flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-sm">
              48-Hour & 72-Hour Follow-ups
            </h3>
            <p className="mt-1 text-(--color-text-subtle) text-xs">
              Trigger secondary reminders for unresolved conversations.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={isFollowUpEnabled}
            aria-label="48-Hour and 72-Hour Follow-ups"
            onClick={() => setIsFollowUpEnabled((current) => !current)}
            className={`flex h-6 w-10 items-center rounded-full p-1 transition-colors ${
              isFollowUpEnabled
                ? "bg-(--color-action-primary)"
                : "bg-(--color-inactive-icon)"
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-4 w-4 rounded-full bg-white transition-transform ${
                isFollowUpEnabled ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <section
        aria-labelledby="promotional-broadcasts-heading"
        className="broadcast px-6 py-5 bg-(--color-bg-surface) rounded-[40px] flex flex-col gap-6"
      >
        <div>
          <h2 id="promotional-broadcasts-heading" className="text-lg font-bold">
            Promotional Broadcasts
          </h2>

          <p className="text-sm text-(--color-text-subtle)">
            Send marketing campaigns to eligible opted-in customers
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="p-6 bg-[#312E8133] rounded-full" aria-hidden="true">
            <Send size={40} className="text-indigo-500" />
          </div>

          <span className="text-sm font-bold">No active broadcasts.</span>
        </div>

        <button
          type="button"
          className="bg-(--color-action-primary) text-white text-sm rounded-full py-4 font-semibold hover:bg-(--color-action-primary-hover)"
        >
          New Broadcast
        </button>
      </section>
    </div>
  );
}
