"use server";
import { db } from "@/app/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  AccountMode,
  AccountModeDetails,
  Transaction,
  TransactionTableCategory,
} from "../lib/types";
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

export async function getTransactions(
  accountMode: AccountMode,
  collectionName: TransactionTableCategory
) {
  // const auth = getAuth();
  const userId = "hadT622IoNaDCC4mSMmYI6vdF2t2"; //auth.currentUser?.uid; console.log()

  try {
    if (userId) {
      const depositsRef = collection(
        db,
        "users",
        userId,
        collectionName,
        accountMode,
        "entries"
      );
      const snapshot = await getDocs(depositsRef);

      const deposits: Transaction[] = [];
      snapshot.forEach((doc) => {
        const accountData = doc.data() as Omit<Transaction, "id">;
        deposits.push({ id: doc.id, ...accountData });
      });
      // const deposits: Transaction[] = [
      //   {
      //     id: "1",
      //     amount: 50,
      //     createdAt: "dlld",
      //     prevBalance: 45,
      //     newBalance: 8,
      //   },
      // ];
      console.log(deposits);
      return deposits;
    } else {
      throw new Error("User Id is required");
    }
  } catch (error) {
    console.error("Database Error:", error);
    if (error instanceof FirebaseError || error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to fetch deposits.");
    }
  }
}

/**
 *
 * @param formData Values should include email, accountMode, and capital
 * @param isInitialDeposit Specifies if it's the first time a user wants to make a deposit into the account.
 * @returns
 */
export async function placeTransactionRequest(
  formData: FormData,
  isInitialDeposit: boolean,
  transactionType: "deposit" | "withdrawal"
) {
  try {
    console.log(transactionType);
    // Artificially delay a response for demo purposes.
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (transactionType === "deposit") {
      throw new Error(
        "We are currently not accepting new investments. Please check back later. If you believe this is an error, kindly contact support for assistance."
      );
    } else {
      throw new Error(
        "Currently, withdrawals can only be processed at the end of sessions. Please try again once the session has concluded. If you believe this is an error, kindly contact support for assistance."
      );
    }

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
