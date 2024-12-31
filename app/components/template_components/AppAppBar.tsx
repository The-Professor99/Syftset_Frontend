"use client";

import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Sitemark from "./SitemarkIcon";
import Link from "next/link";
import { appRoutes } from "@/app/_helpers/routes";
import SidebarFooterAccount from "@/app/dashboard/SidebarFooterAccount";
import { Dashboard } from "@mui/icons-material";
import { useSession } from "@toolpad/core";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const user = session?.user;

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navItems = [
    { name: "Features", link: "#features" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Highlights", link: "#highlights" },
    { name: "Pricing", link: "#pricing" },
    { name: "FAQ", link: "#faq" },
    { name: "Blog", link: "#" },
  ];

  const accountMenuItems = [
    {
      name: "Dashboard",
      icon: <Dashboard />,
      link: "/dashboard",
    },
  ];

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Sitemark />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {navItems.map((navItem) => (
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  LinkComponent={Link}
                  href={navItem.link}
                  key={navItem.name}
                >
                  {navItem.name}
                </Button>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {user ? (
              <SidebarFooterAccount mini extraPages={accountMenuItems} />
            ) : (
              <>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  LinkComponent={Link}
                  href={appRoutes.signIn}
                >
                  Sign in
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            {user ? (
              <SidebarFooterAccount mini extraPages={accountMenuItems} />
            ) : null}
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {navItems.map((navItem) => (
                  <MenuItem
                    LinkComponent={Link}
                    href={navItem.link}
                    key={navItem.name}
                  >
                    {navItem.name}
                  </MenuItem>
                ))}
                {!user ? (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        LinkComponent={Link}
                        href={appRoutes.signIn}
                      >
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                ) : null}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
