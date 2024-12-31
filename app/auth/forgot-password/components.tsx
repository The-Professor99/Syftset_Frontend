"use client";
import * as React from "react";
import {
  AuthProvider,
  AuthResponse,
  SignInPageProps,
  SupportedAuthProvider,
} from "@toolpad/core/SignInPage";
import {
  Alert,
  alpha,
  Box,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { getCommonTextFieldProps } from "../utils";

interface ForgotPasswordPageProps extends SignInPageProps {
  branding?: { logo?: React.ReactNode; title?: string };
  forgotPassword:
    | ((
        provider: AuthProvider,
        formData?: any
      ) => void | Promise<AuthResponse> | undefined)
    | undefined;
}

export default function ForgotPasswordPage({
  providers,
  signIn,
  slots,
  slotProps,
  forgotPassword,
  branding = {},
  sx,
}: ForgotPasswordPageProps) {
  const theme = useTheme();
  const credentialsProvider = providers?.find(
    (provider) => provider.id === "credentials"
  );
  const [{ loading, selectedProviderId, error, success }, setFormStatus] =
    React.useState<{
      loading: boolean;
      selectedProviderId?: SupportedAuthProvider;
      error?: string;
      success?: string;
    }>({
      selectedProviderId: undefined,
      loading: false,
      error: "",
      success: "",
    });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "background.paper",
            borderRadius: 1,
            p: 4,
            border: "1px solid",
            borderColor: alpha(theme.palette.grey[400], 0.4),
            boxShadow: theme.shadows[4],
          }}
        >
          {branding?.logo}

          {slots?.title ? (
            <slots.title />
          ) : (
            <Typography
              variant="h5"
              color="textPrimary"
              sx={{
                my: theme.spacing(1),
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              Reset {branding?.title ? `your ${branding.title}` : null} password
            </Typography>
          )}
          {slots?.subtitle ? (
            <slots.subtitle />
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
              textAlign="center"
            >
              Please enter your account email and we will send you a password
              reset link
            </Typography>
          )}
          <Box sx={{ mt: theme.spacing(1), width: "100%" }}>
            {credentialsProvider ? (
              <React.Fragment>
                {error && selectedProviderId === "credentials" ? (
                  <Alert sx={{ my: 2 }} severity="error">
                    {error}
                  </Alert>
                ) : null}
                <Box
                  component="form"
                  onSubmit={async (event) => {
                    setFormStatus({
                      error: "",
                      selectedProviderId: credentialsProvider.id,
                      loading: true,
                    });
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const credentialsResponse = await forgotPassword?.(
                      credentialsProvider,
                      formData
                    );
                    setFormStatus((prev) => ({
                      ...prev,
                      loading: false,
                      error: credentialsResponse?.error,
                    }));
                  }}
                >
                  <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
                    {slots?.emailField ? (
                      <slots.emailField {...slotProps?.emailField} />
                    ) : (
                      <TextField
                        {...getCommonTextFieldProps(theme, {
                          label: "Email",
                          placeholder: "your@email.com",
                          id: "email",
                          name: "email",
                          type: "email",
                          autoComplete: "email",
                          autoFocus: true,
                          ...slotProps?.emailField,
                        })}
                      />
                    )}
                  </Stack>
                  {slots?.submitButton ? (
                    <slots.submitButton {...slotProps?.submitButton} />
                  ) : (
                    <LoadingButton
                      type="submit"
                      fullWidth
                      size="large"
                      variant="contained"
                      disableElevation
                      color="primary"
                      loading={
                        loading && selectedProviderId === credentialsProvider.id
                      }
                      sx={{
                        mt: 3,
                        mb: 2,
                        textTransform: "capitalize",
                      }}
                      {...slotProps?.submitButton}
                    >
                      Reset Password
                    </LoadingButton>
                  )}

                  {slots?.signUpLink ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      {slots?.signUpLink ? (
                        <slots.signUpLink {...slotProps?.signUpLink} />
                      ) : null}
                    </Box>
                  ) : null}
                </Box>
              </React.Fragment>
            ) : null}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
