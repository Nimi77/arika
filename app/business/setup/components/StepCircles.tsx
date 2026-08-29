type StepCirclesProps = {
  step: 1 | 2 | 3 | 4;
};

export default function StepCircles({ step }: StepCirclesProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3, 4].map((n, i) => (
        <div key={n} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-4 transition-colors ${
              step >= n
                ? "border-(--color-action-primary) text-(--color-action-primary)"
                : "border-(--color-bg-surface) text-neutral-500"
            }`}
          >
            {n}
          </div>
          {i < 3 && (
            <div
              className={`lg:w-[60px] w-[32px] h-[6.3px] mx-2 rounded-[7000px] transition-colors ${
                step > n
                  ? "bg-(--color-action-primary)"
                  : "bg-(--color-bg-surface)"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
