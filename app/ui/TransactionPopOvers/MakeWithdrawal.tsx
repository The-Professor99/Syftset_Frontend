import { placeTransactionRequest } from "@/app/api";
import { getCommonTextFieldProps } from "@/app/auth/utils";
import { AccountMode } from "@/app/lib/types";
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
import { accountModesMap } from "./AddDeposit";

export function MakeWithdrawal({
  open,
  setOpen,
  currentAccountMode,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentAccountMode: AccountMode;
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

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Withdrawal Request Form</DialogTitle>
        <DialogContent>
          {success ? (
            <Alert sx={{ my: 2 }} severity="success">
              {success}
            </Alert>
          ) : null}

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
                false,
                "withdrawal"
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
                  value: currentAccountMode,
                  "aria-readonly": true,
                })}
              >
                {[currentAccountMode].map((accountMode) => (
                  <MenuItem key={accountMode} value={accountMode}>
                    {accountModesMap[accountMode]?.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                {...getCommonTextFieldProps(theme, {
                  label: "Amount (USD)",
                  placeholder: "Withdrawal amount. Eg: 250",
                  id: "amount",
                  name: "amount",
                  type: "number",
                  autoFocus: true,
                  slotProps: {
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    },
                    htmlInput: {
                      min: 1,
                    },
                  },
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
