"use client";

import { useState } from "react";

import TextField from "@/app/business/setup/components/TextField";
import { SquarePen, Trash } from "lucide-react";
import { apiFetch } from "@/lib/api";

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

type DeliveryLocation = {
  id: string;
  region: string;
  cost: string;
  timeline: string;
};

// real endpoints here
const FAQ_ENDPOINT = "";
const LOCATION_ENDPOINT = "";
const KNOWLEDGE_BASE_ENDPOINT = "";

export default function Knowledge() {
  const [operatingHours, setOperatingHours] = useState("");
  const [paymentMethods, setPaymentMethods] = useState("");
  const [returnsPolicy, setReturnsPolicy] = useState("");

  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "Do you do wholesale?",
      answer: "Yes, wholesale starts at 12 pieces.",
    },
  ]);

  const [locations, setLocations] = useState<DeliveryLocation[]>([
    {
      id: "1",
      region: "Lagos Island",
      cost: "₦3,500",
      timeline: "1-2 Working Days",
    },
  ]);

  const [showFaqModal, setShowFaqModal] = useState(false);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [isEditingFaq, setIsEditingFaq] = useState(false);
  const [isSavingFaq, setIsSavingFaq] = useState(false);

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationAddress, setLocationAddress] = useState("");
  const [deliveryCost, setDeliveryCost] = useState("");
  const [estimatedTimeline, setEstimatedTimeline] = useState("");
  const [isSavingLocation, setIsSavingLocation] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingType, setDeletingType] = useState<"faq" | "location" | null>(
    null,
  );

  const [isSavingChanges, setIsSavingChanges] = useState(false);

  function handleEditFaq(faq: FAQ) {
    setEditingFaqId(faq.id);
    setFaqQuestion(faq.question);
    setFaqAnswer(faq.answer);
    setIsEditingFaq(true);
    setShowFaqModal(true);
  }

  async function handleSaveFaq() {
    if (!faqQuestion.trim() || !faqAnswer.trim()) return;

    setIsSavingFaq(true);

    try {
      const newFaq: FAQ = {
        id: crypto.randomUUID(),
        question: faqQuestion.trim(),
        answer: faqAnswer.trim(),
      };

      if (FAQ_ENDPOINT) {
        await apiFetch(FAQ_ENDPOINT, {
          method: "POST",
          body: JSON.stringify({
            question: newFaq.question,
            answer: newFaq.answer,
          }),
        });
      }

      setFaqs((currentFaqs) => {
        if (editingFaqId) {
          return currentFaqs.map((faq) =>
            faq.id === editingFaqId
              ? {
                  ...faq,
                  question: faqQuestion.trim(),
                  answer: faqAnswer.trim(),
                }
              : faq,
          );
        }

        return [...currentFaqs, newFaq];
      });

      setFaqQuestion("");
      setFaqAnswer("");
      setShowFaqModal(false);

      setEditingFaqId(null);
      setIsEditingFaq(false);
    } catch {
      // error message
    } finally {
      setIsSavingFaq(false);
    }
  }

  async function handleSaveLocation() {
    if (
      !locationAddress.trim() ||
      !deliveryCost.trim() ||
      !estimatedTimeline.trim()
    ) {
      return;
    }

    setIsSavingLocation(true);

    try {
      const newLocation: DeliveryLocation = {
        id: crypto.randomUUID(),
        region: locationAddress.trim(),
        cost: deliveryCost.trim(),
        timeline: estimatedTimeline.trim(),
      };

      if (LOCATION_ENDPOINT) {
        await apiFetch(LOCATION_ENDPOINT, {
          method: "POST",
          body: JSON.stringify({
            region: newLocation.region,
            cost: newLocation.cost,
            timeline: newLocation.timeline,
          }),
        });
      }

      setLocations((currentLocations) => [...currentLocations, newLocation]);

      setLocationAddress("");
      setDeliveryCost("");
      setEstimatedTimeline("");
      setShowLocationModal(false);
    } catch {
      // error message
    } finally {
      setIsSavingLocation(false);
    }
  }

  async function handleDeleteFaq(id: string) {
    setDeletingId(id);
    setDeletingType("faq");

    try {
      // DELETE endpoint
      // await apiFetch(`${FAQ_ENDPOINT}/${id}`, {
      //   method: "DELETE",
      // });

      setFaqs((currentFaqs) => currentFaqs.filter((faq) => faq.id !== id));
    } catch {
      // error message
    } finally {
      setDeletingId(null);
      setDeletingType(null);
    }
  }

  async function handleDeleteLocation(id: string) {
    setDeletingId(id);
    setDeletingType("location");

    try {
      //  DELETE endpoint here when available.
      // await apiFetch(`${LOCATION_ENDPOINT}/${id}`, {
      //   method: "DELETE",
      // });

      setLocations((currentLocations) =>
        currentLocations.filter((location) => location.id !== id),
      );
    } catch {
      // Add your preferred error message here.
    } finally {
      setDeletingId(null);
      setDeletingType(null);
    }
  }

  async function handleSaveChanges() {
    setIsSavingChanges(true);

    try {
      if (KNOWLEDGE_BASE_ENDPOINT) {
        await apiFetch(KNOWLEDGE_BASE_ENDPOINT, {
          method: "PUT",
          body: JSON.stringify({
            operatingHours,
            paymentMethods,
            returnsPolicy,
            faqs,
            locations,
          }),
        });
      }
    } catch {
      // Add your preferred error message here.
    } finally {
      setIsSavingChanges(false);
    }
  }

  return (
    <div className="campaigns">
      <div className="mb-10 space-y-4">
        <h1 className="text-2xl font-black text-(--color-text) lg:mt-auto">
          Knowledge Base
        </h1>

        <p
          id="knowledge-tip"
          className="rounded-3xl bg-(--color-bg-surface) px-4 py-3 text-xs"
        >
          <span className="font-bold">Tip: </span>
          Train Arika exactly how you want it to sound. The clearer your
          policies and answers, the better the AI will handle your customer
          chats.
        </p>
      </div>

      <div className="space-y-4">
        {/* Business Rules */}
        <section
          aria-labelledby="business-rules-heading"
          className="flex flex-col gap-6 rounded-[40px] bg-(--color-bg-surface) px-6 py-5"
        >
          <div>
            <h2
              id="business-rules-heading"
              className="text-lg font-bold text-(--color-text)"
            >
              Business Rules & Policies
            </h2>

            <p className="text-sm text-(--color-text-subtle)">
              Set clear boundaries for refunds, payments, and general business
              information.
            </p>
          </div>

          <div className="business-rules-field flex flex-col items-center gap-4">
            <TextField
              id="operating-hours"
              label="Operating Hours & General Info"
              placeholder="e.g. We are an online-only store open Monday to Saturday, 9 AM to 6 PM."
              value={operatingHours}
              onChange={setOperatingHours}
            />

            <TextField
              id="payment-methods"
              label="Accepted payment methods"
              placeholder="e.g. We accept bank transfers to GTBank (Acct: 0123456789) and card payments via Paystack."
              value={paymentMethods}
              onChange={setPaymentMethods}
            />

            <TextField
              id="returns-policy"
              label="Returns & Exchanges"
              placeholder="e.g. No cash refunds, exchanges within 48 hours"
              value={returnsPolicy}
              onChange={setReturnsPolicy}
            />
          </div>
        </section>

        {/* Delivery Information */}
        <section
          aria-labelledby="delivery-heading"
          className="flex flex-col gap-6 rounded-[40px] bg-(--color-bg-surface) px-6 py-5"
        >
          <div>
            <h2
              id="delivery-heading"
              className="text-lg font-bold text-(--color-text)"
            >
              Delivery Information
            </h2>

            <p className="text-sm text-(--color-text-subtle)">
              Define your delivery zones, rates, and timelines.
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            {locations.map((location) => (
              <div
                key={location.id}
                className="flex w-full justify-between rounded-3xl bg-(--color-bg-base) p-4"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold">{location.region}</p>

                  <span className="text-xs text-(--color-text-subtle)">
                    {location.cost} • {location.timeline}
                  </span>
                </div>

                <button
                  type="button"
                  aria-label={`Delete ${location.region} location`}
                  onClick={() => handleDeleteLocation(location.id)}
                  disabled={
                    deletingId === location.id && deletingType === "location"
                  }
                  className="m-auto text-(--color-text-subtle) transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingId === location.id && deletingType === "location" ? (
                    <span className="text-xs">Deleting...</span>
                  ) : (
                    <Trash size={20} />
                  )}
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => setShowLocationModal(true)}
              className="w-max rounded-full bg-(--color-action-primary) px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-(--color-action-primary-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary)"
            >
              Add Another Location
            </button>

            {showLocationModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="location-modal-heading"
              >
                <div className="w-full max-w-xl rounded-[48px] bg-(--color-bg-base) px-6 py-8">
                  <h3
                    id="location-modal-heading"
                    className="mb-5 text-lg font-bold text-(--color-text)"
                  >
                    New Delivery Zone
                  </h3>

                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="region"
                        className="text-sm font-semibold text-(--color-text-subtle)"
                      >
                        State, City, or Region
                      </label>

                      <input
                        id="region"
                        type="text"
                        value={locationAddress}
                        onChange={(e) => setLocationAddress(e.target.value)}
                        placeholder="e.g. Lagos Mainland"
                        className="w-full rounded-full border border-transparent bg-(--color-bg-surface) px-5 py-3 text-sm text-(--color-text) outline-none focus:border-(--color-action-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary)"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="cost"
                        className="text-sm font-semibold text-(--color-text-subtle)"
                      >
                        Delivery Cost
                      </label>

                      <input
                        id="cost"
                        type="text"
                        value={deliveryCost}
                        onChange={(e) => setDeliveryCost(e.target.value)}
                        placeholder="2,500"
                        className="w-full rounded-full border border-transparent bg-(--color-bg-surface) px-5 py-3 text-sm text-(--color-text) outline-none focus:border-(--color-action-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary)"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="timeline"
                        className="text-sm font-semibold text-(--color-text-subtle)"
                      >
                        Estimated Timeline
                      </label>

                      <input
                        id="timeline"
                        type="text"
                        value={estimatedTimeline}
                        onChange={(e) => setEstimatedTimeline(e.target.value)}
                        placeholder="e.g. 1-2 Working Days"
                        className="w-full rounded-full border border-transparent bg-(--color-bg-surface) px-5 py-3 text-sm text-(--color-text) outline-none focus:border-(--color-action-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary)"
                      />
                    </div>

                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={() => setShowLocationModal(false)}
                        disabled={isSavingLocation}
                        className="w-full rounded-full px-5 py-3 text-sm font-semibold text-(--color-text-secondary) bg-(--color-bg-surface) transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary) sm:w-auto sm:bg-transparent sm:hover:bg-(--color-bg-surface)"
                      >
                        Close
                      </button>

                      <button
                        type="button"
                        onClick={handleSaveLocation}
                        disabled={
                          isSavingLocation ||
                          !locationAddress.trim() ||
                          !deliveryCost.trim() ||
                          !estimatedTimeline.trim()
                        }
                        className="w-full rounded-full bg-(--color-action-primary) px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-(--color-action-primary-hover) disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                      >
                        {isSavingLocation ? "Saving..." : "Save Location"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FAQs */}
        <section
          aria-labelledby="faq-heading"
          className="flex flex-col gap-6 rounded-[40px] bg-(--color-bg-surface) px-6 py-5"
        >
          <div>
            <h2
              id="faq-heading"
              className="text-lg font-bold text-(--color-text)"
            >
              Frequently Asked Questions
            </h2>

            <p className="text-sm text-(--color-text-subtle)">
              Add the exact questions your customers ask most often, and Arika&apos;s
              approved answers.
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="w-full space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="w-full rounded-3xl bg-(--color-bg-base) p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-(--color-text)">
                        {faq.question}
                      </p>

                      <p className="mt-1 text-xs text-(--color-text-subtle)">
                        {faq.answer}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center">
                      <button
                        type="button"
                        aria-label={`Edit ${faq.question} FAQ`}
                        onClick={() => handleEditFaq(faq)}
                        className="m-auto mr-2 text-(--color-text-subtle) transition-colors hover:text-(--color-text)"
                      >
                        <SquarePen size={20} />
                      </button>

                      <button
                        type="button"
                        aria-label={`Delete ${faq.question} FAQ`}
                        onClick={() => handleDeleteFaq(faq.id)}
                        disabled={
                          deletingId === faq.id && deletingType === "faq"
                        }
                        className="m-auto text-(--color-text-subtle) transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === faq.id && deletingType === "faq" ? (
                          <span className="text-xs">Deleting...</span>
                        ) : (
                          <Trash size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingFaqId(null);
                setIsEditingFaq(false);
                setFaqQuestion("");
                setFaqAnswer("");
                setShowFaqModal(true);
              }}
              className="w-max rounded-full bg-(--color-action-primary) px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-(--color-action-primary-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary)"
            >
              Add New FAQ
            </button>

            {showFaqModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="faq-modal-heading"
              >
                <div className="w-full max-w-xl rounded-[42px] bg-(--color-bg-base) px-6 py-8">
                  <h3
                    id="faq-modal-heading"
                    className="mb-5 text-lg font-bold text-(--color-text)"
                  >
                    {isEditingFaq ? "Edit FAQ Rule" : "New FAQ Rule"}
                  </h3>

                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="faq-question"
                        className="text-sm font-semibold text-(--color-text-subtle)"
                      >
                        Customer Question / Keyword
                      </label>

                      <input
                        id="faq-question"
                        type="text"
                        value={faqQuestion}
                        onChange={(e) => setFaqQuestion(e.target.value)}
                        placeholder="e.g. Do you sell wholesale?"
                        className="w-full rounded-full border border-transparent bg-(--color-bg-surface) px-5 py-3 text-sm text-(--color-text) outline-none focus:border-(--color-action-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary)"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="faq-answer"
                        className="text-sm font-semibold text-(--color-text-subtle)"
                      >
                        Arika&apos;s Approved Answer
                      </label>

                      <input
                        id="faq-answer"
                        type="text"
                        value={faqAnswer}
                        onChange={(e) => setFaqAnswer(e.target.value)}
                        placeholder="e.g. Yes, the minimum order is 12 pieces. Send a DM to get our wholesale rate card."
                        className="w-full rounded-full border border-transparent bg-(--color-bg-surface) px-5 py-3 text-sm text-(--color-text) outline-none focus:border-(--color-action-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary)"
                      />
                    </div>
                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={() => setShowFaqModal(false)}
                        disabled={isSavingFaq}
                        className="w-full rounded-full px-5 py-4 text-sm font-semibold text-(--color-text-secondary) bg-(--color-bg-surface) transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:bg-transparent sm:hover:bg-(--color-bg-surface) sm:py-3"
                      >
                        Close
                      </button>

                      <button
                        type="button"
                        onClick={handleSaveFaq}
                        disabled={
                          isSavingFaq ||
                          !faqQuestion.trim() ||
                          !faqAnswer.trim()
                        }
                        className="w-full rounded-full bg-(--color-action-primary) px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-(--color-action-primary-hover) disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-3"
                      >
                        {isSavingFaq
                          ? "Saving..."
                          : isEditingFaq
                            ? "Update FAQ"
                            : "Save FAQ"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <button
        type="button"
        onClick={handleSaveChanges}
        disabled={isSavingChanges}
        className="mt-10 w-full rounded-full bg-(--color-action-primary) py-4 text-sm font-semibold text-white transition-colors hover:bg-(--color-action-primary-hover) disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary)"
      >
        {isSavingChanges ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
