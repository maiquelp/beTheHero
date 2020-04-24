import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg'

import './styles.css'
import api from '../../services/api';

const Reset = () => {

    const [ password, setPassword ] = useState('');

    const history = useHistory();

    const handleReset = async (e) => {
        e.preventDefault();

        const params = (new URL(document.location)).searchParams;

        try {
            await api.put('reset?' + params, {password});

            alert('Nova senha cadastrada');

            history.push('/')

        } catch (error) {
            alert('Falha ao criar nova senha, tente novamente ou solicite a recuperação de senha novamente')
        }
    }

    return (
        <div className="reset-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="logo"/>
                <h1>Recadastramento de Senha</h1>
                <p>Informe a nova senha de acesso</p>
                <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#E02041" />
                    Home
                </Link>
            </section>
            <form onSubmit={handleReset}> 
                <input value={password} type="password" onChange={ e => setPassword(e.target.value)} placeholder="Nova Senha" />
                <button className="button" type="submit">Enviar</button>
            </form>
        </div>
        </div>
    )
}

export default Reset;