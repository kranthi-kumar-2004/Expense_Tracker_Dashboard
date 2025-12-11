import React, { useMemo } from 'react';
import DashboardChart from './DashboardChart';
import CategoryChart from './CategoryChart';

export default function Dashboard({ expenses }) {
  const summary = useMemo(() => {
    const total = expenses.reduce((s, e) => s + (e.amount || 0), 0);
    const byCategory = {};
    expenses.forEach(e => {
      byCategory[e.category] = (byCategory[e.category] || 0) + (e.amount || 0);
    });
    return { total, byCategory };
  }, [expenses]);

  return (
    <div className="card dashboard">
      <div className="summary">
        <div>
          <h4>Total Spent</h4>
          <div className="big">₹{summary.total.toFixed(2)}</div>
        </div>
        <div>
          <h4>Expenses</h4>
          <div className="big">{expenses.length}</div>
        </div>
      </div>

      <div className="charts">
        <div className="chart">
          <h4>Spending Over Time</h4>
          <DashboardChart expenses={expenses} />
        </div>
        <div className="chart">
          <h4>By Category</h4>
          <CategoryChart byCategory={summary.byCategory} />
        </div>
      </div>
    </div>
  );
}