"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import PasswordInput from "../../components/PasswordInput";
import FormBanner from "../../components/FormBanner";
import AuthInput from "../../components/AuthInput";

import { apiFetch, storeAuthTokens } from "@/lib/api";

const REQUIREMENTS = [
  {
    label: "Minimum 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    label: "At least 1 uppercase & 1 lowercase character",
    test: (value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value),
  },
  {
    label: "At least 1 number",
    test: (value: string) => /\d/.test(value),
  },
  {
    label: "At least 1 special character (!@#$%^*)",
    test: (value: string) => /[!@#$%^*]/.test(value),
  },
];

type Field = "fullName" | "email" | "password" | "confirmPassword";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [emailExists, setEmailExists] = useState(false);
  const [emailAuthFailed, setEmailAuthFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*
   * Determines whether all fields currently contain valid values.
   * This controls whether the Create Account button is enabled.
   */
  const isFormValid =
    formData.fullName.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(formData.email) &&
    REQUIREMENTS.every((requirement) => requirement.test(formData.password)) &&
    formData.confirmPassword === formData.password &&
    formData.confirmPassword.length > 0;

  /*
   * Handles changes for every input.
   * It also removes that field's error as soon as the user starts typing.
   */
  function handleChange(field: Field, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear the field's validation error while typing.
    setErrors((prev) => {
      if (!prev[field]) return prev;

      const next = { ...prev };
      delete next[field];

      return next;
    });

    // Clear email-related API banners when the email changes.
    if (field === "email") {
      setEmailExists(false);
      setEmailAuthFailed(false);
    }

    /*
     * If the password changes, the previous confirm-password
     * mismatch may no longer be relevant.
     */
    if (field === "password") {
      setErrors((prev) => {
        if (!prev.confirmPassword) return prev;

        const next = { ...prev };
        delete next.confirmPassword;

        return next;
      });
    }
  }

  /*
   * Validates only the field the user has just left.
   */
  function validateField(field: Field) {
    const value = formData[field];
    let message = "";

    switch (field) {
      case "fullName":
        if (!value.trim()) {
          message = "Full name is required";
        }
        break;

      case "email":
        if (!value.trim()) {
          message = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          message = "Enter a valid email address";
        }
        break;

      case "password":
        if (!REQUIREMENTS.every((requirement) => requirement.test(value))) {
          message = "Password doesn't meet the requirements";
        }
        break;

      case "confirmPassword":
        if (!value) {
          message = "Please confirm your password";
        } else if (value !== formData.password) {
          message = "Passwords don't match";
        }
        break;
    }

    setErrors((prev) => {
      const next = { ...prev };

      if (message) {
        next[field] = message;
      } else {
        delete next[field];
      }

      return next;
    });
  }

  /*
   * Validates the complete form before sending the request.
   */
  function validateForm() {
    const next: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      next.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      next.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      next.email = "Enter a valid email address";
    }

    if (
      !REQUIREMENTS.every((requirement) => requirement.test(formData.password))
    ) {
      next.password = "Password doesn't meet the requirements";
    }

    if (!formData.confirmPassword) {
      next.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      next.confirmPassword = "Passwords don't match";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setEmailExists(false);
    setEmailAuthFailed(false);

    // Run complete validation before submitting.
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      storeAuthTokens(data.data);

      router.push(
        `/auth/verify-email?email=${encodeURIComponent(formData.email.trim())}`,
      );
    } catch (err: any) {
      if (err?.status === 409) {
        setEmailExists(true);

        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered",
        }));
      } else {
        setEmailAuthFailed(true);

        setErrors((prev) => ({
          ...prev,
          email: "We couldn't verify this email. Please try again.",
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="email-registration-page">
      {/* Existing account banner */}
      {emailExists && (
        <div className="mb-4">
          <FormBanner
            message="An account with this email already exists."
            actionLabel="Sign in instead"
            onAction={() => router.push("/auth/login")}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Full Name */}
        <AuthInput
          id="fullName"
          label="Full Name"
          placeholder="e.g. Sarah Johnson"
          value={formData.fullName}
          onChange={(value) => handleChange("fullName", value)}
          onBlur={() => validateField("fullName")}
          error={errors.fullName}
          autoComplete="name"
          required
        />

        {/* Email */}
        <AuthInput
          id="email"
          label="Email address"
          type="email"
          placeholder="sarah@example.com"
          value={formData.email}
          onChange={(value) => handleChange("email", value)}
          onBlur={() => validateField("email")}
          error={errors.email}
          autoComplete="email"
          required
        />

        {/* Password */}
        <PasswordInput
          id="password"
          label="Password"
          value={formData.password}
          onChange={(value) => handleChange("password", value)}
          onBlur={() => validateField("password")}
          error={errors.password}
        />

        {/* Confirm Password */}
        <PasswordInput
          id="confirmPassword"
          label="Confirm password"
          value={formData.confirmPassword}
          onChange={(value) => handleChange("confirmPassword", value)}
          onBlur={() => validateField("confirmPassword")}
          error={errors.confirmPassword}
        />

        {/* Password Requirements */}
        <ul
          aria-label="Password requirements"
          className="-mt-2 flex flex-col gap-1 text-xs text-neutral-500"
        >
          {REQUIREMENTS.map((requirement) => (
            <li
              key={requirement.label}
              className={
                requirement.test(formData.password)
                  ? "text-(--color-action-primary)"
                  : ""
              }
            >
              • {requirement.label}
            </li>
          ))}
        </ul>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`mt-2 rounded-full py-3 text-sm font-bold transition-all duration-250 disabled:cursor-not-allowed disabled:opacity-60 ${
            isFormValid && !isSubmitting
              ? "cursor-pointer bg-(--color-action-primary) text-white hover:-translate-y-0.5 hover:bg-(--color-action-primary-hover) hover:shadow-[0_8px_20px_rgba(99,91,255,0.3)] active:translate-y-0"
              : "cursor-not-allowed bg-(--color-bg-surface) text-(--color-text-subtle)"
          }`}
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {/* Login link */}
      <div className="mt-6">
        <p className="text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-(--color-action-primary) transition-colors hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
