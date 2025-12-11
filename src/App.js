import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('expenses')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses(prev => [{ ...expense, id: Date.now() }, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const clearAll = () => setExpenses([]);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <section className="left">
          <ExpenseForm addExpense={addExpense} />
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense} clearAll={clearAll} />
        </section>
        <section className="right">
          <Dashboard expenses={expenses} />
        </section>
      </main>
    </div>
  );
}