"use client";
import { AccountMode, AccountModeDetails } from "@/app/lib/types";
import AccountModesDisplay from "../AccountModesDisplay";
import { Grid2 as Grid } from "@mui/material";
import OverviewCard from "../Cards/OverviewCard";
import { useLocalStorageState } from "@toolpad/core";
import { AccountBalance, Download, Upload } from "@mui/icons-material";
import { appRoutes } from "@/app/lib/routes";

export default function OverviewDisplay({
  accountsDetails,
}: {
  accountsDetails: AccountModeDetails[];
}) {
  const [currentAccountMode, setCurrentAccountMode] =
    useLocalStorageState<AccountMode>("accountMode", "crypto-1");
  const currentAccountDetails = accountsDetails.find(
    (accountDetail) => accountDetail.accountMode === currentAccountMode
  );

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
          accountsDetails={accountsDetails}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        {/* Account Balance */}
        <OverviewCard
          details={{
            title: "Account Balance",
            value: `$${currentAccountDetails?.balance || 0}`,
          }}
          slots={{
            icon: <AccountBalance />,
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        {/* Deposits */}
        <OverviewCard
          details={{
            title: "Total Deposit",
            value: `$${currentAccountDetails?.totalDeposits || 0}`,
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
            value: `$${currentAccountDetails?.totalWithdrawals || 0}`,
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
