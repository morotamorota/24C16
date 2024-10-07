import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // useNavigateを使用

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loginStatus, setLoginStatus] = useState('');  // ログインステータスを管理する変数
  const navigate = useNavigate();  // useNavigateを使用してページ遷移

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', credentials);
      if (response.data.success) {
        if (response.data.role === 'worker') {
          // 作業者のログインが成功したらステータスを更新し、フォームへ遷移
          setLoginStatus('ログイン成功 (作業者)');
          navigate('/worker-dashboard');
        } else if (response.data.role === 'admin') {
          // 管理者のログインが成功したらステータスを更新し、管理者ダッシュボードへ遷移
          setLoginStatus('ログイン成功 (管理者)');
          navigate('/admin-dashboard');
        }
      } else {
        // ログイン失敗時にステータスを更新
        setLoginStatus('ログイン失敗: ユーザー名またはパスワードが間違っています');
      }
    } catch (error) {
      console.error('Login error', error);
      setLoginStatus('ログイン中にエラーが発生しました');
    }
  };

  return (
    <div style={{ margin: '50px' }}>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>ユーザー名: </label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="ユーザー名を入力"
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>パスワード: </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="パスワードを入力"
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
      {/* ログインステータスの表示 */}
      <p style={{ color: loginStatus.includes('成功') ? 'green' : 'red' }}>
        {loginStatus}
      </p>
    </div>
  );
};

export default Login;
