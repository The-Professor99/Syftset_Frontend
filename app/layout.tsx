import * as React from "react";
import { AppProvider } from "@toolpad/core/nextjs";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Navigation } from "@toolpad/core/AppProvider";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import theme from "../theme";
import { auth } from "../auth";
import Link from "next/link";
import SitemarkIcon from "./components/template_components/SitemarkIcon";
import { MoveToInbox, Outbox } from "@mui/icons-material";

const NAVIGATION: Navigation = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    segment: "dashboard",
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Dashboard Pages",
  },
  {
    title: "Transactions",
    icon: <MoveToInbox />,
    segment: "dashboard/transactions",
  },
];

const AUTHENTICATION = {
  signIn,
  signOut,
};

const BRANDING = {
  // logo: <SitemarkIcon />, console.log
  title: "Syftset",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body>
        <SessionProvider session={session}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <AppProvider
              theme={theme}
              navigation={NAVIGATION}
              session={session}
              authentication={AUTHENTICATION}
              branding={BRANDING}
            >
              {children}
            </AppProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
