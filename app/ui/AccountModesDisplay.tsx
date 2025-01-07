import * as React from "react";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  AccountMode,
  AccountModeDetails,
  accountModes as allAccountModes,
} from "@/app/lib/types";
import { Add, SwitchAccount, Wallet } from "@mui/icons-material";
import { MenuList, Popover, Stack } from "@mui/material";
import OverviewCard from "./Cards/OverviewCard";
import { accountModesMap, AddDeposit } from "./TransactionPopOvers/AddDeposit";

export default function AccountModesDisplay({
  accountsDetails,
  currentAccountMode,
  setCurrentAccountMode,
}: {
  accountsDetails: AccountModeDetails[];
  currentAccountMode: AccountMode | null;
  setCurrentAccountMode: React.Dispatch<
    React.SetStateAction<AccountMode | null>
  >;
}) {
  const accountModes = accountsDetails.map(
    (accountDetail) => accountDetail.accountMode
  );
  const [addAccount, setAddAccount] = React.useState(false);

  return (
    <>
      <OverviewCard
        details={{
          title: "Account",
          value: currentAccountMode
            ? accountModesMap[currentAccountMode]?.name
            : "",
        }}
        slotProps={{
          title: {
            sx: {
              fontWeight: "600",
            },
          },
          value: {
            variant: "body1",
            sx: {
              color: "text.secondary",
              mb: "16px",
            },
          },
        }}
        slots={{
          actionButton: (
            <AccountModeSwitchOver
              accountModes={accountModes}
              currentAccountMode={currentAccountMode}
              setCurrentAccountMode={setCurrentAccountMode}
              setAddAccount={setAddAccount}
            />
          ),
          icon: <Wallet />,
        }}
      />

      <AddDeposit
        open={addAccount}
        setOpen={setAddAccount}
        userAccountModes={accountModes}
        isInitialDeposit
        dialogTitle="Request Additional Account"
      />
    </>
  );
}

function AccountModeSwitchOver({
  accountModes,
  currentAccountMode,
  setCurrentAccountMode,
  setAddAccount,
}: {
  accountModes: AccountMode[];
  currentAccountMode: AccountMode | null;
  setCurrentAccountMode: React.Dispatch<
    React.SetStateAction<AccountMode | null>
  >;
  setAddAccount: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccountSwitch = (accountMode: AccountMode) => {
    setCurrentAccountMode(accountMode);
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClick}
        endIcon={<SwitchAccount />}
        fullWidth={isSmallScreen}
      >
        Switch Account
      </Button>

      <Popover
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: (theme) =>
                `drop-shadow(0px 2px 8px ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.32)"})`,
              mt: 1,
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        <Stack direction="column">
          <MenuList sx={{ gap: theme.spacing(1) }}>
            {accountModes.map((accountMode) => (
              <Button
                variant="text"
                sx={{
                  textTransform: "capitalize",
                  display: "flex",
                  mx: "auto",
                  justifyContent: "flex-start",
                  bgcolor:
                    currentAccountMode === accountMode
                      ? theme.palette.mode === "dark"
                        ? theme.palette.grey[700]
                        : theme.palette.grey[200]
                      : "initial",
                }}
                size="small"
                fullWidth
                disableElevation
                key={accountMode}
                onClick={() => handleAccountSwitch(accountMode)}
              >
                {accountModesMap[accountMode]?.name}
              </Button>
            ))}
            {allAccountModes.length !== accountModes.length ? (
              <Button
                variant="outlined"
                sx={{
                  textTransform: "capitalize",
                  display: "flex",
                  mx: "auto",
                  justifyContent: "flex-start",
                }}
                size="small"
                fullWidth
                disableElevation
                startIcon={<Add />}
                onClick={() => setAddAccount(true)}
              >
                Add Account
              </Button>
            ) : null}
          </MenuList>
        </Stack>
      </Popover>
    </>
  );
}
