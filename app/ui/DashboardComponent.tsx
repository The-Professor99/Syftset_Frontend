"use client";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import RecentActiviesCard from "./Cards/RecentActivityCard";
import PnLSummaryCard from "./Cards/PnLSummaryCard";
import OverviewDisplay from "./Overview/OverviewDisplay";
import { AccountMode, AccountModeDetails } from "../lib/types";
import { useLocalStorageState } from "@toolpad/core";
import { useRemoteService } from "../lib/hooks";
import SessionsPerformanceCard from "./Cards/SessionsPerformanceCard";
import UserSessionsCard from "./Cards/SessionsDetailsCard";

export default function DashboardContent() {
  const [currentAccountMode, setCurrentAccountMode] =
    useLocalStorageState<AccountMode>("accountMode", "crypto-1");

  // console.log build loading and error pages for the components dependent on this
  const {
    data: allAcountsDetails,
    loading,
    error,
    errorMessage,
  } = useRemoteService<AccountModeDetails[]>({
    url: "/api/accounts/details",
    initialData: [],
    dependencies: [currentAccountMode],
    shouldFetch: !!currentAccountMode,
  });

  const currentAccountDetails = allAcountsDetails.find(
    (accountDetail) => accountDetail.accountMode === currentAccountMode
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          overflow: "auto",
        })}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              Overview
            </Typography>
            <OverviewDisplay
              currentAccountDetails={currentAccountDetails}
              setCurrentAccountMode={setCurrentAccountMode}
              currentAccountMode={currentAccountMode}
              allAcountsDetails={allAcountsDetails}
            />
            <Grid
              container
              spacing={2}
              sx={{ mb: (theme) => theme.spacing(2) }}
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <RecentActiviesCard currentAccountMode={currentAccountMode} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <PnLSummaryCard
                  loading={loading}
                  error={error}
                  errorMessage={errorMessage}
                  currentAccountDetails={currentAccountDetails}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <SessionsPerformanceCard
                  currentAccountMode={currentAccountMode}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <UserSessionsCard currentAccountMode={currentAccountMode} />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
