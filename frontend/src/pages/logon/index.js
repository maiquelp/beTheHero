import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

const Logon = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = async e => {
        e.preventDefault();

        try {
            const res = await api.post('session', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('ongName', res.data.name);

            history.push('/profile');
            
        } catch (err) {
            alert('Email ou senha não encontrados, verifique os dados e tente novamente')
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logo" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Senha" value={password} 
                        onChange={e => setPassword(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>
                    
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                    <Link className="back-link" to="/recover">
                        <FiLogIn size={16} color="#E02041" />
                        Esqueci a senha
                    </Link>
                    
                </form>
            </section>
            <img src={heroesImg} alt="heroes" />
        </div>
    )
}

export default Logon;