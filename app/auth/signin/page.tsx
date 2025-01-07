"use client";
import * as React from "react";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import { SignInPage } from "@toolpad/core/SignInPage";
import { providerMap } from "../../../auth";
import signIn from "./actions";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Password, SupportAgent } from "@mui/icons-material";
import { appRoutes } from "@/app/lib/routes";

function ForgotPasswordLink() {
  return (
    <span>
      <Link fontSize="0.75rem" href={appRoutes.forgotPassword}>
        Forgot password?
      </Link>
    </span>
  );
}

function SignUpLink() {
  const websiteUrl = process.env.NEXT_PUBLIC_LIVE_URL;
  return (
    <Alert severity="info">
      Access to this website ({websiteUrl}) is by invitation only.
      <List sx={{ px: 0 }}>
        <ListItem sx={{ p: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }}>
          <ListItemIcon sx={{ color: "inherit", mr: 2 }}>
            <Password />
          </ListItemIcon>
          <ListItemText
            primary="To set up your password, please use the link included in your invitation email."
            slotProps={{ primary: { fontSize: 14, fontWeight: "medium" } }}
          />
        </ListItem>

        <ListItem sx={{ p: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }}>
          <ListItemIcon sx={{ color: "inherit", mr: 2 }}>
            <SupportAgent />
          </ListItemIcon>
          <ListItemText
            primary="If you think you should have received an invitation but didn’t, kindly reach out to our support team for help."
            slotProps={{ primary: { fontSize: 14, fontWeight: "medium" } }}
          />
        </ListItem>
      </List>
    </Alert>
  );
}

function DemoInfo() {
  return null;
}

export default function SignIn() {
  return (
    <SignInPage
      providers={providerMap}
      signIn={signIn}
      slots={{
        forgotPasswordLink: ForgotPasswordLink,
        signUpLink: SignUpLink,
        subtitle: DemoInfo,
      }}
    />
  );
}
