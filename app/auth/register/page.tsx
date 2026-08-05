import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <section className="w-full max-w-md rounded-[28px] bg-[#171717] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#E54D2E]">
            Get started
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Create your account</h1>
        </div>

        <form className="space-y-5" aria-label="Register form">
          <div>
            <label htmlFor="businessName" className="mb-2 block text-sm font-medium text-white">
              Business name
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              autoComplete="organization"
              required
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-[#E54D2E]"
              placeholder="Your business"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-[#E54D2E]"
              placeholder="you@business.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-white">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-[#E54D2E]"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#E54D2E] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#d84325] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E54D2E]/40"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#A3A3A3]">
          Already have an account? {" "}
          <Link href="/auth/login" className="font-semibold text-[#E54D2E] hover:text-[#ff7b5c]">
            Sign in
          </Link>
        </p>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-semibold text-white hover:text-[#E54D2E]">
            ← Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
