import { Card, Box, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const MonthlySummary = () => {
  return (
    <Stack direction="row" spacing={{ xs: 1, sm: 2 }} mb={2}>
      {/* 収入 */}
      <Box sx={{ flex: 1 }} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.incomeColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}
        >
          <CardContent sx={{ padding: {xs: 1, sm: 2} }}>
            <Stack direction={"row"}>
              <ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
              <Typography>収入</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{ wordBreak: "break-word", fontSize: {xs: "0.8rem", sm: "1rem", md: "1.2rem"} }}
            >￥100</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* 支出 */}
      <Box sx={{ flex: 1 }} display={"flex"} flexDirection={"column"}>
      <Card
          sx={{
            bgcolor: (theme) => theme.palette.expenseColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}
        >
          <CardContent sx={{ padding: {xs: 1, sm: 2} }}>
            <Stack direction={"row"}>
              <ArrowDownwardIcon sx={{ fontSize: "2rem" }} />
              <Typography>支出</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{ wordBreak: "break-word", fontSize: {xs: "0.8rem", sm: "1rem", md: "1.2rem"} }}
            >￥100</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* 残高 */}
      <Box sx={{ flex: 1 }} display={"flex"} flexDirection={"column"}>
      <Card
          sx={{
            bgcolor: (theme) => theme.palette.balanceColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}
        >
          <CardContent sx={{ padding: {xs: 1, sm: 2} }}>
            <Stack direction={"row"}>
              <AccountBalanceIcon sx={{ fontSize: "2rem" }} />
              <Typography>残高</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{ wordBreak: "break-word", fontSize: {xs: "0.8rem", sm: "1rem", md: "1.2rem"} }}
            >￥100</Typography>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  )
}

export default MonthlySummary
