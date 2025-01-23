import * as React from "react";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import AppAppBar from "../ui/homepage/AppAppBar";
import Footer from "../ui/homepage/Footer";

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
