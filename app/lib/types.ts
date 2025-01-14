export const accountModes = [
  "crypto-1",
  "forex-1",
  "crypto-2",
  "forex-2",
] as const;

const activityTypes = ["deposit", "withdrawal", "sessionUpdate"] as const;

// Derive the union type from the tuple
export type AccountMode = (typeof accountModes)[number];

// Derive the union type from the tuple
export type ActivityType = (typeof activityTypes)[number];

export type AccountModeDetails = {
  accountMode: AccountMode;
  balance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalPnL: number;
  totalServiceCharges: number;
  id: string;
  referralBonus?: number;
  uplineCommission?: number;
  managementFee?: number;
};

type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

export type Transaction = {
  id: string;
  amount: number;
  timestamp: Timestamp;
  prevBalance: number;
  newBalance: number;
};

export type Activity = {
  id: string;
  message: string;
  timestamp: Timestamp;
  type: ActivityType;
};

export type TransactionTableCategory =
  | "deposits"
  | "withdrawals"
  | "recent_activities";

export type GlobalSessionDetail = {
  id: string;
  sessionId: string;
  startDate: {
    seconds: number;
    nanoseconds: number;
  };
  endDate: {
    seconds: number;
    nanoseconds: number;
  };
  btcPercentageChange?: number;
  ethPercentageChange?: number;
  roi: number;
};
