import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Pie } from 'react-chartjs-2'
import { ExpenseCategory, IncomeCategory, Transaction, TransactionType } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryChartProps {
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}

const CategoryChart = ({ monthlyTransactions, isLoading }: CategoryChartProps) => {
  const theme = useTheme();
  const [selectedType, setSelectedType] = useState<TransactionType>("expense");

  const handleTypeChange = (e: SelectChangeEvent<TransactionType>) => {
    setSelectedType(e.target.value as TransactionType);
  };

  const categorySums = monthlyTransactions
    .filter((transaction) => transaction.type === selectedType)
    .reduce<Record<IncomeCategory | ExpenseCategory, number>>((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<IncomeCategory | ExpenseCategory, number>);

  const categoryLabels = Object.keys(categorySums) as (IncomeCategory | ExpenseCategory)[];
  const categoryValues = Object.values(categorySums);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  }

  const incomeCategoryColor: Record<IncomeCategory, string> = {
    給与: theme.palette.incomeCategoryColor.給与,
    副収入: theme.palette.incomeCategoryColor.副収入,
    お小遣い: theme.palette.incomeCategoryColor.お小遣い,
  }
  const expenseCategoryColor: Record<ExpenseCategory, string> = {
    食費: theme.palette.expenseCategoryColor.食費,
    日用品: theme.palette.expenseCategoryColor.日用品,
    住居費: theme.palette.expenseCategoryColor.住居費,
    交際費: theme.palette.expenseCategoryColor.交際費,
    娯楽: theme.palette.expenseCategoryColor.娯楽,
    交通費: theme.palette.expenseCategoryColor.交通費,
  }

  const getCategoryColor = (category: IncomeCategory | ExpenseCategory): string => {
    if (selectedType === "income") {
      return incomeCategoryColor[category as IncomeCategory];
    } else {
      return expenseCategoryColor[category as ExpenseCategory];
    }
  }

  const data: ChartData<'pie'> = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: categoryLabels.map((category) => {
          return getCategoryColor(category);
        }),
        borderColor: categoryLabels.map((category) => {
          return getCategoryColor(category);
        }),
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="select-type-label">収支の種類</InputLabel>
        <Select
          labelId="select-type-label"
          id="select-type"
          label="収支の種類"
          value={selectedType}
          onChange={handleTypeChange}
      >
          <MenuItem value="income">収入</MenuItem>
          <MenuItem value="expense">支出</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        {isLoading ? (
        <CircularProgress />
      ) : monthlyTransactions.length > 0 ? (
          <Pie data={data} options={options} />
        ) : (
          <Typography>データがありません</Typography>
        )}
      </Box>
      
    </>
  )
}

export default CategoryChart