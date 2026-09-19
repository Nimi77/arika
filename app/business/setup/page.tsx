"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BusinessInfoStep from "./components/BusinessInfoStep";
import BusinessFootprintStep from "./components/BusinessFootprintStep";
import LinkPlatformsStep from "./components/LinkPlatformsStep";
import CompleteStep from "./components/CompleteStep";
import { apiFetch } from "@/lib/api";
import { AnimatePresence, motion } from "motion/react";

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
  const [submitSuccess, setSubmitSuccess] = useState(false);

  function goToStep(step: Step) {
    setCurrentStep(step);
  }

  const stepVariants = {
    enter: {
      x: 40,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: -40,
      opacity: 0,
    },
  };

 async function submitBusinessSetup() {
   setSubmitError(null);
   setSubmitSuccess(false);
   setIsSubmitting(true);

   const minimumSavingTime = new Promise<void>((resolve) => {
     setTimeout(resolve, 2000);
   });

   try {
     const formattedWebsite = websiteUrl
       ? /^https?:\/\//i.test(websiteUrl)
         ? websiteUrl
         : `https://${websiteUrl}`
       : undefined;

     const payload: Record<string, string> = {
       businessName,
       industry: businessCategory ?? "",
       description,
     };

     if (formattedWebsite) {
       payload.website = formattedWebsite;
     }

     await Promise.all([
       apiFetch("/business/setup", {
         method: "POST",
         body: JSON.stringify(payload),
       }),
       minimumSavingTime,
     ]);

     if (logoFile) {
       const formData = new FormData();
       formData.append("logo", logoFile);

       try {
         await apiFetch("/business/logo", {
           method: "POST",
           body: formData,
         });
       } catch {
         setSubmitError(
           "Your business information was saved, but we couldn't upload your logo. You can try again later.",
         );
         setIsSubmitting(false);
         return;
       }
     }

     setSubmitSuccess(true);

     setTimeout(() => {
       router.push("/dashboard");
     }, 2000);
   } catch (err: unknown) {
     await minimumSavingTime;

     const apiError = err as {
       status?: number;
       body?: {
         message?: string | string[];
       };
     };

     const status = apiError.status;

     switch (status) {
       case 400:
         setSubmitError(
           "Please check your business information and make sure all required fields are correctly filled.",
         );
         break;

       case 401:
         setSubmitError(
           "Your session has expired. Please log in again to continue.",
         );
         break;

       case 403:
         setSubmitError(
           "You are not authorized to complete this business setup.",
         );
         break;

       case 409:
         setSubmitError("Your business setup has already been completed.");
         break;

       case 404:
         setSubmitError(
           "We couldn't find the business setup service. Please try again later.",
         );
         break;

       case 422:
         setSubmitError(
           "Some of the business information is invalid. Please review your details and try again.",
         );
         break;

       default:
         if (status && status >= 500) {
           setSubmitError(
             "Something went wrong on our server. Please try again in a moment.",
           );
         } else if (!status) {
           setSubmitError(
             "Unable to connect to the server. Please check your internet connection and try again.",
           );
         } else {
           setSubmitError(
             "Unable to save your business information. Please try again.",
           );
         }
     }
   } finally {
     setIsSubmitting(false);
   }
 }

  return (
    <div className="business-setup-page flex w-full flex-col items-center py-10">
      <div className="w-full overflow-x-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
            >
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
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-2"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
            >
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
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step-3"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
            >
              <LinkPlatformsStep
                onComplete={() => goToStep(4)}
                isSubmitting={isSubmitting}
                initialInstagramConnected={instagramConnected}
                initialWhatsAppConnected={whatsappConnected}
                onInstagramConnected={setInstagramConnected}
                onWhatsAppConnected={setWhatsappConnected}
              />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step-4"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="w-full"
            >
              <CompleteStep
                onComplete={submitBusinessSetup}
                isSubmitting={isSubmitting}
                submitError={submitError}
                submitSuccess={submitSuccess}
                onClearSubmitError={() => setSubmitError(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
