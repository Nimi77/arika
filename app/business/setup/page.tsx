"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BusinessInfoStep from "./components/BusinessInfoStep";
import BusinessFootprintStep from "./components/BusinessFootprintStep";
import LinkPlatformsStep from "./components/LinkPlatformsStep";
import CompleteStep from "./components/CompleteStep";
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
  const [instagramHandle, setInstagramHandle] = useState("");
  const [facebookHandle, setFacebookHandle] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function goToStep(step: Step) {
    setCurrentStep(step);
  }

  async function submitBusinessSetup() {
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
      formData.append("instagram", instagramHandle);
      formData.append("facebook", facebookHandle);
      if (logoFile) {
        formData.append("logo", logoFile);
      }

      await apiFetch("/business/setup", {
        method: "POST",
        headers: {}, // let the browser set multipart boundary itself
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
    <div className="flex flex-col items-center text-center w-full">
      {submitError && (
        <p className="text-xs text-red-600 mb-3" role="alert">
          {submitError}
        </p>
      )}

      {currentStep === 1 && (
        <BusinessInfoStep
          businessName={businessName}
          setBusinessName={setBusinessName}
          businessCategory={businessCategory}
          setBusinessCategory={setBusinessCategory}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setLogoFile={setLogoFile}
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
          isSubmitting={false}
          onComplete={() => goToStep(3)}
        />
      )}
      {currentStep === 3 && (
        <LinkPlatformsStep onComplete={() => goToStep(4)} />
      )}
      {currentStep === 4 && <CompleteStep onComplete={submitBusinessSetup} />}
    </div>
  );
}
