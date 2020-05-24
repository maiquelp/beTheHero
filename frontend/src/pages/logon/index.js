import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import { LogonContainer, 
    LogonContainerSection, 
    LogonContainerSectionForm, 
    LogonContainerSectionFormInput, 
    LogonContainerSectionFormH1 } from './styles'; //styled-components

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

        }catch (err) {
            if (err.response.status === 403) {
                alert('Usuário ainda não verificado, acesse o seu email')
                //alert(err.response.data) para retornar a mensagem de erro do backend
            }
            else alert('Email ou senha não encontrados, verifique os dados e tente novamente.')
        }
    }
            
    return (
        <LogonContainer>
            <LogonContainerSection>
                <img src={logoImg} alt="logo" />
                <LogonContainerSectionForm onSubmit={handleLogin}>
                    <LogonContainerSectionFormH1>Faça seu logon</LogonContainerSectionFormH1>
                    <LogonContainerSectionFormInput type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <LogonContainerSectionFormInput type="password" placeholder="Senha" value={password} 
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
                    
                </LogonContainerSectionForm>
            </LogonContainerSection>
            <img src={heroesImg} alt="heroes" />
        </LogonContainer>
    )
}

export default Logon;