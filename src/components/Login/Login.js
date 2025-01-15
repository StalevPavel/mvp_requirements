import './Login.css';
import { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Авторизация</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-input-group">
                    <label htmlFor="username" className="login-label">Имя пользователя:</label>
                    <input
                        id="username"
                        type="text"
                        className="login-input"
                        placeholder="Введите имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="login-input-group">
                    <label htmlFor="password" className="login-label">Пароль:</label>
                    <input
                        id="password"
                        type="password"
                        className="login-input"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-button">Войти</button>
            </form>
        </div>
    );
};

export default Login;
