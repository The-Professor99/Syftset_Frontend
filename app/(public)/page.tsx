import * as React from "react";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/material";
import Hero from "../ui/homepage/Hero";
import Disclaimer from "../ui/homepage/Disclaimer";
import Features from "../ui/homepage/Features";
import HowItWorks from "../ui/homepage/HowItWorks";
import ProfitModel from "../ui/homepage/ProfitModel";
import FAQ from "../ui/homepage/FAQ";

export default function Page() {
  return (
    <Box>
      <Hero />
      <Features />
      <Divider />
      <HowItWorks />
      <Divider />
      <ProfitModel />
      <Divider />
      <FAQ />
      <Divider />
      <Disclaimer />
    </Box>
  );
}
