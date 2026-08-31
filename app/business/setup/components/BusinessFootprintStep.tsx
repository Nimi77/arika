"use client";

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

type BusinessFootprintStepProps = {
  description: string;
  setDescription: (v: string) => void;
  operatingHours: string;
  setOperatingHours: (v: string) => void;
  websiteUrl: string;
  setWebsiteUrl: (v: string) => void;
  instagramHandle: string;
  setInstagramHandle: (v: string) => void;
  facebookHandle: string;
  setFacebookHandle: (v: string) => void;
  isSubmitting: boolean;
  onComplete: () => void;
};

export default function BusinessFootprintStep({
  description,
  setDescription,
  operatingHours,
  setOperatingHours,
  websiteUrl,
  setWebsiteUrl,
  instagramHandle,
  setInstagramHandle,
  facebookHandle,
  setFacebookHandle,
  isSubmitting,
  onComplete,
}: BusinessFootprintStepProps) {
  return (
    <div className="">
      <h1 className="lg:text-[32px] text-[24px] mt-6 text-(--color-text) sm:text-3xl font-black text-center">
        Your business footprint
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
            placeholder="e.g., Mon - Sat, 9:00 AM to 6:00 PM"
            value={operatingHours}
            onChange={setOperatingHours}
          />

          <TextField
            label="Website URL"
            placeholder="e.g., www.sarahscouture.com"
            value={websiteUrl}
            onChange={setWebsiteUrl}
          />

          <TextField
            label="Instagram Handle"
            placeholder="e.g @sarahs_couture"
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

        <ContinueButton
          onClick={onComplete}
          label={isSubmitting ? "Saving..." : "Continue"}
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
}
