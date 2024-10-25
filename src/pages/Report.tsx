import { Box, Paper, Theme, useMediaQuery } from '@mui/material'
import React from 'react'
import MonthSelector from '../components/MonthSelector';
import CategoryChart from '../components/CategoryChart';
import BarChart from '../components/BarChart';
import TransactionTable from '../components/TransactionTable';

const Report = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const commonPaperStyle = {
    height: { xs: "auto", md: "400px" },
    display: "flex",
    flexDirection: "column",
  }

  return (
    <Box>
      <Box
        bgcolor="red"
        display="flex"
        width="100%"
      >
        <MonthSelector />
      </Box>
      <Box
        display="flex"
        flexDirection={isSmallScreen ? 'column' : 'row'}
        width="100%"
      >
        <Box
          bgcolor="green"
          flex={isSmallScreen ? undefined : 1}
          width={isSmallScreen ? '100%' : "33.33%"}
          display="flex"
        >
          <Paper sx={commonPaperStyle}>
            <CategoryChart />
          </Paper>
        </Box>
        <Box
          bgcolor="blue"
          flex={isSmallScreen ? undefined : 2}
          width={isSmallScreen ? '100%' : "66.67%"}
          display="flex"
        >
          <Paper sx={commonPaperStyle}>
            <BarChart />
          </Paper>
        </Box>
      </Box>
      <Box
        bgcolor="yellow"
        display="flex"
        width="100%"
      >
        <TransactionTable />
      </Box>
    </Box>
  )
}

export default Report