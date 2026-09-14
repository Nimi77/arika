type QuickActionCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
};

export default function QuickActionCard({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: QuickActionCardProps) {
  return (
    <div className="rounded-2xl bg-(--color-bg-surface) p-4 flex flex-col lg:items-center sm:flex-row sm:items-center gap-3 sm:gap-4">
      <div className="flex  flex-col lg:flex-row items-center  gap-3 flex-1 min-w-0">
        <div className="shrink-0">{icon}</div>
        <div className="min-w-0">
          <p className="lg:text-sm text-xs font-semibold text-(--color-text)">
            {title}
          </p>
          <p className="lg:text-xs text-[10px] text-(--color-text-subtle) mt-0.5">
            {description}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onAction}
        className="shrink-0 rounded-full bg-(--color-bg-base) text-(--color-text) text-xs font-semibold px-4 py-2.5 hover:bg-(--color-action-primary) hover:text-white transition-colors"
      >
        {actionLabel}
      </button>
    </div>
  );
}
