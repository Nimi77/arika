"use client";

import { useState } from "react";
import ContinueButton from "./ContinueButton";
import StepCircles from "./StepCircles";

type FieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
};

function TextField({ label, placeholder, value, onChange }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      <label className="text-xs font-semibold text-(--color-secondary)">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none rounded-[28px] bg-(--color-bg-surface) px-4 py-3 text-sm text-(--color-text) placeholder:text-neutral-500 outline-none border border-transparent focus:border-(--color-action-primary) transition-colors"
      />
    </div>
  );
}

export default function CompleteStep({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function handleAddMore() {
    // append current FAQ to a list, clear fields for the next one
  }

  function handleContinue() {
    onComplete();
  }

  return (
    <>
      <h1 className="lg:text-[32px] text-[24px] mt-6 text-(--color-text) sm:text-3xl font-black text-left lg:text-center">
        Teach Arika the basics
      </h1>
      <p className="mb-6 lg:text-sm text-[12px] text-neutral-500 text-left lg:text-center max-w-xs sm:max-w-sm">
        Give Arika the core rules it needs to start answering customers
        accurately.
      </p>

      <StepCircles step={4} />

      <div className="w-full max-w-md mt-2">
        <div className="flex flex-col gap-5">
          <TextField
            label="What is your most frequently asked question?"
            placeholder="e.g., Do you do nationwide delivery? or Do you sell wholesale?"
            value={question}
            onChange={setQuestion}
          />

          <div className="flex flex-col gap-1.5 text-left">
            <TextField
              label="Your Preferred Answer"
              placeholder="e.g., Yes, wholesale starts at 12 pieces. Send a DM for the rate card"
              value={answer}
              onChange={setAnswer}
            />
            <p className="text-xs text-neutral-500">
              Arika will use this to automatically reply whenever a customer
              asks something similar. Don't worry, you can easily add more FAQs
              from your dashboard
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center  mt-8">
          <button
            type="button"
            onClick={handleAddMore}
            className="rounded-full border mt-6 mb-4 bg-(--color-action-primary) text-(--color-text-on-primary) text-sm font-semibold px-5 py-3 hover:bg-(--color-action-primary) hover:text-white transition-colors"
          >
            Add More
          </button>
          <ContinueButton
            onClick={handleContinue}
            fullWidth={false}
            label="Continue"
          />
        </div>
      </div>
    </>
  );
}
