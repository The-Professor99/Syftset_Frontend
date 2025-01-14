import CustomizedDataGrid from "@/app/components/CustomDataGrid";
import { useRemoteService } from "@/app/lib/hooks";
import { AccountMode, Activity, ActivityType } from "@/app/lib/types";
import { Card, CardContent, Chip, Typography, useTheme } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataDisplay from "../DataDisplay";

export default function RecentActiviesCard({
  currentAccountMode,
}: {
  currentAccountMode: AccountMode | null;
}) {
  const theme = useTheme();

  const { data, loading, error, errorMessage } = useRemoteService<Activity[]>({
    url: `/api/accounts/transactions?accountMode=${currentAccountMode}&category=recent_activities&limit=10`,
    initialData: [],
    dependencies: [currentAccountMode],
    shouldFetch: !!currentAccountMode,
  });

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
      field: "type",
      headerName: "Activity Type",
      flex: 0.5,
      minWidth: 150,
      renderCell: (params) =>
        renderTransactionType(params.value as ActivityType),
    },
    { field: "message", headerName: "Activity", flex: 1.5, minWidth: 250 },
  ];

  return (
    <Card variant="outlined" sx={{ width: "100%", height: "100%" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: !data.length ? "space-between" : "initial",
          gap: theme.spacing(1),
        }}
      >
        <Typography
          component="h2"
          variant="subtitle2"
          sx={{ mb: theme.spacing(1) }}
        >
          Recent Activities
        </Typography>

        <DataDisplay
          loading={loading}
          error={error}
          errorMessage={errorMessage || ""}
          noData={!data.length}
          noDataText="No recent activity!"
        >
          <CustomizedDataGrid
            rows={data}
            columns={columns}
            hideFooter
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } },
              sorting: {
                sortModel: [{ field: "timestamp", sort: "desc" }],
              },
            }}
            density="standard"
          />
        </DataDisplay>
      </CardContent>
    </Card>
  );
}

function renderTransactionType(transactionType: ActivityType) {
  const colors: { [index: string]: "success" | "error" | "primary" } = {
    deposit: "success",
    withdrawal: "error",
    sessionUpdate: "primary",
  };
  const namingMap = {
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    sessionUpdate: "Session Update",
  };

  console.log(transactionType);
  return (
    <Chip
      label={namingMap[transactionType]}
      color={colors[transactionType]}
      size="small"
    />
  );
}
