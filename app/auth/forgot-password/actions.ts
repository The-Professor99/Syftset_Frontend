"use server";
import type { AuthProvider } from "@toolpad/core";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth as firebaseAuth } from "@/firebase";
import { appRoutes } from "@/app/_helpers/routes";
import { FirebaseError } from "firebase/app";

async function forgotPassword(provider: AuthProvider, formData: FormData) {
  try {
    const actionCodeSettings = {
      url: `${process.env.NEXT_PUBLIC_LIVE_URL}/${appRoutes.signIn}`,
    };
    const emailSent = await sendPasswordResetEmail(
      firebaseAuth,
      String(formData.get("email")),
      actionCodeSettings
    );
    console.log(emailSent);
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
    return {
      error: "Something went wrong.",
      type: "UnknownError",
    };
  }
}

export default forgotPassword;
