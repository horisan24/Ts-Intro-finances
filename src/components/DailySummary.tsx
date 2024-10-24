import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Transaction } from "../types";
import { financeCalculations } from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formatting";

interface DailySummaryProps {
  dailyTransactions: Transaction[];
}

const DailySummary = ({dailyTransactions}: DailySummaryProps) => {
  const { income, expense, balance } = financeCalculations(dailyTransactions);
  return (
    <Box>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {/* 収入 */}
        <Box flex={1} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                収入
              </Typography>
              <Typography
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{ 
                  wordBreak: "break-all",
                  color: (theme) => theme.palette.incomeColor.main
                }}
              >
                ¥{formatCurrency(income)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        {/* 支出 */}
        <Box flex={1} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                支出
              </Typography>
              <Typography
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{ 
                  wordBreak: "break-all",
                  color: (theme) => theme.palette.expenseColor.main
                }}
              >
                ¥{formatCurrency(expense)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        {/* 残高 */}
        <Box flex={1} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                残高
              </Typography>
              <Typography
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{ 
                  wordBreak: "break-all",
                  color: (theme) => theme.palette.balanceColor.main
                }}
              >
                ¥{formatCurrency(balance)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
export default DailySummary;
