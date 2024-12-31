import * as React from "react";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import AppAppBar from "../components/template_components/AppAppBar";
import Footer from "../components/template_components/Footer";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <Box>
      <AppAppBar />
      {props.children}
      <Divider />
      <Footer />
    </Box>
  );
}
