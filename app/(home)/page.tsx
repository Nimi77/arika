"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.svg";
import heroImg from "@/public/hero-img.png";
import { Menu } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { businesses, features, steps } from "./content";
import Link from "next/link";

// Shared background layer used by the hero and CTA sections.
function SectionBackgroundImage() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 block">
      <Image
        src={heroImg}
        alt=""
        aria-hidden="true"
        width={1445}
        height={788}
        className="h-full w-full object-cover opacity-40"
      />
    </div>
  );
}

export default function Home() {
  const [activeBusiness, setActiveBusiness] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleMenuKeyDown);
    return () => document.removeEventListener("keydown", handleMenuKeyDown);
  }, [isMenuOpen]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  // Keep the active pagination dot synchronized with Embla.
  useEffect(() => {
    if (!emblaApi) return;

    const updateActiveBusiness = () => {
      setActiveBusiness(emblaApi.selectedScrollSnap());
    };

    updateActiveBusiness();

    emblaApi.on("select", updateActiveBusiness);

    return () => {
      emblaApi.off("select", updateActiveBusiness);
    };
  }, [emblaApi]);

  const scrollToBusiness = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  return (
    <div className="bg-black">
      {/* Header */}
      <header className="sticky top-0 z-60 bg-black/80 backdrop-blur-sm">
        <nav
          aria-label="Main navigation"
          className="relative flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        >
          <a
            href="#top"
            className="relative z-70 flex items-center gap-1.5"
            aria-label="Arika home"
          >
            <Image
              src={logo}
              alt="Arika logo"
              width={40}
              height={40}
              className="h-8 w-auto"
              priority
            />
            <span className="text-2xl font-bold text-(--color-accent)">
              Arika
            </span>
          </a>
          {/* Desktop navigation */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="hidden btn-secondary px-7 py-3 text-sm sm:inline-flex"
            >
              Log In
            </Link>
            <Link
              href="/auth/register"
              className="hidden btn-primary px-8 py-3 text-sm sm:inline-flex"
            >
              Get Started
            </Link>

            {/* Mobile navigation dialog */}
            <Dialog.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  className={`relative z-70 inline-flex items-center justify-center rounded-full bg-(--color-surface) p-3 text-white transition-colors duration-200 hover:bg-white/20 sm:hidden ${
                    isMenuOpen ? "invisible" : "visible"
                  }`}
                  aria-label="Open navigation menu"
                >
                  <Menu size={22} strokeWidth={2.5} aria-hidden="true" />
                </button>
              </Dialog.Trigger>
              <AnimatePresence>
                {isMenuOpen && (
                  <Dialog.Portal forceMount>
                    {/* Keeps the brand header above the blurred page overlay */}
                    <Dialog.Overlay asChild forceMount>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md sm:hidden"
                      />
                    </Dialog.Overlay>
                    {/* Slides the mobile actions in from the right. */}
                    <Dialog.Content asChild forceMount>
                      <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className="fixed top-20 right-8 z-50 flex w-6/12 flex-col gap-2 rounded-3xl border-[0.5px] border-[#404040] bg-black px-4 py-6 shadow-2xl outline-none sm:hidden"
                      >
                        {/* Accessible dialog title and description. */}
                        <Dialog.Title className="sr-only">
                          Arika mobile navigation
                        </Dialog.Title>
                        <Dialog.Description className="sr-only">
                          Mobile navigation menu with login and registration
                          options.
                        </Dialog.Description>
                        {/* Mobile menu actions */}
                        <div className="mobile-menu-buttons">
                          <Dialog.Close asChild>
                            <Link
                              href="/auth/login"
                              className="mobile-menu-button bg-(--color-surface) text-white hover:bg-[#262626]"
                            >
                              Log In
                            </Link>
                          </Dialog.Close>

                          <Dialog.Close asChild>
                            <Link
                              href="/auth/register"
                              className="mobile-menu-button bg-(--color-accent) hover:bg-(--color-accent-hover)"
                            >
                              Get Started
                            </Link>
                          </Dialog.Close>

                          <Dialog.Close asChild>
                            <button
                              type="button"
                              className="mobile-menu-button bg-(--color-surface) text-[#525252] hover:bg-[#262626] hover:text-(--color-text-secondary)"
                              aria-label="Close navigation menu"
                            >
                              Close
                            </button>
                          </Dialog.Close>
                        </div>
                      </motion.div>
                    </Dialog.Content>
                  </Dialog.Portal>
                )}
              </AnimatePresence>
            </Dialog.Root>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero relative overflow-hidden">
        <div className="flex min-h-[calc(100svh-4.75rem)] flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="z-10 flex max-w-4xl flex-col items-center gap-6">
            <h1 className="text-center text-white text-4xl font-bold leading-[110%] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
              The AI employee every African small business can afford
            </h1>
            <p className="max-w-3xl text-center font-medium leading-[150%] tracking-[-0.01em] text-[#A3A3A3] lg:text-[18px]">
              Stop managing customer messages manually and experiencing business
              owner burnout. Akira automates your customer conversations across
              WhatsApp Business and Instagram so you can respond instantly,
              recover abandoned carts, and increase sales.
            </p>
            <Link
              href="/auth/register"
              className="btn-primary inline-flex items-center justify-center px-8 py-4 text-base active:scale-95"
            >
              Set up in under 10 minutes
            </Link>
          </div>

          <SectionBackgroundImage />
        </div>
      </section>
      <main id="top">
        {/* SME SHOWCASE SECTION */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="section-shell-l flex flex-col items-center justify-center gap-14 rounded-4xl px-0 py-16 lg:bg-neutral-100 lg:px-8 lg:py-24">
            <h2
              id="sme-showcase-heading"
              className="mx-auto text-center text-3xl font-extrabold leading-[120%] tracking-[-0.01em] text-black sm:text-4xl"
            >
              Built specifically for Nigerian SMEs
            </h2>

            {/* MOBILE SME CAROUSEL */}
            <div className="block w-full md:hidden">
              {/* Embla viewport */}
              <div
                ref={emblaRef}
                className="showcase-carousel overflow-hidden"
                role="region"
                aria-label="SME showcase carousel"
                aria-labelledby="sme-showcase-heading"
              >
                {/* Embla container */}
                <div className="flex">
                  {businesses.map((business) => (
                    <div
                      key={business.title}
                      className="relative min-w-full shrink-0 overflow-hidden rounded-[28px] bg-black"
                    >
                      <Image
                        src={business.image}
                        alt={`${business.title} showcase`}
                        width={500}
                        height={500}
                        className="h-92 w-full object-cover sm:h-80"
                      />

                      {/* Image gradient */}
                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/60 to-transparent px-4 py-4 text-left">
                        <h3 className="font-bold text-white">
                          {business.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CAROUSEL PAGINATION */}
              <div className="flex items-center justify-center gap-2 pt-8">
                {businesses.map((business, index) => (
                  <button
                    key={`${business.title}-dot`}
                    type="button"
                    aria-label={`Show ${business.title}`}
                    aria-current={activeBusiness === index ? "true" : undefined}
                    onClick={() => scrollToBusiness(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                      activeBusiness === index
                        ? "bg-(--color-accent)"
                        : "bg-(--color-btn-secondary-bg-hover)"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* TABLET / DESKTOP SME SHOWCASE */}
            <div className="hidden w-full gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
              {businesses.map((business) => (
                <div
                  key={business.title}
                  className="relative overflow-hidden rounded-[28px] bg-black"
                >
                  <Image
                    src={business.image}
                    alt={`${business.title} showcase`}
                    width={500}
                    height={500}
                    className="h-88 w-full object-cover sm:h-80"
                  />

                  {/* Image gradient */}
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/60 to-transparent px-4 py-4 text-left">
                    <h3 className="font-bold text-white">{business.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* FEATURE HIGHLIGHTS SECTION */}
        <section className="relative overflow-hidden bg-black px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="section-shell relative z-10 text-white">
            <div className="mx-auto flex flex-col items-center justify-center gap-12">
              <h2 className="text-3xl font-black text-center leading-[120%] tracking-[-0.44px] text-white sm:text-4xl">
                Everything you need to sell faster, in one place.
              </h2>

              <div className="mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-2">
                {features.map((feature) => (
                  <article
                    key={feature.title}
                    className="flex flex-col items-start gap-5 rounded-[28px] bg-[#171717] p-6 text-left shadow-sm"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
                      <Image
                        src={feature.icon}
                        alt=""
                        aria-hidden="true"
                        width={28}
                        height={28}
                        className="h-7 w-7"
                      />
                    </div>
                    {/* Feature content */}
                    <div>
                      <h3 className="text-lg font-bold leading-[130%] tracking-[-0.24px]">
                        {feature.title}
                      </h3>
                      <p className="pt-2 text-sm leading-[150%] tracking-[-0.17px] text-[#A3A3A3] sm:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <SectionBackgroundImage />
        </section>
        {/* STEP-BY-STEP ONBOARDING SECTION */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="section-shell-l flex flex-col items-center gap-11">
            <h2 className="text-center text-3xl font-extrabold leading-[120%] tracking-[-0.01em] text-(--color-accent) sm:text-[#0A0A0A] sm:text-4xl">
              Your new assistant is ready to work
            </h2>
            {/* Steps grid */}
            <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.title}
                  className="rounded-[28px] bg-[#f5f5f5] p-7 text-left"
                >
                  <div className="flex flex-col items-start gap-5">
                    <div className="flex items-center justify-center rounded-2xl">
                      <Image
                        src={step.icon}
                        alt="icon"
                        aria-hidden="true"
                        width={36}
                        height={36}
                        className="aspect-[45.77/52.20] h-12.5 w-11.5"
                      />
                    </div>
                    {/* Step content */}
                    <div className="flex flex-col gap-4">
                      <h3 className="text-lg font-bold text-[#0A0A0A]">
                        {step.title}
                      </h3>
                      <p className="text-[15px] leading-[150%] tracking-[-0.01em] text-[#737373]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="relative overflow-hidden bg-black px-4 py-16 sm:px-6 lg:px-8">
          <div className="section-shell relative z-10 flex max-w-4xl flex-col items-center gap-4 text-center text-white">
            <h2 className="text-3xl font-black leading-[120%] tracking-[-0.44px] sm:text-4xl">
              Stop losing potential sales to delayed responses.
            </h2>
            <p className="max-w-2xl leading-7 tracking-[-0.18px] text-[#A3A3A3] lg:text-lg">
              Join the Nigerian business owners who are letting Akira handle the
              chat while they handle the growth.
            </p>
            <Link
              href="/auth/register"
              className="btn-primary mt-2 inline-flex items-center justify-center px-8 py-4 text-base"
            >
              Get Started for Free
            </Link>
          </div>

          <SectionBackgroundImage />
        </section>

        {/* FOOTER */}
        <footer className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-6">
          <div className="section-shell-l flex items-center justify-between gap-6 text-center sm:text-left">
            {/* Footer logo */}
            <a
              href="#top"
              className="flex items-center gap-1.5"
              aria-label="Arika home"
            >
              <Image
                src={logo}
                alt="Arika logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="text-2xl font-bold text-(--color-accent)">
                Arika
              </span>
            </a>
            {/* Footer links */}
            <div className="flex flex-col gap-3 text-sm font-bold text-[#0A0A0A] text-right sm:flex-row sm:items-center sm:gap-8">
              <a href="#support" className="footer-link">
                Support / Contact Us
              </a>
              <a href="#privacy" className="footer-link">
                Privacy Policy
              </a>
              <a href="#terms" className="footer-link">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
