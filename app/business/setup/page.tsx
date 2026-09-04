"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BusinessInfoStep from "./components/BusinessInfoStep";
import BusinessFootprintStep from "./components/BusinessFootprintStep";
import LinkPlatformsStep from "./components/LinkPlatformsStep";
import CompleteStep, { FAQ } from "./components/CompleteStep";
import { apiFetch } from "@/lib/api";

export type Step = 1 | 2 | 3 | 4;

export default function BusinessSetupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);

  // Shared business-setup data across steps 1 and 2
  const [businessName, setBusinessName] = useState("");
  const [businessCategory, setBusinessCategory] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [description, setDescription] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const [paymentMethods, setPaymentMethods] = useState("");
  const [returnsPolicy, setReturnsPolicy] = useState("");

  const [instagramHandle, setInstagramHandle] = useState("");
  const [facebookHandle, setFacebookHandle] = useState("");

  const [instagramConnected, setInstagramConnected] = useState(false);
  const [whatsappConnected, setWhatsappConnected] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function goToStep(step: Step) {
    setCurrentStep(step);
  }

  async function submitBusinessSetup(finalFAQs: FAQ[]) {
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("businessName", businessName);
      formData.append("industry", businessCategory ?? "");
      formData.append("phone", phoneNumber ?? "");
      formData.append("description", description);
      formData.append("businessHours", operatingHours);
      formData.append("website", websiteUrl);
      formData.append("paymentMethods", paymentMethods);
      formData.append("returnsPolicy", returnsPolicy);
      formData.append("instagram", instagramHandle);
      formData.append("facebook", facebookHandle);

      formData.append("instagramConnected", String(instagramConnected));
      formData.append("whatsappConnected", String(whatsappConnected));

      formData.append("faqs", JSON.stringify(finalFAQs));

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      await apiFetch("/business/setup", {
        method: "POST",
        headers: {},
        body: formData,
      });

      router.push("/dashboard");
    } catch (err) {
      setSubmitError("We couldn't save your business setup. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex w-full flex-col items-center py-10">
      {currentStep === 1 && (
        <BusinessInfoStep
          businessName={businessName}
          setBusinessName={setBusinessName}
          businessCategory={businessCategory}
          setBusinessCategory={setBusinessCategory}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setLogoFile={setLogoFile}
          paymentMethods={paymentMethods}
          setPaymentMethods={setPaymentMethods}
          returnsPolicy={returnsPolicy}
          setReturnsPolicy={setReturnsPolicy}
          onComplete={() => goToStep(2)}
        />
      )}
      {currentStep === 2 && (
        <BusinessFootprintStep
          description={description}
          setDescription={setDescription}
          operatingHours={operatingHours}
          setOperatingHours={setOperatingHours}
          websiteUrl={websiteUrl}
          setWebsiteUrl={setWebsiteUrl}
          instagramHandle={instagramHandle}
          setInstagramHandle={setInstagramHandle}
          facebookHandle={facebookHandle}
          setFacebookHandle={setFacebookHandle}
          isSubmitting={isSubmitting}
          onComplete={() => goToStep(3)}
        />
      )}
      {currentStep === 3 && (
        <LinkPlatformsStep
          onComplete={() => goToStep(4)}
          isSubmitting={isSubmitting}
          initialInstagramConnected={instagramConnected}
          initialWhatsAppConnected={whatsappConnected}
          onInstagramConnected={setInstagramConnected}
          onWhatsAppConnected={setWhatsappConnected}
        />
      )}
      {currentStep === 4 && (
        <CompleteStep
          onComplete={submitBusinessSetup}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onClearSubmitError={() => setSubmitError(null)}
        />
      )}
    </div>
  );
}
