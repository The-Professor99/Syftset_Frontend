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
  totalROI: number;
  totalPnL: number;
  totalServiceCharges: number;
  id: string;
};

export type Transaction = {
  id: string;
  amount: number;
  createdAt: string;
  prevBalance: number;
  newBalance: number;
};

export type Activity = {
  id: string;
  createdAt: string;
  message: string;
  timestamp: string;
  type: ActivityType;
};

export type TransactionComponentProps = {
  accountMode: AccountMode;
};
