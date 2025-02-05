"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const tiers = [
  {
    title: "Basic",
    price: "100",
    description: [
      { header: "", line: "Start with a low investment." },
      { header: "Profit Split", line: "70% to Investor | 30% to Syftset" },
      { header: "Trading Session Duration", line: "35–45 days" },
      { header: "Withdrawal Options", line: "After each session" },
      { header: "Reinvestment", line: "Optional" },
      {
        header: "",
        line: "All transactions, profits, and distributions are fully visible through our investor dashboard, ensuring trust and clarity at all times.",
      },
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
    buttonColor: "primary",
  },
  {
    title: "Standard",
    subheader: "Recommended",
    price: "1000",
    description: [
      { header: "", line: "Larger investments." },
      { header: "Profit Split", line: "75% to Investor | 25% to Syftset" },
      { header: "Trading Session Duration", line: "35–45 days" },
      { header: "Withdrawal Options", line: "After each session" },
      { header: "Reinvestment", line: "Optional" },
      {
        header: "",
        line: "All transactions, profits, and distributions are fully visible through our investor dashboard, ensuring trust and clarity at all times.",
      },
    ],
    buttonText: "Start now",
    buttonVariant: "contained",
    buttonColor: "secondary",
  },
  {
    title: "Custom",
    price: "10000",
    description: [
      { header: "Profit Split", line: "Based on deposit size and commitment" },
      { header: "Trading Session Duration", line: "35–45 days" },
      { header: "Withdrawal Options", line: "After each session" },
      { header: "Reinvestment", line: "Optional" },
      {
        header: "",
        line: "All transactions, profits, and distributions are fully visible through our investor dashboard, ensuring trust and clarity at all times.",
      },
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined",
    buttonColor: "primary",
  },
];

export default function ProfitModel() {
  return (
    <Container
      id="model"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Profit-Sharing Model
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Our investment plans are built to align with your financial goals.
          With a performance-based profit-sharing model, we earn only when your
          investments grow.
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ alignItems: "center", justifyContent: "center", width: "100%" }}
      >
        {tiers.map((tier) => (
          <Grid
            size={{ xs: 12, sm: tier.title === "Enterprise" ? 12 : 6, md: 4 }}
            key={tier.title}
          >
            <Card
              sx={[
                {
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                },
                tier.title === "Standard" &&
                  ((theme) => ({
                    border: "none",
                    background:
                      "radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))",
                    boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
                    ...theme.applyStyles("dark", {
                      background:
                        "radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))",
                      boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
                    }),
                  })),
              ]}
            >
              <CardContent>
                <Box
                  sx={[
                    {
                      mb: 1,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                    },
                    tier.title === "Standard"
                      ? { color: "grey.100" }
                      : { color: "" },
                  ]}
                >
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {/* {tier.title === "Standard" && (
                    <Chip icon={<AutoAwesomeIcon />} label={tier.subheader} />
                  )} */}
                </Box>
                {/* <Box
                  sx={[
                    {
                      display: "flex",
                      alignItems: "baseline",
                    },
                    tier.title === "Standard"
                      ? { color: "grey.50" }
                      : { color: null },
                  ]}
                >
                  <Typography component="h3" variant="h2">
                    ${tier.price}
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp; per month
                  </Typography>
                </Box> */}
                <Divider sx={{ my: 2, opacity: 0.8, borderColor: "divider" }} />
                {tier.description.map((description) => (
                  <Box
                    key={description.line}
                    sx={{
                      py: 1,
                      display: "flex",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={[
                        {
                          width: 20,
                        },
                        tier.title === "Standard"
                          ? { color: "primary.light" }
                          : { color: "primary.main" },
                      ]}
                    />
                    <Typography
                      variant="subtitle2"
                      component={"span"}
                      sx={[
                        tier.title === "Standard"
                          ? { color: "grey.50" }
                          : { color: null },
                      ]}
                    >
                      {description.header ? (
                        <Typography
                          component="span"
                          sx={{ fontWeight: "bold" }}
                        >
                          {description.header}:{" "}
                        </Typography>
                      ) : null}
                      {description.line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              {/* <CardActions>
                <Button
                  fullWidth
                  variant={tier.buttonVariant as "outlined" | "contained"}
                  color={tier.buttonColor as "primary" | "secondary"}
                >
                  {tier.buttonText}
                </Button>
              </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
