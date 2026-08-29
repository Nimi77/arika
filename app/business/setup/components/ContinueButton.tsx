type ContinueButtonProps = {
  onClick: () => void;
  label?: string;
  fullWidth?: boolean;
  disabled?: boolean;
};

export default function ContinueButton({
  onClick,
  label = "Continue",
  fullWidth = true,
  disabled = false,
}: ContinueButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`bg-(--color-bg-surface) hover:bg-(--color-bg-surface-hover) active:bg-(--color-action-primary) active:text-(--color-text-on-primary) transition-colors rounded-full py-3 mt-6 mb-4 disabled:opacity-40 disabled:cursor-not-allowed ${
        fullWidth ? "w-full" : "flex-1"
      }`}
    >
      {label}
    </button>
  );
}
