"use client";

import { useState } from "react";

import ContinueButton from "./ContinueButton";
import StepCircles from "./StepCircles";
import TextField from "./TextField";

export type FAQ = {
  question: string;
  answer: string;
};

type CompleteStepProps = {
  onComplete: (faqs: FAQ[]) => void;
  isSubmitting?: boolean;
  submitError?: string | null;
  onClearSubmitError?: () => void;
};

export default function CompleteStep({
  onComplete,
  isSubmitting = false,
  submitError,
  onClearSubmitError,
}: CompleteStepProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [error, setError] = useState("");

  function validateFAQ() {
    if (!question.trim() || !answer.trim()) {
      setError("Please provide both a question and an answer.");
      return false;
    }

    setError("");
    return true;
  }

  function handleAddMore() {
    if (!validateFAQ()) return;

    setFaqs((currentFAQs) => [
      ...currentFAQs,
      {
        question: question.trim(),
        answer: answer.trim(),
      },
    ]);

    setQuestion("");
    setAnswer("");
  }

  function handleContinue() {
    // If there is text in either field, validate and include it.
    if (question.trim() || answer.trim()) {
      if (!validateFAQ()) return;

      const finalFAQs = [
        ...faqs,
        {
          question: question.trim(),
          answer: answer.trim(),
        },
      ];

      onComplete(finalFAQs);
      return;
    }

    // No current FAQ was entered.
    // Require at least one FAQ before completing setup.
    if (faqs.length === 0) {
      setError("Please add at least one FAQ before continuing.");
      return;
    }

    // Current fields are empty, but previously added FAQs exist.
    onComplete(faqs);
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
          mx-auto flex flex-col
          items-center gap-1 text-center
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
          Teach Arika the Basics
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

      {/* FAQ form */}
      <div className="mx-auto w-full">
        <div className="flex flex-col gap-5">
          <TextField
            id="frequently-asked-question"
            label="What is your most frequently asked question?"
            placeholder="e.g., Do you do nationwide delivery?"
            value={question}
            onChange={(value) => {
              setQuestion(value);
              setError("");
              onClearSubmitError?.();
            }}
          />
          <TextField
            id="preferred-answer"
            label="Your Preferred Answer"
            placeholder="e.g., Yes, wholesale starts at 12 pieces. Send a DM for the rate card."
            value={answer}
            onChange={(value) => {
              setAnswer(value);
              setError("");
              onClearSubmitError?.();
            }}
          />

          {error && (
            <p
              role="alert"
              className="text-sm text-red-600 dark:text-(--color-text-error)"
            >
              {error}
            </p>
          )}
        </div>

        {/* Added FAQs */}
        {faqs.length > 0 && (
          <div className="mt-5 flex flex-col gap-2 text-left">
            <p className="text-sm font-semibold text-(--color-text)">
              {faqs.length} FAQ{faqs.length > 1 ? "s" : ""} added
            </p>

            <div className="flex flex-col gap-2">
              {faqs.map((faq, index) => (
                <div
                  key={`${faq.question}-${index}`}
                  className="
                    rounded-2xl
                    bg-(--color-bg-surface)
                    px-4 py-3
                  "
                >
                  <p className="text-sm font-semibold text-(--color-text)">
                    {faq.question}
                  </p>

                  <p className="mt-1 text-sm text-(--color-text-subtle)">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* submit error */}
        {submitError && (
          <div
            role="alert"
            className="mt-5 text-sm text-red-600 mb-3 dark:text-(--color-text-error)"
          >
            {submitError}
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddMore}
            disabled={isSubmitting}
            className="
              rounded-full
              border border-(--color-action-primary)
              px-5 py-3
              text-sm font-semibold
              text-(--color-action-primary)
              transition-colors
              hover:bg-(--color-action-primary)
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Add FAQ
          </button>

          <ContinueButton
            onClick={handleContinue}
            fullWidth={false}
            label={isSubmitting ? "Saving..." : "Continue"}
          />
        </div>
      </div>
    </section>
  );
}
