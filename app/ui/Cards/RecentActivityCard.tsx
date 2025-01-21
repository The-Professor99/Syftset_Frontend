import CustomizedDataGrid from "@/app/components/CustomDataGrid";
import { Activity, ActivityType } from "@/app/lib/types";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataDisplay from "../DataDisplay";
import { renderTransactionType } from "../Transactions";

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
      valueGetter: (_value: any, row: { timestamp: { seconds: number } }) =>
        new Date(row.timestamp.seconds * 1000).toDateString(),
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
