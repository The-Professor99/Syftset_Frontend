"use client";

import * as React from "react";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/material";
import Hero from "../ui/homepage/Hero";
import LogoCollection from "../ui/homepage/LogoCollection";
import Features from "../ui/homepage/Features";
import Testimonials from "../ui/homepage/Testimonials";
import Highlights from "../ui/homepage/Highlights";
import Pricing from "../ui/homepage/Pricing";
import FAQ from "../ui/homepage/FAQ";

export default function Page(props: { disableCustomTheme?: boolean }) {
  return (
    <Box>
      <Hero />
      <LogoCollection />
      <Features />
      <Divider />
      <Testimonials />
      <Divider />
      <Highlights />
      <Divider />
      <Pricing />
      <Divider />
      <FAQ />
    </Box>
  );
}
