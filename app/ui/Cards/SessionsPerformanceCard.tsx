import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import { capitalize } from "@mui/material";
import { CurveType, StackOrderType } from "@mui/x-charts";
import { AccountMode, GlobalSessionDetail } from "@/app/lib/types";
import { useRemoteService } from "@/app/lib/hooks";
import DataDisplay from "../DataDisplay";
import { median } from "@/app/lib/utils";

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

const processData = (data: GlobalSessionDetail[]) => {
  const roi: number[] = [];
  const btcMovement: number[] = [];
  const ethMovement: number[] = [];
  const xAxisData: string[] = [];
  data.forEach((sessionDetail) => {
    const startDate = new Date(
      sessionDetail.start_date.seconds * 1000
    ).toLocaleDateString();
    const endDate = new Date(
      sessionDetail.end_date.seconds * 1000
    ).toLocaleDateString();
    const sessionId = sessionDetail.id.replace("_", " ");

    const formattedSessionDetail = capitalize(
      `${sessionId} (${startDate} - ${endDate})`
    );

    roi.push(sessionDetail.profit_percentage * 100);
    if (
      sessionDetail.btc_percentage_change &&
      sessionDetail.eth_percentage_change
    ) {
      btcMovement.push(sessionDetail.btc_percentage_change * 100);
      ethMovement.push(sessionDetail.eth_percentage_change * 100);
    }

    xAxisData.push(formattedSessionDetail);
  });

  const calculatedAverageROI = median(roi);
  const roundedAverageROI = calculatedAverageROI
    ? Math.round(calculatedAverageROI * 100) / 100
    : NaN; // rounded to 2 decimal places

  return {
    roi,
    btcMovement,
    ethMovement,
    roundedAverageROI,
    xAxisData,
  };
};

export default function SessionsPerformanceCard({
  currentAccountMode,
}: {
  currentAccountMode: AccountMode | null;
}) {
  const theme = useTheme();

  const { data, loading, error, errorMessage } = useRemoteService<
    GlobalSessionDetail[]
  >({
    url: `/api/global/sessions?accountMode=${currentAccountMode}`,
    initialData: [],
    dependencies: [currentAccountMode],
    shouldFetch: !!currentAccountMode,
  });

  const { roi, btcMovement, ethMovement, roundedAverageROI, xAxisData } =
    processData(data);

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.secondary.main,
    theme.palette.primary.dark,
  ];

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          height: "100%",
          justifyContent: !data.length ? "space-between" : "initial",
        }}
      >
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Historical ROI Across All Sessions
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              Median ROI
            </Typography>
            {roundedAverageROI ? (
              <Chip
                size="small"
                color={roundedAverageROI > 0 ? "success" : "error"}
                label={
                  roundedAverageROI > 0
                    ? `+${roundedAverageROI}%`
                    : `${roundedAverageROI}%`
                }
              />
            ) : null}
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {btcMovement.length && ethMovement.length
              ? "This chart compares all session ROI against BTC and ETH price movements. "
              : ""}
            Past performance is not indicative of future results.
          </Typography>
        </Stack>

        <DataDisplay
          loading={loading}
          error={error}
          errorMessage={errorMessage || ""}
          noData={!data.length}
          noDataText="No session data!"
        >
          <LineChart
            colors={colorPalette}
            xAxis={[
              {
                scaleType: "point",
                data: xAxisData,
                tickInterval: (index, i) => (i + 1) % 2 === 0,
                valueFormatter: (sessionId, context) =>
                  context.location === "tick"
                    ? sessionId.split(" (")[0]
                    : sessionId,
              },
            ]}
            series={[
              {
                id: "roi",
                label: "ROI (%)",
                showMark: false,
                curve: "linear",
                area: true,
                stackOrder: "ascending",
                data: roi,
              },
              ...(btcMovement.length
                ? [
                    {
                      id: "btcMovement",
                      label: "BTC Movement (%)",
                      showMark: false,
                      curve: "linear" as CurveType,
                      // area: true,
                      stackOrder: "ascending" as StackOrderType,
                      data: btcMovement,
                    },
                  ]
                : []),
              ...(ethMovement.length
                ? [
                    {
                      id: "ethMovement",
                      label: "ETH Movement (%)",
                      showMark: false,
                      curve: "linear" as CurveType,
                      stackOrder: "ascending" as StackOrderType,
                      data: ethMovement,
                      area: true,
                    },
                  ]
                : []),
            ]}
            height={250}
            margin={{ left: 30, right: 20, top: 20, bottom: 20 }}
            grid={{ horizontal: true }}
            sx={{
              "& .MuiAreaElement-series-roi": {
                fill: "url('#roi')",
              },
              "& .MuiAreaElement-series-btcMovement": {
                fill: "url('#btcMovement')",
              },
              "& .MuiAreaElement-series-ethMovement": {
                fill: "url('#ethMovement')",
              },
            }}
            slotProps={{
              legend: {
                hidden: true,
              },
            }}
          >
            <AreaGradient color={theme.palette.primary.dark} id="roi" />
            {btcMovement.length ? (
              <AreaGradient
                color={theme.palette.primary.main}
                id="btcMovement"
              />
            ) : null}
            {ethMovement.length ? (
              <AreaGradient
                color={theme.palette.primary.light}
                id="ethMovement"
              />
            ) : null}
          </LineChart>
        </DataDisplay>
      </CardContent>
    </Card>
  );
}
