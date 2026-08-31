"use client";

import { useState, useRef } from "react";
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
      className={`rounded-full px-2 py-3 text-xs text-center transition-colors border ${
        selected
          ? "border-(--color-action-primary) bg-(--color-surface) text-(--color-action-primary)"
          : "border-transparent bg-(--color-bg-surface) text-(--color-text-subtle) hover:border-(--color-action-primary)"
      }`}
    >
      {label}
    </button>
  );
}

type FieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
};

function TextField({ label, placeholder, value, onChange }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs text-left font-semibold text-(--color-secondary)">
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

type BusinessInfoStepProps = {
  businessName: string;
  setBusinessName: (v: string) => void;
  businessCategory: string | null;
  setBusinessCategory: (v: string) => void;
  phoneNumber: string | undefined;
  setPhoneNumber: (v: string | undefined) => void;
  setLogoFile: (f: File | null) => void;
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

  const canComplete = !!businessCategory && !!businessName && !!phoneNumber;

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  }

  return (
    <div className="px-3 sm:px-6 lg:px-0">
      <h1 className="lg:text-[32px] text-[24px] mt-6 text-(--color-text) text-left sm:text-3xl font-black lg:text-center">
        Tell us about your business
      </h1>
      <p className="mb-6 lg:text-sm text-[12px] text-neutral-500 tracking-wide text-left lg:text-center max-w-xs sm:max-w-sm">
        Let's set up your profile so Arika knows exactly who it is representing.
      </p>

      <StepCircles step={1} />

      <div className="w-full max-w-md mt-2">
        <div className="flex flex-col gap-5">
          <div className="relative mx-auto w-full max-w-[452px] h-[122px] rounded-[36px] bg-(--color-bg-surface) flex items-center justify-center overflow-hidden">
            {logoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoPreview}
                alt="Business logo preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs text-primary mt-4">
                Tap to upload logo
              </span>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute center top-5 flex items-center rounded-full bg-white text-neutral-900 text-xs font-semibold px-4 py-2 shadow-sm hover:bg-neutral-100 transition-colors"
            >
              <AiOutlineCloudUpload className="mr-2" size={20} />
              Upload
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
          </div>

          <div className="text-left">
            <TextField
              label="Business name"
              placeholder="Sarah's fashion Hub"
              value={businessName}
              onChange={setBusinessName}
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full text-left">
            <label className="text-xs font-semibold text-(--color-secondary)">
              Business Phone number
            </label>
            <PhoneInput
              international
              defaultCountry="NG"
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="+234 801 234 5678"
              className="custom-phone-input"
            />
          </div>

          <div className="text-left">
            <h2 className="text-xs font-semibold text-(--color-secondary) mb-3">
              What industry are you in?
            </h2>
            <div className="grid grid-cols-2 gap-3">
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

          <TextField
            label="Standard Delivery Fee"
            placeholder="N3,500"
            value={deliveryFee}
            onChange={setDeliveryFee}
          />
          <TextField
            label="Accepted Payment Methods"
            placeholder="e.g Bank transfer to GTBank or card via PayStack"
            value={paymentMethods}
            onChange={setPaymentMethods}
          />
          <TextField
            label="Returns & Exchanges"
            placeholder="e.g No cash refunds, Exchanges are allowed within 48 hours"
            value={returnsPolicy}
            onChange={setReturnsPolicy}
          />
        </div>

        <ContinueButton
          onClick={onComplete}
          label="Continue"
          disabled={!canComplete}
        />
      </div>
    </div>
  );
}
