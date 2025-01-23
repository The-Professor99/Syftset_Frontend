"use server";
import type { AuthProvider } from "@toolpad/core";
import { appRoutes } from "@/app/lib/routes";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "@/app/lib/firebase/auth";

async function forgotPassword(provider: AuthProvider, formData: FormData) {
  try {
    const email = formData.get("email");
    if (typeof email !== "string") {
      throw new Error("Email must be a valid string!");
    }

    const actionCodeSettings = {
      url: `${process.env.NEXT_PUBLIC_LIVE_URL}/${appRoutes.signIn}`,
    };
    await sendPasswordResetEmail(email, actionCodeSettings);
    return {
      success:
        "Your password reset mail has been sent. Please check your spam/junk folder if you do not see it within 5minutes",
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return {
        error: error.code?.replace("auth/", "").replaceAll("-", " "),
        type: error.name,
      };
    }

    if (error instanceof Error) {
      return {
        error: error.message,
        type: error.name,
      };
    }
    return {
      error: "Something went wrong.",
      type: "UnknownError",
    };
  }
}

export default forgotPassword;
