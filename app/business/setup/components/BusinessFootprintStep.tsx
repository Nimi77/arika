"use client";

import { useState } from "react";
import ContinueButton from "./ContinueButton";
import StepCircles from "./StepCircles";

type FieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  large?: boolean;
};

function TextField({ label, placeholder, value, onChange, large }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      <label
        className={`text-left font-semibold text-(--color-secondary) ${
          large ? "text-sm sm:text-base" : "text-xs"
        }`}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[28px] hover:border-(--color-action-primary) bg-(--color-bg-surface) px-4 py-3 text-sm text-(--color-text) placeholder:text-neutral-500 outline-none border border-transparent focus:border-(--color-action-primary) transition-colors"
      />
    </div>
  );
}

function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
  large,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      <label
        className={`text-left font-semibold text-(--color-secondary) ${
          large ? "text-sm sm:text-base" : "text-xs"
        }`}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-none rounded-[28px] hover:border-(--color-action-primary) bg-(--color-bg-surface) px-4 py-3 text-sm text-(--color-text) placeholder:text-neutral-500 outline-none border border-transparent focus:border-(--color-action-primary) transition-colors"
      />
    </div>
  );
}

export default function BusinessFootprintStep({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [description, setDescription] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [facebookHandle, setFacebookHandle] = useState("");

  function handleContinue() {
    onComplete();
  }

  return (
    <div className="px-3 sm:px-6 lg:px-0">
      <h1 className="lg:text-[32px] text-[24px] mt-6 text-(--color-text) sm:text-3xl font-black text-center">
        Your business Footprint
      </h1>
      <p className="mb-6 lg:text-sm text-[12px] text-neutral-500 text-left lg:text-center max-w-xs sm:max-w-sm">
        Add your operating details and where customers can find you online
        (Optional but recommended)
      </p>

      <StepCircles step={2} />

      <div className="w-full max-w-md mt-2">
        <div className="flex flex-col gap-5">
          <TextAreaField
            label="Business description"
            placeholder="e.g We sell premium, locally sourced jewelry and accessories for women."
            value={description}
            onChange={setDescription}
            large
          />

          <TextField
            label="Operating Hours"
            placeholder="e.g Mon"
            value={operatingHours}
            onChange={setOperatingHours}
          />

          <TextField
            label="Website URL"
            placeholder="e.g yourbusiness.com"
            value={websiteUrl}
            onChange={setWebsiteUrl}
          />

          <TextField
            label="Instagram Handle"
            placeholder="e.g Sarah Fashion Couture"
            value={instagramHandle}
            onChange={setInstagramHandle}
          />

          <TextField
            label="Facebook Handle"
            placeholder="e.g Sarah Fashion Couture"
            value={facebookHandle}
            onChange={setFacebookHandle}
          />
        </div>

        <ContinueButton onClick={handleContinue} label="Continue" />
      </div>
    </div>
  );
}
