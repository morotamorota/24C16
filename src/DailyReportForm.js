import React, { useState } from 'react';

const DailyReportForm = () => {
  // 今日の日付を "YYYY-MM-DD" 形式で取得する関数
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');  // 月は0から始まるので+1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 現在の時間を "HH:MM" 形式で取得する関数
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [reportData, setReportData] = useState({
    startTime: getCurrentTime(),  // 開始時刻を現在の時間に設定
    endTime: '',  // 終了時刻はデフォルトで空
    date: getTodayDate(),  // 日付の初期値を今日に設定
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
          <label>開始時刻: </label>
          <input type="time" name="startTime" value={reportData.startTime} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>終了時刻: </label>
          <input type="time" name="endTime" value={reportData.endTime} onChange={handleChange} />
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
