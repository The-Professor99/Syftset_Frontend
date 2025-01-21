"use client";
import { AccountMode, ActivityType, Transaction } from "@/app/lib/types";
import React from "react";
import CustomizedDataGrid from "@/app/components/CustomDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { useRemoteService } from "../lib/hooks";
import DataDisplay from "./DataDisplay";
import { capitalize, Chip } from "@mui/material";

export function renderTransactionType(transactionType: ActivityType) {
  const colors: {
    [index: string]:
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning";
  } = {
    deposit: "success",
    trading_outcome: "secondary",
    referral_bonus: "secondary",
    withdrawal: "error",
    upline_commission: "warning",
    management_fee: "warning",
    trading_fee: "default",
  };

  const variants: { [index: string]: "outlined" } = {
    trading_outcome: "outlined",
    withdrawal: "outlined",
    upline_commission: "outlined",
  };

  return (
    <Chip
      label={capitalize(transactionType.replace("_", " "))}
      color={colors[transactionType]}
      variant={variants[transactionType] || "filled"}
      size="small"
    />
  );
}

/**
 *
 * @param collectionName Name of the collection on firestore
 * @returns
 */
export default function Transactions({
  currentAccountMode,
  collectionName,
}: {
  currentAccountMode: AccountMode | null;
  collectionName: ActivityType;
}) {
  const columns: GridColDef[] = [
    {
      field: "timestamp",
      headerName: "Date",
      flex: 1.5,
      minWidth: 200,
      valueGetter: (_value: any, row: { timestamp: { seconds: number } }) =>
        new Date(row.timestamp.seconds * 1000).toDateString(),
    },
    {
      field: "transaction_type",
      headerName: "Transaction Type",
      flex: 0.5,
      minWidth: 150,
      renderCell: (params) =>
        renderTransactionType(params.value as ActivityType),
    },
    {
      field: "prev_balance",
      headerName: "Previous Balance",
      flex: 1.5,
      minWidth: 200,
    },
    { field: "amount", headerName: "Amount", flex: 1.5, minWidth: 200 },
    {
      field: "new_balance",
      headerName: "New Balance",
      flex: 1.5,
      minWidth: 200,
    },
  ];

  const { data, loading, error, errorMessage } = useRemoteService<
    Transaction[]
  >({
    url: `/api/accounts/transactions?accountMode=${currentAccountMode}&category=${collectionName}`,
    initialData: [],
    dependencies: [collectionName, currentAccountMode],
    shouldFetch: !!currentAccountMode,
  });

  return (
    <DataDisplay
      loading={loading}
      error={error}
      errorMessage={errorMessage || ""}
      noData={!data.length}
    >
      <CustomizedDataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
          sorting: {
            sortModel: [{ field: "timestamp", sort: "desc" }],
          },
        }}
      />
    </DataDisplay>
  );
}
