"use client";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid2 } from "@mui/material";
import Link from "next/link";

const questions = [
  {
    id: "panel1",
    question: "What is Syftset?",
    answer:
      "Syftset is an exclusive, automated cryptocurrency trading and fund management platform that uses advanced algorithms to execute trades and manage investments in the crypto market. Our goal is to deliver consistent, risk-adjusted returns for individual investors and those with a higher risk appetite.",
  },
  {
    id: "panel2",
    question: "How do I get started?",
    answer:
      "Simply fund your account, and let our automated system handle the rest.",
  },
  {
    id: "panel3",
    question: "Is Syftset suitable for beginners?",
    answer:
      "Yes! Syftset is designed to be accessible to both experienced investors and beginners. Our automated system handles the complexities of trading, so you don’t need prior experience to get started.",
  },
  {
    id: "panel4",
    question: "How does the profit-sharing model work?",
    answer:
      "At the end of each trading session, profits are split between you and Syftset based on your chosen plan (e.g., 70/30 or 75/25). You can withdraw your share or reinvest it into the next session.",
  },
  {
    id: "panel5",
    question: "Are there any hidden fees?",
    answer:
      "No. Our fees are transparent and included in the profit-sharing model. There are no additional charges for account management.",
  },
  {
    id: "panel6",
    question: "What are the key risks associated with your trading strategy?",
    answerIsReactElement: true,
    answer: (
      <Typography
        variant="body2"
        gutterBottom
        sx={{ maxWidth: { sm: "100%", md: "70%" } }}
      >
        Syftset’s strategy involves certain risks, including market volatility,
        technology and security vulnerabilities, and counterparty risk. For a
        detailed breakdown, please refer to our{" "}
        <Link href="#">Risk Disclosure</Link> page.
      </Typography>
    ),
  },
  {
    id: "panel7",
    question: "How long is a trading session?",
    answer:
      "Each trading session lasts between 35 and 45 days, during which our algorithms actively manage your investments.",
  },
  {
    id: "panel8",
    question: "What happens at the end of a trading session?",
    answer:
      "At the end of a session, profits are calculated, split, and credited to your account. You can then choose to withdraw your profits or reinvest them in the next session.",
  },
  {
    id: "panel9",
    question: "How does Syftset manage risk?",
    answer:
      "Our algorithms prioritize risk-adjusted returns by using quantitative strategies to minimize losses and maximize gains. We focus on sustainable growth over time.",
  },
  {
    id: "panel10",
    question: "Can I withdraw my funds at any time?",
    answer:
      "Funds can only be withdrawn at the end of a trading session. This ensures that the algorithms can operate effectively throughout the session.",
  },
  {
    id: "panel11",
    question: "What is Syftset’s historical performance?",
    answer:
      "While past performance is not indicative of future results, Syftset has historically delivered returns exceeding 10% per session (45 days) on average. Our algorithms are designed to adapt to market conditions, prioritizing steady and sustainable growth.",
  },
  {
    id: "panel12",
    question: "How does Syftset’s performance compare to the market?",
    answer:
      "Compared to crypto market benchmarks, Syftset’s automated trading strategies have historically outperformed BTC and ETH, which averaged 9.81% and 5.35% per session, respectively. While we don’t guarantee specific returns, our focus on risk management and consistent execution has resulted in strong, risk-adjusted performance over time.",
  },
  {
    id: "panel13",
    question: "How does Syftset make money?",
    answer:
      "Syftset earns revenue through a profit-sharing model. At the end of each trading session, a percentage of the profits (e.g., 25–30%, depending on your plan) is allocated to Syftset. This ensures that our interests are aligned with yours — we only succeed when you do.",
  },
  {
    id: "panel14",
    question: "What if I have more questions?",
    answer:
      "Our support team is here to help! You can reach out to us via email for assistance.",
  },
];
export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: "text.primary",
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        Frequently asked questions
      </Typography>
      <Grid2 sx={{ width: "100%" }} container spacing={1}>
        {questions.map(({ question, answer, id, answerIsReactElement }) => {
          return (
            <Grid2
              component={Accordion}
              size={{ sm: 6 }}
              key={id}
              expanded={expanded === id}
              onChange={handleChange(id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography component="h3" variant="subtitle2">
                  {question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {answerIsReactElement ? (
                  <>{answer}</>
                ) : (
                  <Typography
                    variant="body2"
                    gutterBottom
                    sx={{ maxWidth: { sm: "100%", md: "70%" } }}
                  >
                    {answer}
                  </Typography>
                )}
              </AccordionDetails>
            </Grid2>
          );
        })}
      </Grid2>
    </Container>
  );
}
