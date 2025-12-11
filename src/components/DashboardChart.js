import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function DashboardChart({ expenses }) {
  // group by date
  const data = useMemo(() => {
    const map = {};
    expenses.forEach(e => {
      map[e.date] = (map[e.date] || 0) + (e.amount || 0);
    });
    // sort dates
    const arr = Object.keys(map).sort().map(d => ({ date: d, amount: map[d] }));
    // ensure at least last 7 days are present
    if (arr.length === 0) {
      const today = new Date().toISOString().slice(0,10);
      return [{ date: today, amount: 0 }];
    }
    return arr;
  }, [expenses]);

  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}