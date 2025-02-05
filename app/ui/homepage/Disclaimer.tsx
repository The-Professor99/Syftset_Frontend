import * as React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

export default function Disclaimer() {
  return (
    <Container maxWidth="md" id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        sx={{ color: "text.secondary" }}
      >
        This website is for informational purposes only. It does not constitute
        an offer to sell, a solicitation to buy, or a recommendation for any
        security or investment strategy.
      </Typography>
      <Typography
        component="strong"
        // variant="subtitle2"
        align="center"
        sx={{ color: "text.secondary", display: "block" }}
      >
        PAST PERFORMANCE IS NO GUARANTEE OF FUTURE RESULTS.
      </Typography>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        sx={{ color: "text.secondary" }}
      >
        Investing involves risk, including potential loss of capital.
      </Typography>
    </Container>
  );
}
