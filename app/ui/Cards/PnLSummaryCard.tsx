"use client";
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DataDisplay from "../DataDisplay";
import { AccountModeDetails } from "@/app/lib/types";
import { fShortenNumber } from "@/app/lib/utils";
import {
  AccountBalance,
  Handshake,
  Insights,
  RequestQuote,
} from "@mui/icons-material";

interface StyledTextProps {
  variant: "primary" | "secondary";
}

const StyledText = styled("text", {
  shouldForwardProp: (prop) => prop !== "variant",
})<StyledTextProps>(({ theme }) => ({
  textAnchor: "middle",
  dominantBaseline: "central",
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: {
        variant: "primary",
      },
      style: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== "primary",
      style: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    {
      props: {
        variant: "primary",
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== "primary",
      style: {
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}));

interface PieCenterLabelProps {
  primaryText: string | number;
  secondaryText: string | number;
}

function PieCenterLabel({ primaryText, secondaryText }: PieCenterLabelProps) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

const colors = [
  "hsl(220, 20%, 65%)",
  "hsl(220, 20%, 42%)",
  "hsl(220, 20%, 35%)",
  "hsl(220, 20%, 25%)",
];

const processData = (data: AccountModeDetails | undefined) => {
  if (typeof data === "undefined") {
    return {
      pieData: [],
      totalEarnings: "0",
      barData: [],
    };
  }

  const totalEarnings = data.total_referral_earnings
    ? data.total_pnl + data.total_referral_earnings
    : data.total_pnl;
  const formattedEarnings = fShortenNumber(totalEarnings);
  const roi = (data.total_pnl / data.total_deposits) * 100 || 0;
  const roundedROI = Math.round(roi * 100) / 100; // rounded to 2 decimal places

  const pieData = [
    { label: "Total PnL", value: data.total_pnl },
    ...(data.total_referral_earnings
      ? [
          {
            label: "Referral Bonus",
            value: data.total_referral_earnings,
          },
        ]
      : []),
  ];

  const barData = [
    {
      name: "ROI",
      value: `${roundedROI} %`,
      icon: <Insights />,
    },
    {
      name: "Trading Fee",
      value: fShortenNumber(data.total_trading_fee),
      icon: <RequestQuote />,
    },
    ...(data.total_management_fee
      ? [
          {
            name: "Management Fee",
            value: fShortenNumber(data.total_management_fee),
            icon: <AccountBalance />,
          },
        ]
      : []),
    ...(data.total_upline_commission
      ? [
          {
            name: "Upline Commission",
            value: fShortenNumber(data.total_upline_commission),
            icon: <Handshake />,
          },
        ]
      : []),
  ];
  return {
    pieData: pieData,
    totalEarnings: formattedEarnings,
    barData: barData,
  };
};

export default function PnLSummaryCard({
  currentAccountDetails,
  loading,
  error,
  errorMessage,
}: {
  currentAccountDetails: AccountModeDetails | undefined;
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
}) {
  const { pieData, totalEarnings, barData } = processData(
    currentAccountDetails
  );

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          height: "100%",
          justifyContent: !pieData.length ? "space-between" : "initial",
        }}
      >
        <Typography component="h2" variant="subtitle2">
          Earnings Summary
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Your cumulative earnings across all sessions
          </Typography>
        </Stack>

        <DataDisplay
          loading={loading}
          error={error}
          errorMessage={errorMessage || ""}
          noData={!pieData.length}
          noDataText="No data to display!"
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PieChart
              colors={colors}
              margin={{
                left: 80,
                right: 80,
                top: 80,
                bottom: 80,
              }}
              series={[
                {
                  data: pieData,
                  innerRadius: 75,
                  outerRadius: 100,
                  paddingAngle: 0,
                  highlightScope: { faded: "global", highlighted: "item" },
                },
              ]}
              height={260}
              width={260}
              slotProps={{
                legend: { hidden: true },
              }}
            >
              <PieCenterLabel
                primaryText={totalEarnings}
                secondaryText="Total Earnings"
              />
            </PieChart>
          </Box>
          {barData.map((entry, index) => (
            <Stack
              key={index}
              direction="row"
              sx={{ alignItems: "center", gap: 2, pb: 2 }}
            >
              {entry.icon}
              <Stack sx={{ gap: 1, flexGrow: 1 }}>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: "500" }}>
                    {entry.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {entry.value}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </DataDisplay>
      </CardContent>
    </Card>
  );
}
