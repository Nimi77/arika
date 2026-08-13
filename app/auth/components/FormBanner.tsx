type FormBannerProps = {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function FormBanner({
  message,
  actionLabel,
  onAction,
}: FormBannerProps) {
  return (
    <div
      role="alert"
      className="rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 px-4 py-3 text-xs text-white"
    >
      {message}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="ml-1 font-semibold text-(--color-accent) underline hover:text-(--color-accent-hover) hover:no-underline"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
