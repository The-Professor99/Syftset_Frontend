import {
  Button,
  ButtonProps,
  Card,
  CardContent,
  Stack,
  Typography,
  TypographyProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";

interface DetailsProps {
  title: string;
  value: string | number;
  button?: { text: string; link: string };
}

interface SlotsProps {
  title?: React.ElementType;
  icon?: React.ReactNode;
  value?: React.ElementType;
  actionButton?: React.ReactNode;
}
interface OverviewCardProps {
  details?: DetailsProps;
  slots?: SlotsProps;
  slotProps?: {
    title?: TypographyProps;
    value?: TypographyProps;
    button?: ButtonProps;
  };
}

export default function OverviewCard({
  slots,
  details,
  slotProps,
}: OverviewCardProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {slots?.icon}
        {slots?.title ? (
          <slots.title />
        ) : (
          <Typography
            component="h2"
            variant="subtitle2"
            gutterBottom
            {...slotProps?.title}
          >
            {details?.title}
          </Typography>
        )}
        <Stack
          direction="column"
          sx={{ justifyContent: "space-between", flexGrow: "1", gap: 1 }}
        >
          <Stack sx={{ justifyContent: "space-between" }}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              {slots?.value ? (
                <slots.value />
              ) : (
                <Typography variant="h4" component="p" {...slotProps?.value}>
                  {details?.value}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>

        {slots?.actionButton ? (
          <>{slots?.actionButton}</>
        ) : details?.button ? (
          <Button
            variant="contained"
            size="small"
            color="primary"
            fullWidth={isSmallScreen}
            LinkComponent={Link}
            href={details?.button?.link}
            {...slotProps?.button}
          >
            {details?.button?.text}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
