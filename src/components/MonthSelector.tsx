import { Box, Button } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { addMonths } from 'date-fns';
import { ja } from 'date-fns/locale';
import React from 'react'

interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
}

const MonthSelector = ({ currentMonth, setCurrentMonth }: MonthSelectorProps) => {

  // 年月を変更したときの処理
  const handleChangeMonth = (date: Date | null) => {
    if (date) {
      setCurrentMonth(date);
    }
  }

  // 先月ボタンを押したときの処理
  const handlePreviousMonth = () => {
    const previousMonth = addMonths(currentMonth, -1);
    setCurrentMonth(previousMonth);
  }

  // 次月ボタンを押したときの処理
  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    setCurrentMonth(nextMonth);
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ja}
    >
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Button
          color="error"
          variant="contained"
          onClick={handlePreviousMonth}
        >
          先月
        </Button>
        <DatePicker
          label="年月を選択"
          value={currentMonth}
          sx={{ mx: 2, backgroundColor: "white" }}
          views={["year", "month"]}
          format="yyyy/MM"
          slotProps={{
            toolbar: {
              toolbarFormat: "yyyy年MM月",
            }
          }}
          onChange={handleChangeMonth}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={handleNextMonth}
        >
          次月
        </Button>
      </Box>
    </LocalizationProvider>
  )
}

export default MonthSelector