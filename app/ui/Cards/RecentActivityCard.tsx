import CustomizedDataGrid from "@/app/ui/Tables/CustomDataGrid";
import { Activity, ActivityType } from "@/app/lib/types";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataDisplay from "../DataDisplay";
import { renderTransactionType } from "../Transactions";
import { Timestamp } from "firebase/firestore";

export default function RecentActiviesCard({
  loading,
  error,
  errorMessage,
  recentActivities,
}: {
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
  recentActivities: Activity[];
}) {
  const theme = useTheme();

  const columns: GridColDef[] = [
    {
      field: "timestamp",
      headerName: "Date",
      flex: 1.5,
      minWidth: 200,
      valueGetter: (_value: any, row: { timestamp: Timestamp }) =>
        row.timestamp.seconds,
      valueFormatter: (value?: number) => {
        if (value == null) {
          return "";
        }
        return new Date(value * 1000).toDateString();
      },
    },
    {
      field: "activity_type",
      headerName: "Activity Type",
      flex: 0.5,
      minWidth: 150,
      renderCell: (params) =>
        renderTransactionType(params.value as ActivityType),
    },
    { field: "description", headerName: "Activity", flex: 1.5, minWidth: 400 },
  ];

  return (
    <Card variant="outlined" sx={{ width: "100%", height: "100%" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: !recentActivities.length
            ? "space-between"
            : "initial",
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
          noData={!recentActivities.length}
          noDataText="No recent activity!"
        >
          <CustomizedDataGrid
            rows={recentActivities}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
              sorting: {
                sortModel: [{ field: "timestamp", sort: "desc" }],
              },
            }}
            getRowId={(row: Activity) => row.id + "_" + row.activity_type}
            density="standard"
          />
        </DataDisplay>
      </CardContent>
    </Card>
  );
}
