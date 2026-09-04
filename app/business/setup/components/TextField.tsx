type TextFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  textOnly?: boolean;
};

export default function TextField({
  id,
  label,
  placeholder,
  value,
  onChange,
  textOnly = false,
}: TextFieldProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (textOnly) {
      onChange(value.replace(/[0-9]/g, ""));
      return;
    }

    onChange(value);
  }

  return (
    <div className="flex w-full flex-col gap-1.5 text-left">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-(--color-secondary)"
      >
        {label}
      </label>

      <input
        id={id}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          min-h-11 w-full
          rounded-full
          border border-transparent
          bg-(--color-bg-surface)
          px-4 py-3
          text-sm text-(--color-text)
          placeholder:text-neutral-500
          outline-none
          transition-colors
          hover:border-(--color-action-primary)
          focus:border-(--color-action-primary)
          focus-visible:outline-none
        "
      />
    </div>
  );
}
