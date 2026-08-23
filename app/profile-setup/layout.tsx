import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";

export default function ProfileSetupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-10 sm:px-6 sm:py-14">
      <Link href="/" aria-label="Arika home" className="mb-8">
        <Image
          src={logo}
          alt=""
          width={70}
          height={70}
          className="h-8 w-auto"
          priority
        />
      </Link>

      <main className="w-full max-w-lg">{children}</main>
    </div>
  );
}
