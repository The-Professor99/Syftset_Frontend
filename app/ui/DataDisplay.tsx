import React, { ReactNode, ElementType } from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import SubjectIcon from "@mui/icons-material/Subject";

interface DataDisplayProps {
  children?: ReactNode;
  noData?: boolean;
  loading?: boolean;
  error?: boolean;
  noDataText?: string;
  loadingText?: string;
  errorMessage?: string;
  [key: string]: any; // To allow additional props
}

const DataDisplay = ({
  children,
  noData = false,
  loading = false,
  error = false,
  noDataText = "No data found!",
  loadingText = "Fetching data...",
  errorMessage = "An error occurred while fetching data.",
  ...others
}: DataDisplayProps) => {
  if (!noData) {
    // Render children if there's data
    return children ? <>{children}</> : null;
  }

  const renderState = () => {
    if (loading) {
      return (
        <>
          <CircularProgress />
          <Typography sx={{ textAlign: "center" }} component="div">
            {loadingText}
          </Typography>
        </>
      );
    }

    if (error) {
      return (
        <>
          <Box sx={{ my: 2 }}>
            <ReportProblemIcon />
          </Box>
          <Typography sx={{ textAlign: "center" }} component="div">
            {errorMessage}
          </Typography>
        </>
      );
    }

    return (
      <>
        <Box sx={{ my: 2 }}>
          <SubjectIcon />
        </Box>
        <Typography sx={{ textAlign: "center" }} component="div">
          {noDataText}
        </Typography>
      </>
    );
  };

  return (
    <Paper
      className="DataDisplay"
      data-testid="DataDisplay"
      sx={{ py: 2, height: "100%", overflow: "hidden" }}
      elevation={0}
      {...others}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        {renderState()}
      </Box>
    </Paper>
  );
};

export default DataDisplay;
