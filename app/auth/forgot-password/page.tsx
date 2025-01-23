"use client";
import { providerMap } from "../../../auth";
import forgotPassword from "./actions";
import * as React from "react";
import Link from "@mui/material/Link";
import ForgotPasswordPage from "./components";
import { appRoutes } from "@/app/lib/routes";
import { BRANDING } from "@/app/layout";

function SignUpLink() {
  return (
    <span style={{ fontSize: "0.8rem" }}>
      Back to&nbsp;<Link href={appRoutes.signIn}>Login Page</Link>
    </span>
  );
}

export default function ForgotPassword() {
  return (
    <ForgotPasswordPage
      providers={providerMap}
      forgotPassword={forgotPassword}
      slots={{
        signUpLink: SignUpLink,
      }}
      branding={BRANDING}
    />
  );
}
