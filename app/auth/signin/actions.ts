"use server";
import { AuthError } from "next-auth";
import type { AuthProvider } from "@toolpad/core";
import { signIn as signInAction } from "../../../auth";
import { appRoutes } from "@/app/lib/routes";

async function signIn(
  provider: AuthProvider,
  formData: FormData,
  callbackUrl?: string
) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    if (typeof email !== "string" || typeof password !== "string") {
      throw new Error("Email and Password must be valid strings!");
    }

    return await signInAction(provider.id, {
      ...(formData && {
        email,
        password,
      }),
      redirectTo:
        callbackUrl && callbackUrl !== "/" ? callbackUrl : appRoutes.dashboard,
    });
  } catch (error) {
    // The desired flow for successful sign in in all cases
    // and unsuccessful sign in for OAuth providers will cause a `redirect`,
    // and `redirect` is a throwing function, so we need to re-throw
    // to allow the redirect to happen
    // Source: https://github.com/vercel/next.js/issues/49298#issuecomment-1542055642
    // Detect a `NEXT_REDIRECT` error and re-throw it
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    // Handle Auth.js errors
    if (error instanceof AuthError) {
      return {
        error:
          error.type === "CredentialsSignin"
            ? "Invalid credentials."
            : "An error with Auth.js occurred.",
        type: error.type,
      };
    }

    if (error instanceof Error) {
      return {
        error: error.message,
        type: error.name,
      };
    }
    // An error boundary must exist to handle unknown errors
    return {
      error: "Something went wrong.",
      type: "UnknownError",
    };
  }
}

export default signIn;
