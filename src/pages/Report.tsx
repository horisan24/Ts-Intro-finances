import { Box, Paper, Theme, useMediaQuery } from '@mui/material'
import React from 'react'
import MonthSelector from '../components/MonthSelector';
import CategoryChart from '../components/CategoryChart';
import BarChart from '../components/BarChart';
import TransactionTable from '../components/TransactionTable';
import { Transaction } from '../types';

interface ReportProps {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}

const Report = ({ currentMonth, setCurrentMonth, monthlyTransactions, isLoading }: ReportProps) => {
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const commonPaperStyle = {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    margin: "8px",
    padding: 2,
  }

  return (
    <Box>
      <Box
        display="flex"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        {/* 日付選択エリア */}
        <MonthSelector currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      </Box>
      <Box
        display="flex"
        flexDirection={isSmallScreen ? 'column' : 'row'}
        width="100%"
      >
        <Box
          flex={isSmallScreen ? undefined : 1}
          width={isSmallScreen ? '100%' : "33.33%"}
        >
          <Paper sx={commonPaperStyle}>
            <CategoryChart />
          </Paper>
        </Box>
        <Box
          flex={isSmallScreen ? undefined : 2}
          width={isSmallScreen ? '100%' : "66.67%"}
        >
          <Paper sx={commonPaperStyle}>
            <BarChart monthlyTransactions={monthlyTransactions} isLoading={isLoading} />
          </Paper>
        </Box>
      </Box>
      <Box
        display="flex"
        width="100%"
      >
        <TransactionTable />
      </Box>
    </Box>
  )
}

export default Report