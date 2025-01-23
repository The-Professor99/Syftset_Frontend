import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material";
import Link from "next/link";

// Copied from Toolpad's AppTitle Implementation => https://github.com/mui/toolpad/blob/master/packages/toolpad-core/src/DashboardLayout/AppTitle.tsx
const LogoContainer = styled("div")({
  position: "relative",
  height: 40,
  "& img": {
    maxHeight: 40,
  },
});

export interface Branding {
  title: string;
  logo: React.ReactNode;
  homeUrl?: string;
}

export interface AppTitleProps {
  branding: Branding;
}

export function AppTitle(props: AppTitleProps) {
  const theme = useTheme();
  const title = props.branding.title;
  return (
    <Link
      href={props.branding.homeUrl ?? "/"}
      style={{ textDecoration: "none" }}
    >
      <Stack direction="row" alignItems="center">
        <LogoContainer>{props.branding.logo}</LogoContainer>
        <Typography
          variant="h6"
          sx={{
            color: (theme.vars ?? theme).palette.primary.main,
            fontWeight: "700",
            ml: 1,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>
      </Stack>
    </Link>
  );
}
