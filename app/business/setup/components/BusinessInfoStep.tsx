"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AiOutlineCloudUpload } from "react-icons/ai";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import ContinueButton from "./ContinueButton";
import StepCircles from "./StepCircles";

const BUSINESS_CATEGORIES = [
  "Fashion & Apparel",
  "Beauty & personal care",
  "Electronics & gadgets",
  "Food & beverages",
  "Professional services",
  "Other",
];

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
      className={`
        min-h-11 rounded-full border px-3 py-3
        text-center text-xs font-medium
        transition-colors duration-200
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-(--color-action-primary)
        focus-visible:ring-offset-2
        ${
          selected
            ? "border-(--color-action-primary) bg-(--color-surface) text-(--color-action-primary)"
            : "border-transparent bg-(--color-bg-surface) text-(--color-text-subtle) hover:border-(--color-action-primary)"
        }
      `}
    >
      {label}
    </button>
  );
}

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

function TextField({ id, label, placeholder, value, onChange }: FieldProps) {
  return (
    <div className="flex w-full flex-col gap-1.5 text-left">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-(--color-secondary)"
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
          px-4 py-3
          outline-none
          transition-colors
          hover:border-(--color-action-primary)
          focus:border-(--color-action-primary)    
        "
      />
    </div>
  );
}

type BusinessInfoStepProps = {
  businessName: string;
  setBusinessName: (value: string) => void;

  businessCategory: string | null;
  setBusinessCategory: (value: string) => void;

  phoneNumber: string | undefined;
  setPhoneNumber: (value: string | undefined) => void;

  setLogoFile: (file: File | null) => void;

  onComplete: () => void;
};

export default function BusinessInfoStep({
  businessName,
  setBusinessName,
  businessCategory,
  setBusinessCategory,
  phoneNumber,
  setPhoneNumber,
  setLogoFile,
  onComplete,
}: BusinessInfoStepProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [deliveryFee, setDeliveryFee] = useState("");
  const [paymentMethods, setPaymentMethods] = useState("");
  const [returnsPolicy, setReturnsPolicy] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const canComplete =
    businessName.trim() !== "" &&
    Boolean(businessCategory) &&
    Boolean(phoneNumber);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLogoFile(file);

    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
  }

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  return (
    <section
      aria-labelledby="business-info-heading"
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
          mx-auto mb-6
          flex max-w-xl flex-col items-center
          gap-2 text-center
          sm:mb-8
          lg:mb-10
        "
      >
        <h1
          id="business-info-heading"
          className="
            text-2xl font-black leading-tight
            text-(--color-text)
            sm:text-3xl
            lg:text-4xl
          "
        >
          Tell us about your business
        </h1>

        <p className="max-w-md text-sm leading-6 text-(--color-text-subtle) sm:text-base">
          Let's set up your profile so Arika knows exactly who it is
          representing.
        </p>
      </div>

      {/* Step indicator */}
      <div className="mb-6 sm:mb-8">
        <StepCircles step={1} />
      </div>

      {/* Form content */}
      <div className="w-full">
        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Logo upload */}
          <div className="flex w-full flex-col gap-2">
            <div
              className="
                relative mx-auto flex
                h-32 w-full
                items-center justify-center
                overflow-hidden
                rounded-[28px]
                bg-(--color-bg-surface)
                sm:h-36
                sm:rounded-4xl
                lg:h-40
              "
            >
              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Business logo preview"
                  fill
                  sizes="(max-width: 640px) 100vw, 672px"
                  className="object-contain"
                />
              ) : (
                <div
                  className="
                    flex flex-col
                    items-center justify-center
                    gap-3
                    px-4
                    text-center
                  "
                >
                  <span className="text-xs text-(--color-text-subtle)">
                    Tap to upload to add your business logo
                  </span>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Upload business logo"
                    className="
                      flex items-center gap-2
                      rounded-full
                      bg-white
                      px-4 py-2.5
                      text-xs font-semibold
                      text-neutral-900
                      shadow-sm
                      transition-colors
                      hover:bg-neutral-100
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-(--color-action-primary)
                      focus-visible:ring-offset-2
                    "
                  >
                    <AiOutlineCloudUpload aria-hidden="true" size={20} />
                    Upload
                  </button>
                </div>
              )}

              {logoPreview && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Change business logo"
                  className="
                    absolute left-1/2 top-1/2
                    flex
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center gap-2
                    rounded-full
                    bg-white
                    px-4 py-2.5
                    text-xs font-semibold
                    text-neutral-900
                    shadow-sm
                    transition-colors
                    hover:bg-neutral-100
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-(--color-action-primary)
                    focus-visible:ring-offset-2
                  "
                >
                  <AiOutlineCloudUpload aria-hidden="true" size={20} />
                  Change
                </button>
              )}

              <input
                ref={fileInputRef}
                id="business-logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="sr-only"
                aria-label="Business logo"
              />
            </div>

            <p className="text-center text-xs text-(--color-text-subtle)">
              JPG, PNG or WebP recommended.
            </p>
          </div>

          {/* Business name */}
          <TextField
            id="business-name"
            label="Business name"
            placeholder="Sarah's Fashion Hub"
            value={businessName}
            onChange={setBusinessName}
          />

          {/* Business phone */}
          <div className="flex w-full flex-col gap-1.5 text-left">
            <label
              htmlFor="business-phone"
              className="text-sm font-semibold text-(--color-secondary)"
            >
              Business phone number
            </label>

            <PhoneInput
              id="business-phone"
              international
              defaultCountry="NG"
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="+234 801 234 5678"
              aria-label="Business phone number"
              className="custom-phone-input"
            />
          </div>

          {/* Business category */}
          <fieldset className="w-full text-left">
            <legend className="mb-3 text-sm font-semibold text-(--color-secondary)">
              What industry are you in?
            </legend>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {BUSINESS_CATEGORIES.map((category) => (
                <OptionButton
                  key={category}
                  label={category}
                  selected={businessCategory === category}
                  onClick={() => setBusinessCategory(category)}
                />
              ))}
            </div>
          </fieldset>

          {/* Additional business information */}
          <TextField
            id="delivery-fee"
            label="Standard delivery fee"
            placeholder="N3,500"
            value={deliveryFee}
            onChange={setDeliveryFee}
          />

          <TextField
            id="payment-methods"
            label="Accepted payment methods"
            placeholder="e.g. Bank transfer to GTBank or card via Paystack"
            value={paymentMethods}
            onChange={setPaymentMethods}
          />

          <TextField
            id="returns-policy"
            label="Returns & exchanges"
            placeholder="e.g. No cash refunds, exchanges within 48 hours"
            value={returnsPolicy}
            onChange={setReturnsPolicy}
          />
        </div>

        {/* Continue */}
        <div className="mt-7 sm:mt-8">
          <ContinueButton
            onClick={onComplete}
            label="Continue"
            // disabled={!canComplete}
          />
        </div>
      </div>
    </section>
  );
}
