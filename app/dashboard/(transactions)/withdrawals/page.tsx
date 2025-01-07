"use client";
import { AccountMode } from "@/app/lib/types";
import { MakeWithdrawal } from "@/app/ui/TransactionPopOvers/MakeWithdrawal";
import Transactions from "@/app/ui/Transactions";
import { Outbox } from "@mui/icons-material";
import { Box, Button, useTheme } from "@mui/material";
import { useLocalStorageState } from "@toolpad/core";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const [currentAccountMode] = useLocalStorageState<AccountMode>(
    "accountMode",
    "crypto-1"
  );
  return (
    <>
      <Box sx={{ textAlign: "right", mb: theme.spacing(1) }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<Outbox />}
        >
          Withdraw
        </Button>
      </Box>
      <Transactions
        collectionName="withdrawals"
        currentAccountMode={currentAccountMode}
      />

      {currentAccountMode ? (
        <MakeWithdrawal
          open={open}
          setOpen={setOpen}
          currentAccountMode={currentAccountMode}
        />
      ) : null}
    </>
  );
}
