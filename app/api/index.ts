"use server";
import { db } from "@/app/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AccountMode, AccountModeDetails, Transaction } from "../lib/types";
import { FirebaseError } from "firebase/app";

export async function getAccountModes() {
  const userId = "hadT622IoNaDCC4mSMmYI6vdF2t2"; //auth.currentUser?.uid; console.log()

  try {
    if (userId) {
      // const accountsRef = collection(db, "users", userId, "accounts");
      // const snapshot = await getDocs(accountsRef);

      // const modes: AccountModeDetails[] = [];
      // snapshot.forEach((doc) => {
      //   const accountData = doc.data() as Omit<AccountModeDetails, "id">;
      //   modes.push({ id: doc.id, ...accountData });
      // });
      // console.log(modes);
      // return modes;

      return [
        {
          id: "crypto-1",
          balance: 250,
          totalServiceCharges: 0,
          accountMode: "crypto-1",
          totalDeposits: 250,
          totalWithdrawals: 0,
          totalROI: 0,
          totalPnL: 0,
        },
        {
          id: "forex-1",
          accountMode: "forex-1",
          totalWithdrawals: 120,
          totalDeposits: 350,
          totalServiceCharges: 39,
          totalPnL: 248,
          totalROI: 20,
          balance: 500,
        },
      ] as AccountModeDetails[];
    } else {
      throw new Error("User Id is required");
    }
  } catch (error) {
    console.error("Database Error:", error);
    if (error instanceof FirebaseError || error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to fetch account modes.");
    }
  }
}

/**
 *
 * @param formData Values should include email, accountMode, and capital
 * @param isInitialDeposit Specifies if it's the first time a user wants to make a deposit into the account.
 * @returns
 */
export async function placeDepositRequest(
  formData: FormData,
  isInitialDeposit: boolean
) {
  try {
    // Artificially delay a response for demo purposes.
    await new Promise((resolve) => setTimeout(resolve, 3000));
    throw new Error(
      "We are currently not accepting new investments. Please check back later. If you believe this is an error, kindly contact support for assistance."
    );

    // Request will go to firestore, logic will go here. No New investments at this time
    // return {
    //   success:
    //     "Request submitted successfully. A follow-up email will be sent to your email address.",
    // };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
        type: error.name,
        success: "",
      };
    }
    return {
      error: "Something went wrong.",
      type: "UnknownError",
      success: "",
    };
  }
}
