import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../services/AuthService';
import './login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    const handleLogin = () => {
        const usuario = login(email, senha);
        if (usuario) {
            history.push('/home');
        } else {
            alert('Email ou senha incorretos!');
        }
    };

    return (

        <div className='login-container'>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <button onClick={handleLogin}>Entrar</button>
            <button>Criar Conta</button>
        </div>
    );
};

export default Login;