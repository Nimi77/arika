import Image from "next/image";
import logo from "@/public/logo.png";
import heroImg from "@/public/hero-img.png";
import altRouteIcon from "@/public/alt_route.svg";
import shoppingCartIcon from "@/public/shopping_cart.svg";
import therapyIcon from "@/public/physical_therapy.svg";
import approvalIcon from "@/public/approval.svg";
import accountCircleIcon from "@/public/account_circle.svg";
import cableIcon from "@/public/cable.svg";
import cloudUploadIcon from "@/public/cloud_upload.svg";

const businesses = [
  {
    title: "Food Vendors",
    image: "/user1.jpg",
  },
  {
    title: "Beauty & Cosmetics",
    image: "/user2.jpg",
  },
  {
    title: "Fashion",
    image: "/user3.jpg",
  },
  {
    title: "Jewelry",
    image: "/user4.jpg",
  },
];

const features = [
  {
    icon: altRouteIcon,
    title: "Stop switching between apps",
    description:
      "See all your WhatsApp messages and Instagram DMs in a single, mobile-friendly dashboard without feeling overwhelmed.",
  },
  {
    icon: shoppingCartIcon,
    title: "Never miss a sale while you sleep",
    description:
      "Train Akira with your FAQs, delivery prices, and policies to reduce customer response time to under 30 seconds.",
  },
  {
    icon: therapyIcon,
    title: "Recover lost customers effortlessly",
    description:
      "Automatically follow up with customers who stop responding after 24 hours, ensuring you never miss a sales opportunity.",
  },
  {
    icon: approvalIcon,
    title: "Seamless Human Handoff",
    description:
      "Akira detects when a customer needs human attention, allowing you to pause the AI, take over the conversation, and return control whenever you are ready.",
  },
];

const steps = [
  {
    icon: accountCircleIcon,
    title: "Step 1",
    description:
      "Create your profile. Enter your business name, hours, and contact information.",
  },
  {
    icon: cableIcon,
    title: "Step 2",
    description:
      "Link your WhatsApp Business and Instagram securely via Meta's APIs, with no downloads needed.",
  },
  {
    icon: cloudUploadIcon,
    title: "Step 3",
    description:
      "Upload your FAQs. Give Akira your store policies and frequently used responses so it knows exactly how to talk to your customers.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-center">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-sm">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
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
              className="h-auto w-auto"
              priority
            />
            <span className="text-2xl font-bold text-white">Arika</span>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="#login"
              className="rounded-full bg-[#171717] px-4 py-2 text-sm font-semibold text-[#E54D2E] transition hover:bg-[#272727] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E54D2E]/40 sm:px-5"
            >
              Log In
            </a>
            <a
              href="#get-started"
              className="rounded-full bg-[#E54D2E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d84325] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E54D2E]/40 sm:px-5"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-black">
          <div className="mx-auto flex max-w-7xl flex-col items-center px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
            <div className="z-10 flex max-w-4xl flex-col items-center gap-6 text-white">
              <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold leading-[110%] tracking-[-0.01em] sm:text-5xl lg:text-6xl xl:text-[72px]">
                The AI employee every African small business can afford
              </h1>
              <p className="mx-auto max-w-3xl text-center text-base font-medium leading-[150%] tracking-[-0.01em] text-[#A3A3A3] md:text-[17px] lg:text-[18px]">
                Stop managing customer messages manually and experiencing
                business owner burnout. Akira automates your customer
                conversations across WhatsApp Business and Instagram so you can
                respond instantly, recover abandoned carts, and increase sales.
              </p>
              <a
                href="#get-started"
                className="inline-flex items-center justify-center rounded-full bg-[#E54D2E] px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-[#d84325] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E54D2E]/40 active:scale-95"
              >
                Set up in under 10 minutes
              </a>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden lg:block">
              <Image
                src={heroImg}
                alt=""
                aria-hidden="true"
                width={1445}
                height={788}
                className="h-auto w-full object-cover opacity-25"
                priority
              />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-4xl bg-neutral-100 px-6 py-12 sm:px-10 lg:px-14">
            <h2 className="mx-auto max-w-3xl text-center text-3xl font-extrabold leading-[120%] tracking-[-0.01em] text-black sm:text-4xl">
              Built specifically for Nigerian SMEs
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {businesses.map((business) => (
                <article
                  key={business.title}
                  className="relative overflow-hidden rounded-[28px] bg-black"
                >
                  <Image
                    src={business.image}
                    alt={`${business.title} showcase`}
                    width={500}
                    height={500}
                    className="h-72 w-full object-cover sm:h-80"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/60 to-transparent px-4 py-4 text-left">
                    <h3 className="text-lg font-bold text-white">
                      {business.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-black px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl text-white">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 text-center">
              <h2 className="max-w-3xl text-3xl font-black leading-[120%] tracking-[-0.44px] text-white sm:text-4xl">
                Everything you need to sell faster, in one place.
              </h2>

              <div className="grid w-full gap-4 md:grid-cols-2">
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

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden lg:block">
            <Image
              src={heroImg}
              alt=""
              aria-hidden="true"
              width={1445}
              height={788}
              className="h-auto w-full object-cover opacity-25"
            />
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-11">
            <h2 className="text-center text-3xl font-extrabold leading-[120%] tracking-[-0.01em] text-[#0A0A0A] sm:text-4xl">
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
                      <h3 className="text-lg font-black text-[#0A0A0A]">
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

        <section className="relative overflow-hidden bg-black px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center text-white">
            <h2 className="text-3xl font-black leading-[120%] tracking-[-0.44px] sm:text-4xl">
              Stop losing potential sales to delayed responses.
            </h2>
            <p className="max-w-2xl text-base leading-7 tracking-[-0.18px] text-[#A3A3A3]">
              Join the Nigerian business owners who are letting Akira handle the
              chat while they handle the growth.
            </p>
            <a
              href="#get-started"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#E54D2E] px-8 py-4 text-base font-bold text-white transition hover:bg-[#d84325] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E54D2E]/40"
            >
              Get Started for Free
            </a>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden lg:block">
            <Image
              src={heroImg}
              alt=""
              aria-hidden="true"
              width={1445}
              height={788}
              className="h-auto w-full object-cover opacity-40"
            />
          </div>
        </section>

        <footer className="bg-white px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
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
                className="h-auto w-auto"
              />
              <span className="text-2xl font-bold text-black">Arika</span>
            </a>

            <div className="flex flex-col gap-3 text-sm font-bold text-[#0A0A0A] sm:flex-row sm:items-center sm:gap-8">
              <a
                href="#support"
                className="hover:text-[#E54D2E] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E54D2E]/40 rounded-full"
              >
                Support / Contact Us
              </a>
              <a
                href="#privacy"
                className="hover:text-[#E54D2E] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E54D2E]/40 rounded-full"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="hover:text-[#E54D2E] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E54D2E]/40 rounded-full"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
