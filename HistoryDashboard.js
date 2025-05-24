import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoryDashboard = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/analysis', {
          headers: { Authorization: token },
        });
        setHistory(res.data);
      } catch (err) {
        alert('Failed to fetch analysis history');
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Analysis History</h2>
      <div className="space-y-4">
        {history.map((entry, idx) => (
          <div key={idx} className="border p-4 rounded shadow-sm">
            <div><strong>X Axis:</strong> {entry.xAxis}</div>
            <div><strong>Y Axis:</strong> {entry.yAxis}</div>
            <div><strong>Saved:</strong> {new Date(entry.createdAt).toLocaleString()}</div>
            <div><strong>Data Points:</strong> {entry.chartData.length}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryDashboard;
