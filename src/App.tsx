import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/Nomatch';
import AppLayout from './components/layout/AppLayout';
import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { formatMonth } from './utils/formatting';
import { TransactionSchema } from './validations/schema';
function App() {

  // Firestoreエラーかどうかを判断する型ガード
  function isFireStoreError(err: unknown): err is {code: string, message: string} {
    return typeof err === "object" && err !== null && "code" in err && "message" in err;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        // console.log(querySnapshot);

        const transactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction;
        });
        // console.log(transactionsData)
        setTransactions(transactionsData);
      } catch (err) {
        if (isFireStoreError(err)) {
          console.error("Firestoreエラーは:", err);
        } else {
          console.error("一般的なエラーは:", err);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchTransactions();
  },[]);

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  // 取引を保存する処理
  const handleSaveTransaction = async (transaction: TransactionSchema) => {
    try {
      // firestoreにデータを保存する
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      // console.log("Document written with ID: ", docRef.id);

      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("Firestoreエラーは:", err);
      } else {
        console.error("一般的なエラーは:", err);
      }
    }
  };

  // 取引を削除する処理
  const handleDeleteTransaction = async (transactionId: string) => {
    // firestoreからデータを削除する
    try {
      await deleteDoc(doc(db, "Transactions", transactionId));
      const filteredTransactions = transactions.filter((transaction) => transaction.id !== transactionId);
      setTransactions(filteredTransactions);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("Firestoreエラーは:", err);
      } else {
        console.error("一般的なエラーは:", err);
      }
    }
  }

  // 取引を更新する処理
  const handleUpdateTransaction = async (transaction: TransactionSchema, transactionId: string) => {
    try {
      const docRef = doc(db, "Transactions", transactionId);
      await updateDoc(docRef, transaction);
      // 更新した取引をtransactionsに反映する
      const updatedTransactions = transactions.map((t) => t.id === transactionId ? {
        ...t,
        ...transaction,
      } as Transaction : t);
      setTransactions(updatedTransactions);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("Firestoreエラーは:", err);
      } else {
        console.error("一般的なエラーは:", err);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={
              <Home
                monthlyTransactions={monthlyTransactions}
                setCurrentMonth={setCurrentMonth}
                onSaveTransaction={handleSaveTransaction}
                onDeleteTransaction={handleDeleteTransaction}
                onUpdateTransaction={handleUpdateTransaction}
              />}
          />
          <Route
            path="/report"
            element={
              <Report
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                monthlyTransactions={monthlyTransactions}
                isLoading={isLoading}
              />
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
