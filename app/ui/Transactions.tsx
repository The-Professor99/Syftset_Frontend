"use client";
import {
  AccountMode,
  Transaction,
  TransactionTableCategory,
} from "@/app/lib/types";
import { useLocalStorageState } from "@toolpad/core";
import React from "react";
import CustomizedDataGrid from "@/app/components/CustomDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { useRemoteService } from "../lib/hooks";
import DataDisplay from "./DataDisplay";

/**
 *
 * @param collectionName Name of the collection on firestore
 * @returns
 */
export default function Transactions({
  collectionName,
}: {
  collectionName: TransactionTableCategory;
}) {
  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1.5,
      minWidth: 200,
      valueGetter: (_value: any, row: { timestamp: { seconds: number } }) =>
        new Date(row.timestamp.seconds * 1000).toDateString(),
    },
    {
      field: "prevBalance",
      headerName: "Previous Balance",
      flex: 1.5,
      minWidth: 200,
    },
    { field: "amount", headerName: "Amount", flex: 1.5, minWidth: 200 },
    {
      field: "newBalance",
      headerName: "New Balance",
      flex: 1.5,
      minWidth: 200,
    },
  ];
  const [currentAccountMode] = useLocalStorageState<AccountMode>(
    "accountMode",
    "crypto-1"
  );

  const { data, loading, error, errorMessage } = useRemoteService<
    Transaction[]
  >({
    url: `/api/accounts/${collectionName}?accountMode=${currentAccountMode}`,
    initialData: [],
    dependencies: [collectionName, currentAccountMode], // Pass additional dependencies if needed
    shouldFetch: !!currentAccountMode,
  });
  console.log(data);

  return (
    <DataDisplay
      loading={loading}
      error={error}
      errorMessage={errorMessage || ""}
      noData={!data.length}
    >
      <CustomizedDataGrid rows={data} columns={columns} />
    </DataDisplay>
  );
}
