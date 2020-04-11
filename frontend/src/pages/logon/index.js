import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

const Logon = props => {
    const [id, setId] = useState('');
    const history = useHistory();

    const handleLogin = async e => {
        e.preventDefault();

        try {
            const res = await api.post('session', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', res.data.name);

            history.push('/profile');
            
        } catch (err) {
            alert('Id não encontrada, tente novamente')
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logo" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Sua id" value={id} onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>
                    
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                    
                </form>
            </section>
            <img src={heroesImg} alt="heroes" />
        </div>
    )
}

export default Logon;