type StatCardProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="shrink-0 w-[45%] sm:w-auto snap-start rounded-2xl bg-(--color-bg-surface) p-5">
      <div className="mb-6">{icon}</div>
      <p className="text-xs text-(--color-text-subtle) mb-1">{label}</p>
      <p className="text-2xl font-bold text-(--color-text)">{value}</p>
    </div>
  );
}
