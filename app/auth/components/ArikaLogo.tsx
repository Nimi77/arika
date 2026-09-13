import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";

export default function ArikaLogo() {
  return (
    <Link href="/" aria-label="Arika home" className="mb-6 flex justify-center">
      <Image
        src={logo}
        alt=""
        width={70}
        height={70}
        className="h-12 w-auto"
        priority
      />
    </Link>
  );
}
