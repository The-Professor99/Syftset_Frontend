"use server";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import {
  AccountMode,
  AccountModeDetails,
  ActivityType,
  GlobalSessionDetail,
  Transaction,
  UserSessionDetail,
} from "../lib/types";
import { FirebaseError } from "firebase/app";
import { db } from "../lib/firebase/firebaseApp";
import { auth } from "@/auth";

export async function getAccountModes() {
  const session = await auth();
  const userId = session?.user?.id;

  try {
    if (userId) {
      const accountsRef = collection(db, "users", userId, "accounts");
      const snapshot = await getDocs(accountsRef);

      const modes: AccountModeDetails[] = [];
      snapshot.forEach((doc) => {
        const accountData = doc.data() as Omit<AccountModeDetails, "id">;
        modes.push({ id: doc.id, ...accountData });
      });

      return modes;
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
  collectionName: ActivityType,
  limitNum: string | null
) {
  const session = await auth();
  const userId = session?.user?.id;

  try {
    if (userId) {
      const transactionsRef = collection(
        db,
        "users",
        userId,
        collectionName,
        accountMode,
        "entries"
      );

      const transactionsQuery = query(
        transactionsRef,
        orderBy("timestamp", "desc"),
        limit(limitNum ? parseInt(limitNum) : 20)
      );

      const snapshot = await getDocs(transactionsQuery);

      const transactions: (Transaction | UserSessionDetail)[] = [];
      snapshot.forEach((doc) => {
        const accountData = doc.data() as
          | Omit<Transaction, "id">
          | Omit<UserSessionDetail, "id">;
        transactions.push({ id: doc.id, ...accountData });
      });
      return transactions;
    } else {
      throw new Error("User Id is required");
    }
  } catch (error) {
    console.error("Database Error:", error);
    if (error instanceof FirebaseError || error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(`Failed to fetch ${collectionName}.`);
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
    // const session = await auth();
    // const userId = session?.user?.id

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

export async function getGlobalSessions(accountMode: AccountMode) {
  try {
    const sessionsRef = collection(db, "sessions", accountMode, "entries");

    const sessionQuery = query(sessionsRef, orderBy("start_date", "desc"));

    const snapshot = await getDocs(sessionQuery);

    const globalSessions: GlobalSessionDetail[] = [];
    snapshot.forEach((doc) => {
      const accountData = doc.data() as Omit<GlobalSessionDetail, "id">;
      globalSessions.push({ id: doc.id, ...accountData });
    });

    return globalSessions;
  } catch (error) {
    console.error("Database Error:", error);
    if (error instanceof FirebaseError || error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(`Failed to fetch sessions.`);
    }
  }
}
