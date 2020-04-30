import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg'

import api from '../../services/api';

const Recover = () => {

    const [ email, setEmail ] = useState('');

    const history = useHistory();

    const handleRecover = async (e) => {
        e.preventDefault();

        try {
            await api.put('recover', {email})

            alert('Pedido recebido, aguarde alguns instantes e verifique o seu email');

            history.push('/')

        } catch (error) {
            alert('Verifique o email e tente novamente')
        }
    }

    return (
        <div className="recover-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="logo"/>
                <h1>Recuperação de Senha</h1>
                <p>Será enviado um email para o endereço informado com um link para recadastramento da senha.</p>
                <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#E02041" />
                    Home
                </Link>
            </section>
            <form onSubmit={handleRecover}> 
                <input value={email} onChange={ e => setEmail(e.target.value)} placeholder="email" />
                <button className="button" type="submit">Enviar</button>
            </form>
        </div>
        </div>
    )
}

export default Recover;