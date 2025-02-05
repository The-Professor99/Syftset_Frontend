import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  HourglassBottom,
  HourglassTop,
  MoveToInbox,
  Outbox,
  QueryStatsRounded,
  RestartAlt,
} from "@mui/icons-material";

const items = [
  {
    icon: <MoveToInbox />,
    title: "Deposit Funds",
    description: "Start by depositing funds into your Syftset account.",
  },
  {
    icon: <HourglassTop />,
    title: "Trading Session Begins",
    description:
      "Our trading algorithms start trading on your behalf, optimizing execution and managing risk for maximum returns.",
  },
  {
    icon: <HourglassBottom />,
    title: "Trading Session Ends",
    description:
      "Once the session concludes, the profits are calculated and split between you and Syftset based on a pre-agreed percentage.",
  },
  {
    icon: <Outbox />,
    title: "Withdraw or Reinvest",
    description:
      "You can choose to withdraw your profits or reinvest them into the next trading session. The choice is yours!",
  },
  {
    icon: <RestartAlt />,
    title: "Next Session Starts",
    description:
      "If you choose to reinvest, the process repeats with a new trading session, allowing your portfolio to grow sustainably over time.",
  },
  {
    icon: <QueryStatsRounded />,
    title: "Track Your Performance",
    description:
      "Monitor your investments and earnings through our intuitive dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <Box
      id="process"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "grey.900",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            At Syftset, we’ve designed a seamless and transparent process to
            make automated trading accessible and rewarding. Here’s how it
            works:
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: "inherit",
                  p: 3,
                  height: "100%",
                  borderColor: "hsla(220, 25%, 25%, 0.3)",
                  backgroundColor: "grey.800",
                }}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography
                    gutterBottom
                    sx={{ fontWeight: "medium" }}
                    component="p"
                    variant="h6"
                  >
                    <Typography component="span" variant="body1">
                      {index + 1 < 10 ? 0 : null}
                      {index + 1}.
                    </Typography>{" "}
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
