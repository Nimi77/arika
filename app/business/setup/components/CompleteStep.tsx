"use client";

import { useState } from "react";
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
    <section
      aria-labelledby="complete-setup-heading"
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
          id="complete-setup-heading"
          className="
            text-2xl font-black leading-tight
            text-(--color-text)
            sm:text-3xl
            lg:text-4xl
          "
        >
          Teach Arika the basics
        </h1>
        <p className="max-w-md text-sm leading-6 text-(--color-text-subtle) sm:text-base">
          Give Arika the core rules it needs to start answering customers
          accurately.
        </p>
      </div>

      {/* Step indicator */}
      <div className="my-6 sm:my-8 lg:my-10">
        <StepCircles step={4} />
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <div className="flex flex-col gap-5">
          <TextField
            id="frequently-asked-questions"
            label="What is your most frequently asked question?"
            placeholder="e.g., Do you do nationwide delivery? or Do you sell wholesale?"
            value={question}
            onChange={setQuestion}
          />

          <div className="flex flex-col gap-1.5 text-left">
            <TextField
              id="preferred-answer"
              label="Your Preferred Answer"
              placeholder="e.g., Yes, wholesale starts at 12 pieces. Send a DM for the rate card"
              value={answer}
              onChange={setAnswer}
            />
            <p className="text-sm text-(--color-text-subtle)">
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
    </section>
  );
}
