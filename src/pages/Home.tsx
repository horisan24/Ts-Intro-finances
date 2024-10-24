import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/Calender'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [currentDay, setCurrentDay] = useState<string>(today);
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState<boolean>(false);

  const dailyTransactions = monthlyTransactions.filter(transaction => transaction.date === currentDay);  

  const CloseForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
  }

  // フォームの開閉処理
  const handleAddTransactionForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 左側コンテンツ */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calender
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          today={today}
        />
      </Box>

      {/* 右側コンテンツ */}
      <Box>
        <TransactionMenu
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
          onAddTransactionForm={handleAddTransactionForm}
        />
        <TransactionForm
          isEntryDrawerOpen={isEntryDrawerOpen}
          onCloseForm={CloseForm}
          currentDay={currentDay}
        />
      </Box>
    </Box>
  )
}

export default Home