"use client";

import ContinueButton from "./ContinueButton";
import StepCircles from "./StepCircles";

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  large?: boolean;
};

function TextField({
  id,
  label,
  placeholder,
  value,
  onChange,
  large,
}: FieldProps) {
  return (
    <div className="flex w-full flex-col gap-1.5 text-left">
      <label
        htmlFor={id}
        className={`font-semibold text-(--color-secondary) ${
          large ? "text-sm sm:text-base" : "text-sm"
        }`}
      >
        {label}
      </label>

      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          min-h-11 w-full
          rounded-full
          border border-transparent
          bg-(--color-bg-surface)
          px-4 py-3
          text-sm text-(--color-text)
          placeholder:text-neutral-500
          outline-none
          transition-colors
          focus:border-(--color-action-primary)
        "
      />
    </div>
  );
}

function TextAreaField({
  id,
  label,
  placeholder,
  value,
  onChange,
  large,
}: FieldProps) {
  return (
    <div className="flex w-full flex-col gap-1.5 text-left">
      <label
        htmlFor={id}
        className={`font-semibold text-(--color-secondary) ${
          large ? "text-sm sm:text-base" : "text-sm"
        }`}
      >
        {label}
      </label>

      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="
          min-h-28 w-full
          resize-none
          rounded-[28px]
          border border-transparent
          bg-(--color-bg-surface)
          px-4 py-3
          text-sm text-(--color-text)
          placeholder:text-neutral-500
          outline-none
          transition-colors
          focus:border-(--color-action-primary)
        "
      />
    </div>
  );
}

type BusinessFootprintStepProps = {
  description: string;
  setDescription: (value: string) => void;

  operatingHours: string;
  setOperatingHours: (value: string) => void;

  websiteUrl: string;
  setWebsiteUrl: (value: string) => void;

  instagramHandle: string;
  setInstagramHandle: (value: string) => void;

  facebookHandle: string;
  setFacebookHandle: (value: string) => void;

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
    <section
      aria-labelledby="business-footprint-heading"
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
          id="business-footprint-heading"
          className="
            text-2xl font-black leading-tight
            text-(--color-text)
            sm:text-3xl
            lg:text-4xl
          "
        >
          Your business footprint
        </h1>

        <p className="max-w-md text-sm leading-6 text-(--color-text-subtle) sm:text-base">
          Add your operating details and where customers can find you online.
          Optional but recommended.
        </p>
      </div>

      {/* Step indicator */}
      <div className="my-6 sm:my-8 lg:my-10">
        <StepCircles step={2} />
      </div>

      {/* Form content */}
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Business description */}
          <TextAreaField
            id="business-description"
            label="Business description"
            placeholder="e.g. We sell premium, locally sourced jewelry and accessories for women."
            value={description}
            onChange={setDescription}
            large
          />

          {/* Operating hours */}
          <TextField
            id="operating-hours"
            label="Operating hours"
            placeholder="e.g. Mon - Sat, 9:00 AM to 6:00 PM"
            value={operatingHours}
            onChange={setOperatingHours}
          />

          {/* Website */}
          <TextField
            id="website-url"
            label="Website URL"
            placeholder="e.g. www.sarahscouture.com"
            value={websiteUrl}
            onChange={setWebsiteUrl}
          />

          {/* Instagram */}
          <TextField
            id="instagram-handle"
            label="Instagram handle"
            placeholder="e.g. @sarahs_couture"
            value={instagramHandle}
            onChange={setInstagramHandle}
          />

          {/* Facebook */}
          <TextField
            id="facebook-handle"
            label="Facebook handle"
            placeholder="e.g. Sarah Fashion Couture"
            value={facebookHandle}
            onChange={setFacebookHandle}
          />
        </div>

        {/* Continue */}
        <div className="mt-7 sm:mt-8">
          <ContinueButton
            onClick={onComplete}
            label={isSubmitting ? "Saving..." : "Continue"}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </section>
  );
}
