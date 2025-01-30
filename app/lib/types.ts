export const accountModes = ["crypto-1", "forex-1"] as const;

export const activityTypes = [
  "deposit",
  "withdrawal",
  "trading_outcome",
  "referral_bonus",
  "upline_commission",
  "management_fee",
  "trading_fee",
  "sessions",
] as const;

// Derive the union type from the tuple
export type AccountMode = (typeof accountModes)[number];

// Derive the union type from the tuple
export type ActivityType = (typeof activityTypes)[number];

export type AccountModeDetails = {
  account_type: AccountMode;
  balance: number;
  recent_activities: Activity[];
  id: string;
  total_management_fee?: number;
  referral_earnings?: number;
  total_upline_commission?: number;
  total_referral_earnings?: number;
  total_deposits: number;
  total_withdrawals: number;
  total_pnl: number;
  total_trading_fee: number;
};

type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

export type Transaction = {
  id: string;
  amount: number;
  timestamp: Timestamp;
  prev_balance: number;
  new_balance: number;
  transaction_type: ActivityType;
  description: string;
};

export type Activity = {
  id: string;
  description: string;
  timestamp: Timestamp;
  activity_type: ActivityType;
};

export type GlobalSessionDetail = {
  id: string;
  session_number: number;
  start_date: Timestamp;
  end_date: Timestamp;
  btc_percentage_change?: number;
  eth_percentage_change?: number;
  profit_percentage: number;
};

export type UserSessionDetail = {
  starting_balance: number;
  pnl: number;
  trading_fee: number;
  referral_bonus?: number;
  upline_commission?: number;
  id: string;
  timestamp: Timestamp;
};

export type User = {
  id: string | null;
  name: string | null;
  email: string | null;
};

export type Session = {
  user: User;
};
