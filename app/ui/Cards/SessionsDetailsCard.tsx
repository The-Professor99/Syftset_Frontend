import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  capitalize,
  Divider,
  Grid2 as Grid,
  IconButton,
} from "@mui/material";
import { AccountMode, ActivityType, UserSessionDetail } from "@/app/lib/types";
import SlideWrapper from "../SlideWrapper";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useRemoteService } from "@/app/lib/hooks";
import DataDisplay from "../DataDisplay";

function DisplayMetric({ label, value }: { label: string; value: number }) {
  return (
    <Grid size={{ xs: 6 }}>
      <Typography variant="body2" sx={{ fontWeight: "500" }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        ${value}
      </Typography>
    </Grid>
  );
}

function getGapRation(
  dataLength: number,
  xMin = 1,
  xMax = 10,
  yMin = 0.5,
  yMax = 0.95
) {
  // this is to make the category gap ratio big for small data lengths so one item doesn't cover the screen
  dataLength = Math.max(xMin, Math.min(xMax, dataLength));

  const value = yMin + ((xMax - dataLength) / (xMax - xMin)) * (yMax - yMin);
  const roundedValue = Math.round(value * 100) / 100;
  return roundedValue;
}

export default function UserSessionsCard({
  currentAccountMode,
}: {
  currentAccountMode: AccountMode | null;
}) {
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];
  const [selectedItemIndex, setSelectedItemIndex] = React.useState<
    number | undefined
  >();
  const [itemDisplay, setItemDisplay] = React.useState<
    UserSessionDetail | undefined
  >();
  const [shownDetail, setShownDetail] = React.useState<
    "earnings" | "deductions"
  >("earnings");

  const category: ActivityType = "sessions";
  const { data, loading, error, errorMessage } = useRemoteService<
    UserSessionDetail[]
  >({
    url: `/api/accounts/transactions?accountMode=${currentAccountMode}&category=${category}&limit=10`,
    initialData: [],
    dependencies: [currentAccountMode],
    shouldFetch: !!currentAccountMode,
  });

  React.useEffect(() => {
    const setupDetails = () => {
      if (data.length) {
        setSelectedItemIndex(data.length - 1);
      }
    };

    setupDetails();
  }, [data.length]);

  React.useEffect(() => {
    const setupDetails = () => {
      if (typeof selectedItemIndex !== "undefined") {
        setItemDisplay(data[selectedItemIndex]);
      }
    };

    setupDetails();
  }, [selectedItemIndex]);

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
          Your Investment Performance
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Last 10 Sessions Performance: Click on a session to view detailed
            performance metrics.
          </Typography>
        </Stack>

        <DataDisplay
          loading={loading}
          error={error}
          errorMessage={errorMessage || ""}
          noData={!data.length}
          noDataText="No session data!"
        >
          <BarChart
            borderRadius={8}
            colors={colorPalette}
            dataset={data.map(({ timestamp, ...rest }) => rest)} // Timestamp isn't compatible with required types
            xAxis={
              [
                {
                  scaleType: "band",
                  dataKey: "id",
                  categoryGapRatio: getGapRation(data.length),
                  valueFormatter: (value: string) =>
                    capitalize(value.replace("_", " ")),
                },
              ] as any
            }
            series={[
              {
                dataKey: "starting_balance",
                label: "Starting Balance",
                stack: "A",
              },
              { dataKey: "pnl", label: "PnL", stack: "A" },
              ...(data[0]?.referral_bonus
                ? [
                    {
                      dataKey: "referral_bonus",
                      label: "Referral Bonus",
                      stack: "A",
                    },
                  ]
                : []),
            ]}
            height={250}
            margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
            grid={{ horizontal: true }}
            slotProps={{
              legend: {
                hidden: true,
              },
            }}
            onAxisClick={(_, d) => setSelectedItemIndex(d?.dataIndex || 0)}
          />

          {itemDisplay ? (
            <>
              <Divider sx={{ my: theme.spacing(2) }} />
              <Box sx={{ position: "relative" }}>
                <Typography variant="h6" gutterBottom>
                  {capitalize(itemDisplay.id.replace("_", " "))} Details
                </Typography>

                <SlideWrapper in={shownDetail === "earnings"}>
                  <Box sx={{ p: theme.spacing(1) }}>
                    <Typography
                      sx={{ textDecoration: "underline", mb: theme.spacing(2) }}
                    >
                      Earnings Summary
                    </Typography>
                    <Grid
                      container
                      spacing={2}
                      sx={{ mb: (theme) => theme.spacing(2) }}
                    >
                      <DisplayMetric
                        label="Starting Balance"
                        value={itemDisplay.starting_balance}
                      />
                      <DisplayMetric label="PnL" value={itemDisplay?.pnl} />
                      {itemDisplay.referral_bonus ? (
                        <DisplayMetric
                          label="Referral Bonus"
                          value={itemDisplay.referral_bonus}
                        />
                      ) : null}
                    </Grid>
                  </Box>
                </SlideWrapper>

                <SlideWrapper
                  in={shownDetail === "deductions"}
                  direction="left"
                >
                  <Box sx={{ p: theme.spacing(1) }}>
                    <Typography
                      sx={{ textDecoration: "underline", mb: theme.spacing(2) }}
                    >
                      Deductions Breakdown
                    </Typography>
                    <Grid
                      container
                      spacing={2}
                      sx={{ mb: (theme) => theme.spacing(2) }}
                    >
                      <DisplayMetric
                        label="Trading Fee"
                        value={itemDisplay.trading_fee}
                      />
                      {itemDisplay.upline_commission ? (
                        <DisplayMetric
                          label="Upline Commission"
                          value={itemDisplay.upline_commission}
                        />
                      ) : null}
                    </Grid>
                  </Box>
                </SlideWrapper>

                <IconButton
                  onClick={() =>
                    setShownDetail(
                      shownDetail === "earnings" ? "deductions" : "earnings"
                    )
                  }
                  sx={{
                    position: "absolute",
                    right: "1rem",
                    bottom: "1rem",
                  }}
                >
                  {shownDetail === "earnings" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                </IconButton>
              </Box>
            </>
          ) : null}
        </DataDisplay>
      </CardContent>
    </Card>
  );
}
