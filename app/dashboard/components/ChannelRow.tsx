type ChannelRowProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  connected: boolean;
  onConnect?: () => void;
};

export default function ChannelRow({
  icon,
  title,
  subtitle,
  connected,
  onConnect,
}: ChannelRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-(--color-bg-surface) p-4">
      <div className="flex items-center gap-3 min-w-0">
        {icon}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-(--color-text) truncate">
            {title}
          </p>
          <p className="text-xs text-(--color-text-subtle) truncate">
            {subtitle}
          </p>
        </div>
      </div>

      {connected ? (
        <span className="shrink-0 rounded-full bg-green-500/15 text-green-400 text-xs font-semibold px-3 py-1.5">
          Connected
        </span>
      ) : (
        <button
          type="button"
          onClick={onConnect}
          className="shrink-0 rounded-full bg-(--color-action-primary) text-(--color-text-on-primary) text-xs font-semibold px-4 py-2 hover:bg-(--color-action-primary-hover) transition-colors"
        >
          Connect via Meta
        </button>
      )}
    </div>
  );
}
