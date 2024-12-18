import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import AlarmIcon from "@mui/icons-material/Alarm"; //日用品アイコン
import AddHomeIcon from "@mui/icons-material/AddHome"; //住居費アイコン
import Diversity3Icon from "@mui/icons-material/Diversity3"; //交際費アイコン
import SportsTennisIcon from "@mui/icons-material/SportsTennis"; //娯楽アイコン
import TrainIcon from "@mui/icons-material/Train"; //交通費アイコン
import WorkIcon from "@mui/icons-material/Work"; //給与アイコン
import SavingsIcon from "@mui/icons-material/Savings"; //お小遣いアイコン
import AddBusinessIcon from "@mui/icons-material/AddBusiness"; //副収入アイコン
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ExpenseCategory, IncomeCategory, Transaction } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionSchema, transactionSchema } from "../validations/schema";

interface TransactionFormProps {
  isEntryDrawerOpen: boolean;
  onCloseForm: () => void;
  currentDay: string;
  onSaveTransaction: (transaction: TransactionSchema) => Promise<void>;
  selectedTransaction: Transaction | null;
  onDeleteTransaction: (transactionId: string) => Promise<void>;
  setSelectedTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
  onUpdateTransaction: (transaction: TransactionSchema, transactionId: string) => Promise<void>;
}

type IncomeExpense = "expense" | "income";

interface CategoryItem {
  label: IncomeCategory | ExpenseCategory;
  icon: JSX.Element;
}

const TransactionForm = ({
  isEntryDrawerOpen,
  onCloseForm,
  currentDay,
  onSaveTransaction,
  selectedTransaction,
  onDeleteTransaction,
  setSelectedTransaction,
  onUpdateTransaction
}: TransactionFormProps) => {
  const formWidth = 320;

  const expenseCategories: CategoryItem[] = useMemo(() => [
    {label: "食費", icon: <FastfoodIcon fontSize='small'/>},
    {label: "日用品", icon: <AlarmIcon fontSize="small" />},
    {label: "住居費", icon: <AddHomeIcon fontSize="small" />},
    {label: "交際費", icon: <Diversity3Icon fontSize="small" />},
    {label: "娯楽", icon: <SportsTennisIcon fontSize="small" />},
    {label: "交通費", icon: <TrainIcon fontSize="small" />},
  ], []);

  const incomeCategories: CategoryItem[] = useMemo(() => [
    {label: "給与", icon: <WorkIcon fontSize="small" />},
    {label: "副収入", icon: <AddBusinessIcon fontSize="small" />},
    {label: "お小遣い", icon: <SavingsIcon fontSize="small" />},
  ], []);

  const [categories, setCategories] = useState(expenseCategories);

  // フォームの初期値を設定
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TransactionSchema>({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    },
    resolver: zodResolver(transactionSchema),
  });

  const incomeExpenseToggle = (type: IncomeExpense) => () => {
    setValue("type", type);
    setValue("category", "");
  };

  const currentType = watch("type");

  useEffect(() => {
    setValue("date", currentDay);
  }, [currentDay, setValue]); // 'setValue'を依存配列に追加

  useEffect(() => {
    setCategories(currentType === "expense" ? expenseCategories : incomeCategories);
  }, [currentType, expenseCategories, incomeCategories]);

  // 保存・更新ボタンを押したときの処理
  const onSubmit: SubmitHandler<TransactionSchema> = (data) => {
    if (selectedTransaction) {
      onUpdateTransaction(data, selectedTransaction.id)
        .then(() => {
          setSelectedTransaction(null);
        })
        .catch((err) => {
          console.error("更新に失敗しました:", err);
        });
    } else {
      onSaveTransaction(data)
        .then(() => {
          reset({
            type: "expense",
            date: currentDay,
            amount: 0,
            category: "",
            content: "",
          });
        })
        .catch((err) => {
          console.error("保存に失敗しました:", err);
        });
    }
  };

  useEffect(() => {
    // 選択肢が更新されたか確認
    if (selectedTransaction) {
      const isCategoryExist = categories.some((category) => category.label === selectedTransaction.category);
      setValue("category", isCategoryExist ? selectedTransaction.category : "" as IncomeCategory | ExpenseCategory);
    }
  }, [selectedTransaction, categories, setValue]); 

  useEffect(() => {
    if (selectedTransaction) {
      setValue("type", selectedTransaction.type);
      setValue("date", selectedTransaction.date);
      setValue("amount", selectedTransaction.amount);
      setValue("content", selectedTransaction.content);
    } else {
      reset({
        type: "expense",
        date: currentDay,
        amount: 0,
        category: "",
        content: "",
      });
    }
  }, [selectedTransaction, setValue, reset, currentDay]);

  const handleDelete = () => {
    if (selectedTransaction) {
      onDeleteTransaction(selectedTransaction.id);
      setSelectedTransaction(null);
    }
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ButtonGroup fullWidth>
                <Button
                  variant={field.value === "expense" ? "contained" : "outlined"}
                  color="error"
                  onClick={incomeExpenseToggle("expense")}
                >
                  支出
                </Button>
                <Button
                  variant={field.value === "income" ? "contained" : "outlined"}
                  onClick={incomeExpenseToggle("income")}
                >
                  収入
                </Button>
              </ButtonGroup>
            )}
          />
          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />
          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="カテゴリ"
                label="カテゴリ"
                select
                error={!!errors.category}
                helperText={errors.category?.message}
              >
                {categories.map((category, index ) => (
                  <MenuItem value={category.label} key={index}>
                    <ListItemIcon>
                      {category.icon}
                    </ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  field.onChange(newValue);
                }}
                label="金額"
                type="number"
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            )}
          />

          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="内容"
                type="text"
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />
          {/* 保存・更新ボタン */}
          <Button
            type="submit"
            variant="contained"
            color={currentType === "expense" ? "error" : "primary"}
            fullWidth
          >
            {selectedTransaction ? "更新" : "保存"}
          </Button>
          {/* 削除ボタン */}
          {selectedTransaction && (
            <Button
              onClick={handleDelete}
              variant="outlined"
              color={"secondary"}
              fullWidth
            >
            削除
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
