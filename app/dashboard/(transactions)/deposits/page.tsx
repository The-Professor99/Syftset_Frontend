"use client";
import { AccountMode } from "@/app/lib/types";
import {} from "@/app/ui/AccountModesDisplay";
import { AddDeposit } from "@/app/ui/TransactionPopOvers/AddDeposit";
import Transactions from "@/app/ui/Transactions";
import { MoveToInbox } from "@mui/icons-material";
import { Box, Button, useTheme } from "@mui/material";
import { useLocalStorageState } from "@toolpad/core";
import { useState } from "react";

export default function DepositsPage() {
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
          startIcon={<MoveToInbox />}
        >
          Deposit
        </Button>
      </Box>
      <Transactions
        collectionName="deposit"
        currentAccountMode={currentAccountMode}
      />

      {currentAccountMode ? (
        <AddDeposit
          open={open}
          setOpen={setOpen}
          userAccountModes={[currentAccountMode]}
          isInitialDeposit={false}
        />
      ) : null}
    </>
  );
}
