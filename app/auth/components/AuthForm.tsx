"use client";

import { useState } from "react";
import AuthInput from "./AuthInput";
import SocialAuthButtons from "./SocialAuthButtons";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  required?: boolean;
};

type AuthFormProps = {
  fields: Field[];
  submitLabel: string;
  onSubmit: (data: Record<string, string>) => void | Promise<void>;
  isSubmitting?: boolean;
};

export default function AuthForm({
  fields,
  submitLabel,
  onSubmit,
  isSubmitting = false,
}: AuthFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState<string | null>(null);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      if (field.required && !values[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (
        field.type === "email" &&
        values[field.name] &&
        !/\S+@\S+\.\S+/.test(values[field.name])
      ) {
        newErrors[field.name] = "Enter a valid email";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      await onSubmit(values);
    }
  }

  // Placeholders — backend devs will replace the body of these
  // with real signInWith("google") / signInWith("apple") calls
  async function handleGoogleClick() {
    try {
      setAuthError(null);
      // await signInWith("google")
    } catch (err) {
      setAuthError(" Please try again or sign up with email");
    }
  }

  async function handleAppleClick() {
    try {
      setAuthError(null);
      // await signInWith("apple")
    } catch (err) {
      setAuthError(
        "Authentication with Apple failed. Please try again or sign up with email",
      );
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {fields.map((field) => (
          <AuthInput
            key={field.name}
            id={field.name}
            label={field.label}
            type={field.type}
            required={field.required}
            value={values[field.name] || ""}
            onChange={(value) =>
              setValues((prev) => ({ ...prev, [field.name]: value }))
            }
            error={errors[field.name]}
          />
        ))}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary py-2 mt-2"
        >
          {isSubmitting ? "Please wait..." : submitLabel}
        </button>
      </form>

      <SocialAuthButtons />
    </div>
  );
}
