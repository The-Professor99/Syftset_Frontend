import { placeTransactionRequest } from "@/app/api";
import { getCommonTextFieldProps } from "@/app/auth/utils";
import { AccountMode, accountModes as allAccountModes } from "@/app/lib/types";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useSession } from "@toolpad/core";
import React from "react";

export const accountModesMap = {
  "crypto-1": { name: "Crypto - Batch A", minDeposit: 100, maxDeposit: 10000 },
  "forex-1": { name: "Forex - Batch A", minDeposit: 1000, maxDeposit: 25000 },
  "crypto-2": { name: "Crypto - Batch B", minDeposit: 100, maxDeposit: 10000 },
  "forex-2": { name: "Forex - Batch B", minDeposit: 1000, maxDeposit: 25000 },
};

/**
 *
 * @param isInitialDeposit Specifies if new account or existing account
 * @returns
 */
export function AddDeposit({
  open,
  setOpen,
  userAccountModes,
  isInitialDeposit,
  dialogTitle = "Deposit Request Form",
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userAccountModes: AccountMode[];
  isInitialDeposit: boolean;
  dialogTitle?: string;
}) {
  const session = useSession();
  const theme = useTheme();

  const [{ loading, error, success }, setFormStatus] = React.useState<{
    loading: boolean;
    error?: string;
    success?: string;
  }>({
    loading: false,
    error: "",
    success: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  let eligibleAccountModes;
  if (isInitialDeposit) {
    eligibleAccountModes = allAccountModes.filter(
      (accountMode) => !userAccountModes.includes(accountMode)
    );
  } else {
    eligibleAccountModes = userAccountModes;
  }

  const initialSelectedAccountMode = eligibleAccountModes[0];
  const [selectedAccountMode, setSelectedAccountMode] = React.useState(
    initialSelectedAccountMode
  );

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {success ? (
            <Alert sx={{ my: 2 }} severity="success">
              {success}
            </Alert>
          ) : (
            <Alert sx={{ my: 2 }} severity="info">
              Once you fill out and submit this request, we will send you an
              email with the account details for making the payment.
            </Alert>
          )}

          {error ? (
            <Alert sx={{ my: 2 }} severity="error">
              {error}
            </Alert>
          ) : null}
          <Box
            component="form"
            onSubmit={async (event) => {
              setFormStatus({
                error: "",
                loading: true,
              });
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const accountResponse = await placeTransactionRequest(
                formData,
                isInitialDeposit,
                "deposit"
              );
              setFormStatus((prev) => ({
                ...prev,
                loading: false,
                error: accountResponse?.error,
                success: accountResponse?.success,
              }));
            }}
          >
            <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
              <TextField
                {...getCommonTextFieldProps(theme, {
                  label: "Email",
                  placeholder: "your@email.com",
                  id: "email",
                  name: "email",
                  type: "email",
                  autoComplete: "email",
                  value: session?.user?.email || "",
                  "aria-readonly": true,
                })}
              />
              <TextField
                {...getCommonTextFieldProps(theme, {
                  label: "Account Mode",
                  placeholder: "Please select account mode",
                  id: "accountMode",
                  name: "accountMode",
                  autoFocus: true,
                  select: true,
                  defaultValue: initialSelectedAccountMode,
                  onChange: (event) =>
                    setSelectedAccountMode(event.target.value as AccountMode),
                })}
              >
                {eligibleAccountModes.map((accountMode) => (
                  <MenuItem key={accountMode} value={accountMode}>
                    {accountModesMap[accountMode]?.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                {...getCommonTextFieldProps(theme, {
                  label: `${isInitialDeposit ? "Initial " : ""}Deposit(USD)`,
                  placeholder: `${isInitialDeposit ? "Starting capital." : "Topup amount."} Eg: 250`,
                  id: "capital",
                  name: "capital",
                  type: "number",
                  slotProps: {
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    },
                    htmlInput: {
                      min: accountModesMap[selectedAccountMode]?.minDeposit,
                      max: accountModesMap[selectedAccountMode]?.maxDeposit,
                    },
                  },
                  helperText:
                    isInitialDeposit &&
                    "Please note: Your account will only be opened after the deposit has been successfully made.",
                })}
              />
            </Stack>

            <LoadingButton
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              disableElevation
              color="primary"
              loading={loading}
              sx={{
                mt: 3,
                mb: 2,
                textTransform: "capitalize",
              }}
            >
              Submit Request
            </LoadingButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
