"use client";

import * as React from "react";
import Divider from "@mui/material/Divider";
import Hero from "../components/template_components/Hero";
import LogoCollection from "../components/template_components/LogoCollection";
import Highlights from "../components/template_components/Highlights";
import Pricing from "../components/template_components/Pricing";
import Features from "../components/template_components/Features";
import Testimonials from "../components/template_components/Testimonials";
import FAQ from "../components/template_components/FAQ";
import { Box } from "@mui/material";

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
