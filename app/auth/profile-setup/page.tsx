// app/auth/profile-setup/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";

const BUSINESS_CATEGORIES = [
  "Fashion & Apparel",
  "Beauty & personal care",
  "Electronics & gadgets",
  "Food & beverages",
  "Professional services",
  "Other",
];

const LOCATION_CHANNELS = [
  "Instagram",
  "WhatsApp",
  "Physical store",
  "Website/E-commerce",
];

const BUSINESS_SIZES = ["Just you", "2-5 people", "6-20 people", "20+ people"];

type OptionButtonProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

function OptionButton({ label, selected, onClick }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-2 py-3 text-xs  text-center transition-colors border ${
        selected
          ? "border-[var(--color-accent)] bg-[var(--color-surface)] text-[var(--color-accent)]"
          : "border-transparent bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)]"
      }`}
    >
      {label}
    </button>
  );
}

type StepCirclesProps = {
  step: 1 | 2 | 3;
};

function StepCircles({ step }: StepCirclesProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
      {[1, 2, 3].map((n, i) => (
        <div key={n} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-4 transition-colors ${
              step > n
                ? "bg-transparent border-neutral-700 text-[var(--color-accent)] text-sm"
                : step === n
                  ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                  : "border-neutral-700 text-neutral-500"
            }`}
          >
            {step > n ? "✓" : n}
          </div>
          {i < 2 && (
            <div
              className={`w-20 h-[5px] mx-2 transition-colors ${
                step > n ? "bg-neutral-700" : "bg-neutral-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

type Selections = {
  businessCategory: string | null;
  locationChannel: string | null;
  businessSize: string | null;
};

export default function ProfileSetupPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [businessCategory, setBusinessCategory] = useState<string | null>(null);
  const [locationChannel, setLocationChannel] = useState<string | null>(null);
  const [businessSize, setBusinessSize] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const canContinueStep1 = !!businessCategory;
  const canContinueStep2 = !!locationChannel;
  const canComplete = !!businessCategory && !!locationChannel && !!businessSize;

  // Placeholder — backend dev will replace this with the real save call.
  // The full profile payload backend needs is assembled here:
  async function handleComplete() {
    const profileData: Selections = {
      businessCategory,
      locationChannel,
      businessSize,
    };

    setIsCompleting(true);
    try {
      console.log("Profile setup data:", profileData);
      // await saveBusinessProfile(profileData)
      setCompleted(true);
      // router.push("/dashboard") — or wherever the app lands after setup
    } catch (err) {
      // handle failure here
    } finally {
      setIsCompleting(false);
    }
  }

  const completeButton = (
    <button
      type="button"
      onClick={handleComplete}
      disabled={!canComplete || isCompleting}
      className={`w-full py-3 mt-8 rounded-full text-sm transition-colors disabled:opacity-40   disabled:cursor-not-allowed ${
        completed
          ? "bg-[var(--color-accent)] text-[var(--color-text)]"
          : "bg-[var(--color-surface)]"
      }`}
    >
      {isCompleting ? "Saving..." : "Complete setup"}
    </button>
  );

  return (
    <div className="section-shell flex flex-col items-center px-4 py-10 sm:py-16">
      <Image src={logo} alt="Arika" width={70} height={70} priority />

      <h1 className="mt-6 text-3xl text-[var(--color-text)] sm:text-3xl font-bold text-center">
        Complete your business profile
      </h1>

      <p className="mt-2 mb-6 text-sm text-neutral-500 text-center max-w-xs sm:max-w-sm">
        Just a few details to customize your Arika workspace.
      </p>

      {/* ===== MOBILE / TABLET — one category per screen ===== */}
      <div className="w-full max-w-md mt-8 lg:hidden">
        <StepCircles step={step} />

        {step === 1 && (
          <div>
            <h2 className="text-xs  font-semibold text-[var(--color-secondary)] mb-3">
              Business category
            </h2>
            <div className="flex flex-col gap-3">
              {BUSINESS_CATEGORIES.map((cat) => (
                <OptionButton
                  key={cat}
                  label={cat}
                  selected={businessCategory === cat}
                  onClick={() => setBusinessCategory(cat)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!canContinueStep1}
              className="btn-primary rounded-full w-full py-2 mt-6 disabled:bg-[var(--color-surface)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xs font-semibold text-[var(--color-secondary)] mb-3">
              Where do you currently sell or engage customers?
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {LOCATION_CHANNELS.map((loc) => (
                <OptionButton
                  key={loc}
                  label={loc}
                  selected={locationChannel === loc}
                  onClick={() => setLocationChannel(loc)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={!canContinueStep2}
              className="btn-primary w-full py-2 mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xs font-semibold text-[var(--color-secondary)] mb-3">
              Where do you currently sell or engage customers?
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {BUSINESS_SIZES.map((size) => (
                <OptionButton
                  key={size}
                  label={size}
                  selected={businessSize === size}
                  onClick={() => setBusinessSize(size)}
                />
              ))}
            </div>
            {completeButton}
          </div>
        )}
      </div>

      {/* ===== DESKTOP — all three categories together, no step circles ===== */}
      <div className="hidden lg:block w-full max-w-md mt-8">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-[10px] font-semibold text-[var(--color-secondary)] mb-2">
              Business category
            </h2>
            <div className="grid grid-cols-3 gap-1.5">
              {BUSINESS_CATEGORIES.map((cat) => (
                <OptionButton
                  key={cat}
                  label={cat}
                  selected={businessCategory === cat}
                  onClick={() => setBusinessCategory(cat)}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[10px] font-semibold text-[var(--color-secondary)] mb-2">
              Where do you currently sell or engage customers?
            </h2>
            <div className="grid grid-cols-2 gap-1.5">
              {LOCATION_CHANNELS.map((loc) => (
                <OptionButton
                  key={loc}
                  label={loc}
                  selected={locationChannel === loc}
                  onClick={() => setLocationChannel(loc)}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[10px] font-semibold text-[var(--color-secondary)] mb-2">
              How big is your team?
            </h2>
            <div className="grid grid-cols-2 gap-1.5">
              {BUSINESS_SIZES.map((size) => (
                <OptionButton
                  key={size}
                  label={size}
                  selected={businessSize === size}
                  onClick={() => setBusinessSize(size)}
                />
              ))}
            </div>
          </div>
        </div>

        {completeButton}
      </div>
    </div>
  );
}
