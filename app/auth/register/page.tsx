"use client";

import Link from "next/link";
import { MailIcon } from "lucide-react";
import SocialAuthButtons from "../components/SocialAuthButtons";

export default function RegisterPage() {
 return (
   <div className="register-authentication-page flex w-full flex-col items-center gap-6">
     <div className="auth-buttons-container w-full">
       <SocialAuthButtons/>

       <Link
         href="/auth/register/email"
         className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-(--color-surface) py-3 text-xs font-medium border border-transparent hover:border-(--color-accent) transition-colors"
       >
         <MailIcon width={18} height={18} />
         Sign up with Email
       </Link>
     </div>

     <div className="login-link">
       <p className="text-sm text-center text-neutral-500">
         Already have an account?{" "}
         <Link
           href="/auth/login"
           className="text-(--color-accent) hover:underline"
         >
           Login
         </Link>
       </p>
     </div>
   </div>
 );
}
