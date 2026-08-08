// app/auth/components/SocialAuthButtons.tsx
type SocialAuthButtonsProps = {
  authError?: string | null;
  failedProvider?: "google" | "apple" | null;
  onGoogleClick?: () => void;
  onAppleClick?: () => void;
};

export default function SocialAuthButtons({
  authError,
  failedProvider,
  onGoogleClick,
  onAppleClick,
}: SocialAuthButtonsProps) {
  return (
    <div>
      {authError && (
        <p className="text-[10px] text-white rounded-2xl sm:rounded-full px-3 py-2 mb-2 bg-red-950/40 text-center  text-center text-[var(--color-accent)] transition-colors duration-200">
          {authError.includes("Google") ? (
            <>
              Authentication with Google failed.
              <br className="sm:hidden" />
              Please try again or sign up with email
            </>
          ) : (
            <>
              Authentication with Apple failed.
              <br className="sm:hidden" />
              Please try again or sign up with email
            </>
          )}
        </p>
      )}

      <div className="flex lg:flex-row flex-col mt-3 gap-3">
        <button
          type="button"
          onClick={onGoogleClick}
          className={`flex-1 flex items-center justify-center gap-2 rounded-full bg-[var(--color-surface)] py-2 text-xs font-medium hover:border-[var(--color-accent)] transition-colors border ${
            failedProvider === "google"
              ? "border-[var(--color-accent)]"
              : "border-transparent"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"
            />
            <path
              fill="#34A853"
              d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18z"
            />
            <path
              fill="#FBBC05"
              d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.03l3-2.33z"
            />
            <path
              fill="#EA4335"
              d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.94 8.94 0 0 0 9 0 9 9 0 0 0 .95 4.97l3 2.33C4.66 5.17 6.65 3.58 9 3.58z"
            />
          </svg>
          Continue with Google
        </button>
        <button
          type="button"
          onClick={onAppleClick}
          className={`flex-1 flex items-center justify-center gap-2 rounded-full bg-[var(--color-surface)] py-2 text-xs font-medium hover:border-[var(--color-accent)] transition-colors border ${
            failedProvider === "apple"
              ? "border-[var(--color-accent)]"
              : "border-transparent"
          }`}
        >
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M13.2 9.5c0-2.16 1.77-3.2 1.85-3.25-1.01-1.47-2.58-1.67-3.14-1.7-1.34-.14-2.6.79-3.28.79-.67 0-1.72-.77-2.83-.75-1.45.02-2.79.85-3.54 2.15-1.51 2.62-.39 6.5 1.09 8.62.72 1.04 1.58 2.2 2.71 2.16 1.09-.04 1.5-.7 2.82-.7 1.31 0 1.69.7 2.84.68 1.18-.02 1.92-1.05 2.63-2.1.83-1.2 1.17-2.37 1.19-2.43-.03-.01-2.28-.87-2.3-3.47z" />
            <path d="M11.15 3.1c.6-.72 1-1.72.89-2.63-.86.04-1.9.58-2.52 1.3-.55.63-1.04 1.66-.91 2.63.95.08 1.93-.48 2.54-1.21z" />
          </svg>
          Continue with Apple
        </button>
      </div>
    </div>
  );
}
