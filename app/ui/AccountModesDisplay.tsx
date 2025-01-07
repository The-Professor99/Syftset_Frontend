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
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  TextField,
} from "@mui/material";
import { useSession } from "@toolpad/core";
import { getCommonTextFieldProps } from "@/app/auth/utils";
import { LoadingButton } from "@mui/lab";
import { placeDepositRequest } from "@/app/api";
import OverviewCard from "./Cards/OverviewCard";

const accountModesMap = {
  "crypto-1": { name: "Crypto - Batch A", minDeposit: 100, maxDeposit: 10000 },
  "forex-1": { name: "Forex - Batch A", minDeposit: 1000, maxDeposit: 25000 },
  "crypto-2": { name: "Crypto - Batch B", minDeposit: 100, maxDeposit: 10000 },
  "forex-2": { name: "Forex - Batch B", minDeposit: 1000, maxDeposit: 25000 },
};

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

export function AddDeposit({
  open,
  setOpen,
  userAccountModes,
  isInitialDeposit,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userAccountModes: AccountMode[];
  isInitialDeposit: boolean; // Specifies if new account or existing account
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Request Additional Account</DialogTitle>
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
              const accountResponse = await placeDepositRequest(
                formData,
                isInitialDeposit
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

      {/* <Dialog open={open.dialogOpen} >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <DialogTitle>Merge Artists</DialogTitle>
            <DialogContent className="monthly-payout-dialog-content">
              <AutocompleteMuiWrapper
                loading={loading}
                error={error}
                errorText="Failed to get artistes list, please refresh the page or try again later"
                noDataText="No artist found!"
                formLabel="Name of Artistes *"
                variant="standard"
                options={artists}
                label="displayName"
                multiple
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                fieldName="selectedArtists"
                placeholderText="Select artistes."
                fieldError={
                  formik.touched.selectedArtists &&
                  Boolean(formik.errors.selectedArtists)
                }
                fieldHelperText={
                  formik.touched.selectedArtists &&
                  formik.errors.selectedArtists
                }
                value={formik.values.selectedArtists}
                // setFieldValue={formik.setFieldValue}
                optionEqualToValueChecker={(option, value) => {
                  return option === value || value === "";
                }}
                handleChange={(value) => {
                  formik.setFieldValue("selectedArtists", value);
                }}
                customOptionLabel={(option) => {
                  if (option?.displayName) {
                    return option.displayName;
                  }

                  const value = artists.find((artist) => artist === option);

                  return value ? value.displayName : option;
                }}
              />
              <FormControlLabel
                control={
                  <Switch
                    value={open.detailsExpand}
                    onClick={() => handleToggle("detailsExpand")}
                  />
                }
                label="Show Details"
              />

              <Collapse in={open.detailsExpand} timeout="auto" unmountOnExit>
                <Typography sx={{ mt: 2 }}>
                  Basic Details of Selected Artists:
                </Typography>
                <List>
                  {formik.values.selectedArtists?.map(
                    (selectedArtist, index) => (
                      <ListItem key={selectedArtist.id}>
                        <ListItemAvatar>
                          {selectedArtist.picture ? (
                            <Box
                              component="img"
                              src={selectedArtist.picture}
                              sx={{
                                borderRadius: 1,
                                height: 48,
                                width: 48,
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                borderRadius: 1,
                                backgroundColor: "neutral.200",
                                height: 48,
                                width: 48,
                              }}
                            />
                          )}
                        </ListItemAvatar>
                        <ListItemText
                          primary={selectedArtist.displayName}
                          secondary={`Wallet Balance: ${selectedArtist.wallet}`}
                          primaryTypographyProps={{ component: "div" }}
                          secondaryTypographyProps={{ variant: "body2" }}
                        />
                      </ListItem>
                    )
                  )}
                </List>
              </Collapse>
            </DialogContent>
            <DialogActions className="action-button-container">
              <Button
                variant="outlined"
                onClick={() => {
                  formik.resetForm();
                  handleToggle("dialogOpen");
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={formik.isSubmitting}
                endIcon={
                  formik.isSubmitting && (
                    <CircularProgress size={20} sx={{ marginLeft: "1rem" }} />
                  )
                }
              >
                Merge Artists
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog> */}
    </>
  );
}
