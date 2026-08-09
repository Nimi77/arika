// app/auth/components/AuthInput.tsx
type AuthInputProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  showErrorMessage?: boolean; // ← new
};

export default function AuthInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  required,
  placeholder,
  showErrorMessage = true, // ← defaults to true so existing usages (businessName, etc.) don't change
}: AuthInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`rounded-full px-3 py-2 bg-neutral-800 hover:bg-neutral-900 outline-none focus-visible:ring-1 focus-visible:ring-(--color-accent) transition-colors ${
          error
            ? "border border-(--color-accent) text-(--color-accent)"
            : "border border-transparent text-(--color-text)"
        }`}
      />
      {error && showErrorMessage && (
        <p id={`${id}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
