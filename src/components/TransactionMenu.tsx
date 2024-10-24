import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Drawer,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
//アイコン
import NotesIcon from "@mui/icons-material/Notes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DailySummary from "./DailySummary";
import { Transaction } from "../types";
import { formatCurrency } from "../utils/formatting";
import IconComponents from "./common/IconComponents";
import { theme } from "../theme/theme";

interface TransactionMenuProps {
  dailyTransactions: Transaction[];
  currentDay: string;
}

const TransactionMenu = ({dailyTransactions, currentDay}: TransactionMenuProps) => {
  const menuDrawerWidth = 320;
  return (
    <Drawer
      sx={{
        width: menuDrawerWidth,
        "& .MuiDrawer-paper": {
          width: menuDrawerWidth,
          boxSizing: "border-box",
          p: 2,
          top: 64,
          height: `calc(100% - 64px)`, // AppBarの高さを引いたビューポートの高さ
        },
      }}
      variant={"permanent"}
      anchor={"right"}
    >
      <Stack sx={{ height: "100%" }} spacing={2}>
        <Typography fontWeight={"fontWeightBold"}>日時： {currentDay}</Typography>
        <DailySummary dailyTransactions={dailyTransactions} />
        {/* 内訳タイトル&内訳追加ボタン */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          {/* 左側のメモアイコンとテキスト */}
          <Box display="flex" alignItems="center">
            <NotesIcon sx={{ mr: 1 }} />
            <Typography variant="body1">内訳</Typography>
          </Box>
          {/* 右側の追加ボタン */}
          <Button startIcon={<AddCircleIcon />} color="primary">
            内訳を追加
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <List aria-label="取引履歴">
            <Stack spacing={2}>
              {dailyTransactions.map((transaction) => (
                <ListItem disablePadding>
                  <Card
                    sx={{
                      width: "100%",
                      backgroundColor:
                        transaction.type === "income"
                          ? theme.palette.incomeColor.light
                          : theme.palette.expenseColor.light,
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Box
                          display="flex"
                          flexWrap="wrap"
                          alignItems="center"
                          gap={1}
                        >
                          <Box sx={{ flex: 1 }}>
                            {/* icon */}
                            {IconComponents[transaction.category]}
                          </Box>
                          <Box sx={{ flex: 2.5 }}>
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              {transaction.category}
                            </Typography>
                          </Box>
                          <Box sx={{ flex: 4 }}>
                            <Typography variant="body2" gutterBottom>
                              {transaction.content}
                            </Typography>
                          </Box>
                          <Box sx={{ flex: 4.5 }}>
                            <Typography
                              gutterBottom
                              textAlign={"right"}
                              color="text.secondary"
                              sx={{
                              wordBreak: "break-all",
                            }}
                            >
                              ¥{formatCurrency(transaction.amount)}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </ListItem>
              ))}
            </Stack>
          </List>
        </Box>
      </Stack>
    </Drawer>
  );
};
export default TransactionMenu;
