type StepCirclesProps = {
  step: 1 | 2 | 3 | 4;
};

export default function StepCircles({
  step,
}: StepCirclesProps) {
  return (
    <nav
      aria-label={`Registration progress: step ${step} of 4`}
      className="mx-auto w-full max-w-2xl"
    >
      <ol className="flex w-full items-center justify-center">
        {[1, 2, 3, 4].map((number, index) => {
          const isCompleted = step >= number;
          const isCurrent = step === number;

          return (
            <li
              key={number}
              className="flex min-w-0 flex-1 items-center last:flex-none"
            >
              {/* Step circle */}
              <div
                aria-current={isCurrent ? "step" : undefined}
                className={`
                  flex
                  h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-full
                  border-4
                  text-sm font-bold
                  transition-colors duration-200
                  sm:h-12 sm:w-12
                  lg:h-14 lg:w-14
                  ${
                    isCompleted
                      ? "border-(--color-action-primary) text-(--color-action-primary)"
                      : "border-(--color-bg-surface) text-(--color-text-subtle)"
                  }
                `}
              >
                {number}
              </div>

              {/* Connector */}
              {index < 3 && (
                <div
                  aria-hidden="true"
                  className={`
                    mx-2 h-1 min-w-0 flex-1
                    rounded-full
                    transition-colors duration-200
                    sm:mx-3
                    ${
                      step > number
                        ? "bg-(--color-action-primary)"
                        : "bg-(--color-bg-surface)"
                    }
                  `}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
