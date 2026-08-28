"use client";

import { useState } from "react";

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
      aria-pressed={selected}
      onClick={onClick}
      className={`rounded-full px-2 py-3 text-xs  text-center transition-colors border ${
        selected
          ? "border-(--color-action-primary) bg-(--color-surface) text-(--color-action-primary)"
          : "border-transparent bg-(--color-surface) text-(--color-text) hover:border-(--color-action-primary)"
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
                ? "bg-transparent border-neutral-700 text-(--color-action-primary) text-sm"
                : step === n
                  ? "border-(--color-action-primary) text-(--color-action-primary)"
                  : "border-neutral-700 text-neutral-500"
            }`}
          >
            {step > n ? "✓" : n}
          </div>
          {i < 2 && (
            <div
              className={`w-20 h-1.25 mx-2 transition-colors ${
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
          ? "bg-(--color-action-primary) text-(--color-text)"
          : "bg-(--color-surface)"
      }`}
    >
      {isCompleting ? "Saving..." : "Complete setup"}
    </button>
  );

  return (
    <>
      <h1 className="text-3xl text-(--color-text) sm:text-3xl font-bold text-center lg:text-[28px]">
        Complete your business profile
      </h1>

      <p className="mb-6 text-sm text-neutral-500 text-center max-w-xs sm:max-w-sm">
        Just a few details to customize your Arika workspace.
      </p>

      {/* Mobile */}
      <div className="w-full max-w-md mt-8 lg:hidden">
        <StepCircles step={step} />

        {step === 1 && (
          <div>
            <h2 className="text-xs  font-semibold text-(--color-secondary) mb-3">
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
              className="btn-primary rounded-full w-full py-2 mt-6 disabled:bg-(--color-surface) disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xs font-semibold text-(--color-secondary) mb-3">
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
            <h2 className="text-xs font-semibold text-(--color-secondary) mb-3">
              How big is your team?
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

      {/* DESKTOP */}
      <div className="hidden lg:block w-full max-w-md mt-8">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-[10px] font-semibold text-(--color-secondary) mb-2">
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
            <h2 className="text-[10px] font-semibold text-(--color-secondary) mb-2">
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
            <h2 className="text-[10px] font-semibold text-(--color-secondary) mb-2">
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
    </>
  );
}
