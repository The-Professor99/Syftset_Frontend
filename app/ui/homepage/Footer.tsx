import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";
import Copyright from "../Copyright";
import { BRANDING } from "@/app/layout";
import { AppTitle } from "../AppTitle";
import { Facebook, YouTube } from "@mui/icons-material";

export default function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <AppTitle branding={BRANDING} />
            <Typography
              variant="body2"
              gutterBottom
              sx={{ fontWeight: 600, mt: 2 }}
            >
              Automated Trading, Smarter Investing.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            Product
          </Typography>
          <Link color="text.secondary" variant="body2" href="#features">
            Features
          </Link>
          <Link color="text.secondary" variant="body2" href="#process">
            Our Process
          </Link>
          <Link color="text.secondary" variant="body2" href="#model">
            Our Model
          </Link>
          <Link color="text.secondary" variant="body2" href="#faq">
            FAQs
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            Legal
          </Typography>
          <Link
            color="text.secondary"
            variant="body2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/document/d/e/2PACX-1vRReIqIAwJe8S0wo2mTQ1uWGnwoq1yCLBPCB_Kb2aU07X_65gIJvQbCc-PYjHGMPAaT0svGU2U5P3mA/pub"
          >
            Terms
          </Link>
          <Link
            color="text.secondary"
            variant="body2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/document/d/e/2PACX-1vSHvi6sXC02SzCxWoRwNi1UaWnvn6qbmyyVKV2sAbbZnka2XIWHqVLAsuvvA034n7E-sPhWcMXlJ5Zz/pub"
          >
            Privacy
          </Link>
          <Link
            color="text.secondary"
            variant="body2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/document/d/e/2PACX-1vTfUwHivpeM_EAC7yMiSF7B-3SVQmuVpSFtjJ8h6br4eUX91uzHFBU8ItjVYgN4DlLOejFK5NqCqWQa/pub"
          >
            Risk Disclosure
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <div>
          <Link
            color="text.secondary"
            target="_blank"
            rel="noopener noreferrer"
            variant="body2"
            href="https://docs.google.com/document/d/e/2PACX-1vSHvi6sXC02SzCxWoRwNi1UaWnvn6qbmyyVKV2sAbbZnka2XIWHqVLAsuvvA034n7E-sPhWcMXlJ5Zz/pub"
          >
            Privacy Policy
          </Link>
          <Typography sx={{ display: "inline", mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link
            color="text.secondary"
            variant="body2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/document/d/e/2PACX-1vRReIqIAwJe8S0wo2mTQ1uWGnwoq1yCLBPCB_Kb2aU07X_65gIJvQbCc-PYjHGMPAaT0svGU2U5P3mA/pub"
          >
            Terms of Service
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: "left", color: "text.secondary" }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="https://twitter.com/syftsetTech?ref_src=twsrc%5Etfw"
            aria-label="X"
            sx={{ alignSelf: "center" }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://www.linkedin.com/company/syftset-technologies"
            aria-label="LinkedIn"
            sx={{ alignSelf: "center" }}
          >
            <LinkedInIcon color="info" />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://fb.me/syftsetTech"
            aria-label="Facebook"
            sx={{ alignSelf: "center" }}
          >
            <Facebook color="primary" />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://www.youtube.com/channel/UCDdbqhM0qhykeePdZMM7vmg"
            aria-label="Youtube"
            sx={{ alignSelf: "center" }}
          >
            <YouTube color="error" />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
