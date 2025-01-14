"use server";
import { db } from "@/app/lib/firebase/firebase";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  AccountMode,
  AccountModeDetails,
  Activity,
  GlobalSessionDetail,
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
          referralBonus: 28,
          uplineCommission: 89,
          totalPnL: 0,
          managementFee: 394,
        },
        {
          id: "forex-1",
          accountMode: "forex-1",
          totalWithdrawals: 120,
          totalDeposits: 350,
          totalServiceCharges: 39,
          totalPnL: 248,
          referralBonus: 290,
          uplineCommission: 120,
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
  collectionName: TransactionTableCategory,
  limitNum: string | null
) {
  // const auth = getAuth();
  const userId = "hadT622IoNaDCC4mSMmYI6vdF2t2"; //auth.currentUser?.uid; console.log()

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

      const transactions: (Transaction | Activity)[] = [];
      snapshot.forEach((doc) => {
        const accountData = doc.data() as
          | Omit<Transaction, "id">
          | Omit<Activity, "id">;
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

export async function getGlobalSessions(accountMode: AccountMode) {
  try {
    // const sessionsRef = collection(db, "global", "sessions", accountMode);

    // const sessionQuery = query(
    //   sessionsRef,
    //   orderBy("startDate", "desc"),
    //   limit(20)
    // );

    // const snapshot = await getDocs(sessionQuery);

    // const globalSessions: GlobalSessionDetail[] = [];
    // snapshot.forEach((doc) => {
    //   const accountData = doc.data() as Omit<GlobalSessionDetail, "id">;
    //   globalSessions.push({ id: doc.id, ...accountData });
    // });

    const globalSessions: GlobalSessionDetail[] = [
      {
        id: "dksl",
        sessionId: "session_1",
        startDate: {
          seconds: 10938323898,
          nanoseconds: 0,
        },
        endDate: {
          seconds: 10938383898,
          nanoseconds: 0,
        },
        btcPercentageChange: -4.1,
        ethPercentageChange: 0.11,
        roi: -4.58,
      },
      {
        id: "dksl",
        sessionId: "session_2",
        startDate: {
          seconds: 10938423898,
          nanoseconds: 0,
        },
        endDate: {
          seconds: 10938483898,
          nanoseconds: 0,
        },
        btcPercentageChange: 11.2,
        ethPercentageChange: 5.09,
        roi: 9.71,
      },
      {
        id: "dksl",
        sessionId: "session_3",
        startDate: {
          seconds: 10938523898,
          nanoseconds: 0,
        },
        endDate: {
          seconds: 10938583898,
          nanoseconds: 0,
        },
        btcPercentageChange: -14.11,
        ethPercentageChange: -12.69,
        roi: 33.761,
      },
      {
        id: "dksl",
        sessionId: "session_4",
        startDate: {
          seconds: 10938623898,
          nanoseconds: 0,
        },
        endDate: {
          seconds: 10938683898,
          nanoseconds: 0,
        },
        btcPercentageChange: -2.04,
        ethPercentageChange: -9.78,
        roi: 13.66,
      },
      {
        id: "dksl",
        sessionId: "session_5",
        startDate: {
          seconds: 10938723898,
          nanoseconds: 0,
        },
        endDate: {
          seconds: 10938783898,
          nanoseconds: 0,
        },
        btcPercentageChange: 38.03,
        ethPercentageChange: 29.56,
        roi: 106.58,
      },
      {
        id: "dksl",
        sessionId: "session_6",
        startDate: {
          seconds: 10938823898,
          nanoseconds: 0,
        },
        endDate: {
          seconds: 10938883898,
          nanoseconds: 0,
        },
        btcPercentageChange: 12.6,
        ethPercentageChange: 22.4,
        roi: -6.56,
      },
    ];
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
