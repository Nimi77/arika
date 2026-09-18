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

      <button
        type="button"
        onClick={onConnect}
        disabled={connected}
        className={`shrink-0 rounded-full text-xs font-semibold px-4 py-2 transition-colors ${
          connected
            ? "bg-green-500/15 text-green-400 cursor-default"
            : "bg-(--color-action-primary) text-(--color-text-on-primary) hover:bg-(--color-action-primary-hover)"
        }`}
      >
        {connected ? "Connected" : "Connect via Meta"}
      </button>
    </div>
  );
}
