import { CircularProgress, Box, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        color: "text.primary",
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6">Loading...</Typography>
    </Box>
  );
}
