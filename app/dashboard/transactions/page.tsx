"use client";
import { AccountMode, ActivityType, activityTypes } from "@/app/lib/types";
import {} from "@/app/ui/AccountModesDisplay";
import { AddDeposit } from "@/app/ui/TransactionPopOvers/AddDeposit";
import { MakeWithdrawal } from "@/app/ui/TransactionPopOvers/MakeWithdrawal";
import Transactions from "@/app/ui/Transactions";
import { MoveToInbox, Outbox } from "@mui/icons-material";
import {
  Box,
  Button,
  capitalize,
  FormControl,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import { useLocalStorageState } from "@toolpad/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const actionComponentMap: Record<
  Exclude<
    ActivityType,
    | "trading_outcome"
    | "referral_bonus"
    | "upline_commission"
    | "management_fee"
    | "trading_fee"
    | "sessions"
  >,
  { name: string; icon: React.ReactNode }
> = {
  deposit: { name: "Deposit", icon: <MoveToInbox /> },
  withdrawal: { name: "Withdraw", icon: <Outbox /> },
};

export default function TransactionsPage() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const [currentAccountMode] = useLocalStorageState<AccountMode>(
    "accountMode",
    "crypto-1"
  );
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const category =
    (searchParams.get("category")?.toString() as ActivityType) || "deposit";

  // Categories with action components
  const actionComponentCategories = ["deposit", "withdrawal"] as const;

  const handleCategorySwitch = (e: { target: { value: string } }) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", e.target.value);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          my: theme.spacing(1),
        }}
      >
        <TextField
          id="select-transaction"
          select
          label="Category"
          value={category}
          onChange={handleCategorySwitch}
          variant="standard"
        >
          {activityTypes.map((activity) => {
            return activity !== "sessions" ? (
              <MenuItem key={activity} value={activity}>
                {capitalize(activity.replace("_", " "))}
              </MenuItem>
            ) : null;
          })}
        </TextField>
        {actionComponentCategories.includes(
          category as (typeof actionComponentCategories)[number]
        ) ? (
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            startIcon={
              actionComponentMap[category as keyof typeof actionComponentMap]
                .icon
            }
          >
            {
              actionComponentMap[category as keyof typeof actionComponentMap]
                .name
            }
          </Button>
        ) : null}
      </Box>
      <Transactions
        collectionName={category}
        currentAccountMode={currentAccountMode}
      />

      {currentAccountMode &&
      actionComponentCategories.includes(
        category as (typeof actionComponentCategories)[number]
      ) ? (
        category === "deposit" ? (
          <AddDeposit
            open={open}
            setOpen={setOpen}
            userAccountModes={[currentAccountMode]}
            isInitialDeposit={false}
          />
        ) : (
          <MakeWithdrawal
            open={open}
            setOpen={setOpen}
            currentAccountMode={currentAccountMode}
          />
        )
      ) : null}
    </>
  );
}
