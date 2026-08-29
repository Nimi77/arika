"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BusinessInfoStep from "./components/BusinessInfoStep";
import BusinessFootprintStep from "./components/BusinessFootprintStep";
import LinkPlatformsStep from "./components/LinkPlatformsStep";
import CompleteStep from "./components/CompleteStep";

export type Step = 1 | 2 | 3 | 4;

export default function BusinessSetupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);

  function goToStep(step: Step) {
    setCurrentStep(step);
  }

  return (
    <div className="flex flex-col items-center text-center mr-4 ml-2 lg:mx-0 w-full">
      {currentStep === 1 && <BusinessInfoStep onComplete={() => goToStep(2)} />}
      {currentStep === 2 && (
        <BusinessFootprintStep onComplete={() => goToStep(3)} />
      )}
      {currentStep === 3 && (
        <LinkPlatformsStep onComplete={() => goToStep(4)} />
      )}
      {currentStep === 4 && (
        <CompleteStep onComplete={() => router.push("/dashboard")} />
      )}
    </div>
  );
}
