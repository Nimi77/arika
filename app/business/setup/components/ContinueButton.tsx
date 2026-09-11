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
      className={`rounded-full py-3 text-[15px] font-semibold bg-(--color-bg-surface) border border-transparent transition-colors hover:bg-(--color-bg-surface-hover) active:bg-(--color-action-primary) active:text-(--color-text-on-primary) disabled:cursor-not-allowed   disabled:opacity-40  ${fullWidth ? "w-full" : "flex-1"}`}
    >
      {label}
    </button>
  );
}
