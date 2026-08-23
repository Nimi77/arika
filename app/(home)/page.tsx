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

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: true,
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
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-100 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-black focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-(--color-action-primary) focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* HEADER */}
      <header
        id="top"
        className="sticky top-0 z-60 bg-black/80 backdrop-blur-sm"
      >
        <nav
          aria-label="Main navigation"
          className="relative flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        >
          <a
            href="#top"
            aria-label="Arika home"
            className="relative z-70 flex items-center gap-1.5"
          >
            <Image
              src={logo}
              alt="Arika logo"
              width={40}
              height={40}
              className="h-8 w-auto"
              priority
            />
            <span className="text-2xl font-bold text-(--color-action-primary)">
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
                  className={`relative z-70 inline-flex items-center justify-center rounded-full bg-(--color-action-secondary) text-neutral-50 p-3 transition-colors duration-200 hover:bg-neutral-50/20 sm:hidden ${
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
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
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
                              className="mobile-menu-button bg-(--color-action-secondary) text-neutral-50 transition-all duration-200 ease-out hover:bg-neutral-800/55"
                            >
                              Log In
                            </Link>
                          </Dialog.Close>

                          <Dialog.Close asChild>
                            <Link
                              href="/auth/register"
                              className="mobile-menu-button bg-(--color-action-primary) text-neutral-50 hover:bg-(--color-action-primary-hover)"
                            >
                              Get Started
                            </Link>
                          </Dialog.Close>

                          <Dialog.Close asChild>
                            <button
                              type="button"
                              className="mobile-menu-button bg-(--color-action-secondary) text-(--color-text-secondary) hover:border-2 border-indigo-500"
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
      <section className="hero bg-black relative flex min-h-[calc(100svh-4.75rem)] items-center justify-center overflow-hidden">
        <div className="relative z-10 w-full flex flex-col items-center gap-8 px-6">
          <div className="hero-content max-w-4xl">
            <h1 className="text-center text-4xl font-bold leading-[110%] tracking-[-0.01em] text-white sm:text-5xl lg:text-6xl">
              The AI employee every African small business can afford
            </h1>

            <p className="pt-2 text-center text-sm leading-[150%] tracking-[-0.01125rem] text-[#A3A3A3] lg:text-[18px]">
              Stop managing customer messages manually and experiencing business
              owner burnout. Arika automates your customer conversations across
              WhatsApp Business and Instagram so you can respond instantly,
              recover abandoned carts, and increase sales.
            </p>
          </div>

          <Link
            href="/auth/register"
            className="btn-primary inline-flex items-center justify-center px-8 py-4 text-base active:scale-95"
          >
            Set up in under 10 minutes
          </Link>
        </div>

        <SectionBackgroundImage />
      </section>

      <main id="main-content">
        {/* SME SHOWCASE SECTION */}
        <section
          aria-labelledby="sme-showcase-heading"
          className="bg-white px-4 py-16 sm:px-6 lg:px-8"
        >
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
                    type="button"
                    aria-label={`Show ${business.title}`}
                    aria-current={activeBusiness === index ? "true" : false}
                    onClick={() => scrollToBusiness(index)}
                    className="flex h-3 w-3 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-action-primary)"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-2.5 w-2.5 rounded-full ${
                        activeBusiness === index
                          ? "bg-(--color-action-primary)"
                          : "bg-(--color-action-secondary)"
                      }`}
                    />
                  </button>
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
        <section
          aria-labelledby="features-heading"
          className="relative overflow-hidden bg-black px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <div className="section-shell relative z-10 text-white">
            <div className="mx-auto flex flex-col items-center justify-center gap-12">
              <h2
                id="features-heading"
                className="text-3xl font-black text-center leading-[120%] tracking-[-0.44px] text-white sm:text-4xl"
              >
                Everything you need to sell faster, in one place.
              </h2>

              <div className="mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-2">
                {features.map((feature) => (
                  <article
                    key={feature.title}
                    className="flex flex-col items-start gap-5 rounded-[28px] bg-(--color-bg-surface) p-6 text-left shadow-sm"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black">
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
                      <h3 className="text-lg font-bold leading-[130%] tracking-[-0.015rem]">
                        {feature.title}
                      </h3>
                      <p className="pt-2 text-sm text-(--color-text-secondary) leading-[150%] tracking-[-0.01063rem] sm:text-base">
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
        <section
          aria-labelledby="steps-heading"
          className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <div className="section-shell-l flex flex-col items-center gap-11">
            <h2
              id="steps-heading"
              className="text-center text-3xl font-extrabold leading-[120%] tracking-[-0.01em] text-(--color-action-primary) sm:text-[#0A0A0A] sm:text-4xl"
            >
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
                        alt=""
                        aria-hidden="true"
                        width={36}
                        height={36}
                        className="aspect-[45.77/52.20] h-12.5 w-11.5"
                      />
                    </div>
                    {/* Step content */}
                    <div className="flex flex-col gap-4">
                      <h3 className="text-xl font-bold text-[#171717]">
                        {step.title}
                      </h3>
                      <p className="text-[15px] leading-[150%] tracking-[-0.01em] text-[#525252]">
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
          <div className="section-shell relative z-10 max-w-4xl text-center text-white">
            <div className="content flex flex-col gap-2 items-center">
              <h2 className="text-3xl font-black leading-[120%] tracking-[-0.44px] sm:text-4xl">
                Stop losing potential sales to delayed responses.
              </h2>
              <p className="max-w-2xl leading-7 tracking-[-0.18px] text-(--color-text-secondary) lg:text-lg">
                Join the Nigerian business owners who are letting Arika handle
                the chat while they handle the growth.
              </p>
            </div>
            <Link
              href="/auth/register"
              className="btn-primary mt-8 inline-flex items-center justify-center px-8 py-4 text-base"
            >
              Get Started for Free
            </Link>
          </div>

          <SectionBackgroundImage />
        </section>
      </main>

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
            <span className="text-2xl font-bold text-(--color-action-primary)">
              Arika
            </span>
          </a>
          {/* Footer links */}
          <div className="flex flex-col gap-3 text-sm font-bold text-right sm:flex-row sm:items-center sm:gap-8">
            <Link href="" className="footer-link support">
              Support / Contact Us
            </Link>
            <Link href="" className="footer-link policy">
              Privacy Policy
            </Link>
            <Link href="" className="footer-link terms">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
