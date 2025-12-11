import React from 'react';

export default function ExpenseList({ expenses, deleteExpense, clearAll }) {
  const total = expenses.reduce((s, e) => s + (e.amount || 0), 0);
  return (
    <div className="card list">
      <div className="list-header">
        <h3>Recent Expenses</h3>
        <div className="totals">Total: ₹{total.toFixed(2)}</div>
      </div>
      <ul>
        {expenses.length === 0 && <li className="empty">No expenses yet</li>}
        {expenses.map(exp => (
          <li key={exp.id}>
            <div>
              <div className="title">{exp.title}</div>
              <div className="meta">{exp.category} • {exp.date}</div>
            </div>
            <div className="right">
              <div className="amount">₹{exp.amount}</div>
              <button className="del" onClick={() => deleteExpense(exp.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {expenses.length > 0 && <button className="clear" onClick={clearAll}>Clear All</button>}
    </div>
  );
}