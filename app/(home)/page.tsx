"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import heroImg from "@/public/hero-img.png";
import { businesses, features, steps } from "./content";

// shared background layer used by the hero and CTA sections.
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

  // one duplicate slide so the carousel can loop cleanly back to the first item.
  const carouselItems = [...businesses, businesses[0]];

  // carousel changes every two seconds on mobile.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveBusiness((current) => current + 1);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  // when the duplicate slide is reached, reset back to the first real slide.
  useEffect(() => {
    if (activeBusiness !== businesses.length) {
      return;
    }

    const resetTimer = window.setTimeout(() => {
      setActiveBusiness(0);
    }, 500);

    return () => window.clearTimeout(resetTimer);
  }, [activeBusiness]);

  return (
    <div className="bg-black">
      {/* header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm">
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        >
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
              priority
            />
            <span className="text-2xl font-bold text-[#e54d2e]">Arika</span>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/auth/login"
              className="btn-secondary py-3 px-4 text-sm lg:text-[15px] sm:px-7"
            >
              Log In
            </a>
            <a
              href="/auth/register"
              className="btn-primary py-3 px-8 text-sm lg:text-[15px] sm:px-9"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>

      {/* hero */}
      <section className="hero relative overflow-hidden">
        <div className="flex min-h-[calc(100svh-4.75rem)] flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="z-10 flex max-w-4xl flex-col items-center gap-6 text-white">
            <h1 className="text-center text-white text-4xl font-bold leading-[110%] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
              The AI employee every African small business can afford
            </h1>
            <p className="max-w-3xl text-center font-medium leading-[150%] tracking-[-0.01em] text-[#A3A3A3] lg:text-[18px]">
              Stop managing customer messages manually and experiencing business
              owner burnout. Akira automates your customer conversations across
              WhatsApp Business and Instagram so you can respond instantly,
              recover abandoned carts, and increase sales.
            </p>
            <a
              href="#get-started"
              className="btn-primary inline-flex items-center justify-center px-8 py-4 text-base active:scale-95"
            >
              Set up in under 10 minutes
            </a>
          </div>

          <SectionBackgroundImage />
        </div>
      </section>

      <main id="top">
        {/* SME showcase section */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="section-shell-l rounded-4xl lg:bg-neutral-100 flex flex-col justify-center items-center gap-14 py-16 px-0 lg:py-24 lg:px-8 ">
            <h2 className="mx-auto text-3xl text-center font-extrabold leading-[120%] tracking-[-0.01em] text-black sm:text-4xl">
              Built specifically for Nigerian SMEs
            </h2>

            {/* SME carousel for mobile screen */}
            <div className="block w-full md:hidden">
              <div
                className="showcase-carousel overflow-x-hidden"
                aria-label="SME showcase carousel"
              >
                <div
                  className="flex"
                  aria-live="polite"
                  style={{
                    transform: `translateX(-${activeBusiness * 100}%)`,
                    transition:
                      activeBusiness === businesses.length
                        ? "none"
                        : "transform 500ms ease-in-out",
                  }}
                >
                  {carouselItems.map((business, index) => (
                    <div
                      key={`${business.title}-${index}`}
                      className="relative min-w-full shrink-0 overflow-hidden rounded-[28px] bg-black"
                    >
                      <Image
                        src={business.image}
                        alt={`${business.title} showcase`}
                        width={500}
                        height={500}
                        className="h-92 w-full object-cover sm:h-80"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/60 to-transparent px-4 py-4 text-left">
                        <h3 className="font-bold text-white">
                          {business.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-8">
                {businesses.map((business, index) => (
                  <button
                    key={`${business.title}-dot`}
                    type="button"
                    aria-label={`Show ${business.title}`}
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                      activeBusiness % businesses.length === index
                        ? "bg-[#E54D2E]"
                        : "bg-[#D4D4D4]"
                    }`}
                    onClick={() => setActiveBusiness(index)}
                  />
                ))}
              </div>
            </div>

            {/* large/medium screen */}
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
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/60 to-transparent px-4 py-4 text-left">
                    <h3 className="font-bold text-white">{business.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature highlights section */}
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

        {/* Step-by-step onboarding section */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="section-shell-l flex flex-col items-center gap-11">
            <h2 className="text-center text-3xl font-extrabold leading-[120%] tracking-[-0.01em] text-[#E54D2E] sm:text-[#0A0A0A] sm:text-4xl">
              Your new assistant is ready to work
            </h2>

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

        {/* CTA banner section */}
        <section className="relative overflow-hidden bg-black px-4 py-16 sm:px-6 lg:px-8">
          <div className="section-shell relative z-10 flex max-w-4xl flex-col items-center gap-4 text-center text-white">
            <h2 className="text-3xl font-black leading-[120%] tracking-[-0.44px] sm:text-4xl">
              Stop losing potential sales to delayed responses.
            </h2>
            <p className="max-w-2xl leading-7 tracking-[-0.18px] text-[#A3A3A3] lg:text-lg">
              Join the Nigerian business owners who are letting Akira handle the
              chat while they handle the growth.
            </p>
            <a
              href="/auth/register"
              className="btn-primary mt-2 inline-flex items-center justify-center px-8 py-4 text-base"
            >
              Get Started for Free
            </a>
          </div>

          <SectionBackgroundImage />
        </section>

        {/* Footer navigation */}
        <footer className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-6">
          <div className="section-shell-l flex items-center justify-between gap-6 text-center sm:text-left">
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
              <span className="text-2xl font-bold text-[#e54d2e]">Arika</span>
            </a>

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
