type AuthInputProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  showErrorMessage?: boolean;
};

export default function AuthInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  required,
  placeholder,
  autoComplete,
  showErrorMessage = true,
}: AuthInputProps) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={(event) => onBlur(event.target.value)}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`rounded-full border px-5 py-3 transition-colors ${
          error ? "border-red-500" : ""
        }`}
      />

      {error && showErrorMessage && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
