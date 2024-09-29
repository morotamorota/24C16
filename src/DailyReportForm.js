import React, { useState } from 'react';

const DailyReportForm = () => {
  const [reportData, setReportData] = useState({
    time: '',
    date: '',
    projectName: '',
    subNumber: '',
    division: '',
    companyName: '',
    workerName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(reportData);
    alert("報告書が正常に送信されました！");
  };

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>日報入力</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>時間: </label>
          <input type="time" name="time" value={reportData.time} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>日付: </label>
          <input type="date" name="date" value={reportData.date} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>工事名: </label>
          <input type="text" name="projectName" value={reportData.projectName} onChange={handleChange} placeholder="工事名を入力してください" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>枝番: </label>
          <input type="text" name="subNumber" value={reportData.subNumber} onChange={handleChange} placeholder="枝番を入力してください" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>区分: </label>
          <input type="text" name="division" value={reportData.division} onChange={handleChange} placeholder="区分を入力してください" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>会社名: </label>
          <input type="text" name="companyName" value={reportData.companyName} onChange={handleChange} placeholder="会社名を入力してください" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>作業者名: </label>
          <input type="text" name="workerName" value={reportData.workerName} onChange={handleChange} placeholder="作業者名を入力してください" />
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>送信</button>
      </form>
    </div>
  );
};

export default DailyReportForm;
