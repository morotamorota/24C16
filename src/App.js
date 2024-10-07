import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import DailyReportForm from './DailyReportForm';  // 名前を一致させる
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/worker-dashboard" element={<DailyReportForm />} />  {/* 正しい名前で使用 */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
