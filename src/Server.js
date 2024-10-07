const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// CORS設定とBodyパーサー設定
app.use(cors());
app.use(bodyParser.json());

// MySQL接続設定
const db = mysql.createConnection({
  host: 'localhost',    // データベースホスト名
  user: 'root',         // MySQLユーザー名
  password: 'ckyu676D0620!', // MySQLパスワード
  database: 'dairy_data' // データベース名
});

// MySQL接続確認
db.connect((err) => {
  if (err) {
    console.error('データベース接続エラー:', err);
    return;
  }
  console.log('データベースに接続しました');
});

/*
// 日報データの挿入エンドポイント
app.post('/submit-report', (req, res) => {
  const { date, projectName, subNumber, division, companyName, workerName, startTime, endTime } = req.body;

  // SQLクエリを準備
  const query = `
    INSERT INTO 工事データ (日付, 工事名, 枝番, 区分, 会社名, 作業者名, 開始時刻, 終了時刻, 登録確認日時)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  const values = [date, projectName, subNumber, division, companyName, workerName, startTime, endTime];

  // データベースに挿入
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('データ挿入エラー:', err.sqlMessage); // SQLエラーメッセージをログに出力
      res.status(500).json({ success: false, message: 'データ挿入に失敗しました', error: err.sqlMessage }); // エラー内容をクライアントに返す
      return;
    }
    res.json({ success: true, message: 'データが正常に挿入されました' });
  });
});
*/




const users = [
  { username: 'worker1', password: 'password123', role: 'worker' },
  { username: 'admin1', password: 'adminpassword', role: 'admin' }
];

// ログインAPI
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, role: user.role }); // 成功時に役割も返す
  } else {
    res.json({ success: false }); // 認証失敗
  }
});

// サーバーの起動
app.listen(3001, () => {
  console.log('サーバーはポート3001で稼働中');
});
