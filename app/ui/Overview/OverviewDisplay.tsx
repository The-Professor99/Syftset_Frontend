"use client";
import { AccountMode, AccountModeDetails } from "@/app/lib/types";
import AccountModesDisplay from "../AccountModesDisplay";
import { Grid2 as Grid, Typography } from "@mui/material";
import OverviewCard from "../Cards/OverviewCard";
import { useLocalStorageState } from "@toolpad/core";
import { AccountBalance, Download, Upload } from "@mui/icons-material";
import { appRoutes } from "@/app/lib/routes";
import { fShortenNumber } from "@/app/lib/utils";

export default function OverviewDisplay({
  allAcountsDetails,
  currentAccountMode,
  setCurrentAccountMode,
  currentAccountDetails,
}: {
  allAcountsDetails: AccountModeDetails[];
  currentAccountMode: AccountMode | null;
  setCurrentAccountMode: React.Dispatch<
    React.SetStateAction<AccountMode | null>
  >;
  currentAccountDetails?: AccountModeDetails;
}) {
  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        {/* Account Modes */}
        <AccountModesDisplay
          currentAccountMode={currentAccountMode}
          setCurrentAccountMode={setCurrentAccountMode}
          accountsDetails={allAcountsDetails}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        {/* Account Balance */}
        <OverviewCard
          details={{
            title: "Account Balance",
            value: `$${fShortenNumber(currentAccountDetails?.balance || 0)}`,
          }}
          slots={{
            icon: <AccountBalance />,
            actionButton: currentAccountDetails?.referral_earnings ? (
              <Typography variant="body2" color="text.secondary">
                Referral Earning: $
                {fShortenNumber(currentAccountDetails.referral_earnings)}
              </Typography>
            ) : null,
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        {/* Deposits */}
        <OverviewCard
          details={{
            title: "Total Deposit",
            value: `$${fShortenNumber(currentAccountDetails?.total_deposits || 0)}`,
            button: {
              text: "View Deposits",
              link: appRoutes.deposits,
            },
          }}
          slotProps={{
            button: {
              variant: "outlined",
              startIcon: <Download />,
              color: "secondary",
            },
            value: {
              sx: {
                mb: "16px",
              },
            },
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        {/* Withdrawals */}
        <OverviewCard
          details={{
            title: "Total Withdrawals",
            value: `$${fShortenNumber(currentAccountDetails?.total_withdrawals || 0)}`,
            button: {
              text: "View Withdrawals",
              link: appRoutes.withdrawals,
            },
          }}
          slotProps={{
            button: {
              variant: "outlined",
              startIcon: <Upload />,
              color: "secondary",
            },
            value: {
              sx: {
                mb: "16px",
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
