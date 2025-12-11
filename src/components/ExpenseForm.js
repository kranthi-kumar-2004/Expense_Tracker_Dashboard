import React, { useState } from 'react';

export default function ExpenseForm({ addExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Other');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    addExpense({
      title,
      amount: parseFloat(amount),
      category,
      date
    });
    setTitle(''); setAmount(''); setCategory('Other'); setDate(new Date().toISOString().slice(0,10));
  };

  return (
    <form className="card form" onSubmit={submitHandler}>
      <h3>Add Expense</h3>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Entertainment</option>
        <option>Other</option>
      </select>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}