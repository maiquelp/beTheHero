import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import homeImg from '../../assets/home.png';
import { Container, Section, Form, Input, H1, H2, LoginButton } from './styles'; //styled-components
import ReqButton from '../../components/ReqButton';

const Logon = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleLogin = async e => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await api.post('session', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userName', res.data.name);

            history.push('/profile');

        }catch (err) {
            if (err.response.status === 403) {
                alert('Usuário ainda não verificado, acesse o seu email')
                //alert(err.response.data) para retornar a mensagem de erro do backend
            }
            else {
                alert('Email ou senha não encontrados, verifique os dados e tente novamente.');
                setLoading(false);
            }

        }
    }
            
    return (
        <Container>
            <Section>
                <img src={logoImg} alt="logo" />
                <Form onSubmit={handleLogin}>
                    <H1>Faça o balanceamento do seu portfólio de investimentos</H1>
                    <H2>Logon</H2>
                    <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
                    <Input type="password" placeholder="Senha" value={password} 
                        onChange={e => setPassword(e.target.value)} />
                   
                    <ReqButton  loading={loading} text={'Entrar'} loadingText={'Entrando'} />
                    
                    <Link className="back-link" to="/register">
                        <LoginButton />
                        Não tenho cadastro
                    </Link>
                    <Link className="back-link" to="/recover">
                        <LoginButton />
                        Esqueci a senha
                    </Link>
                    
                </Form>
            </Section>
            <img src={homeImg} alt="heroes" />
        </Container>
    )
}

export default Logon;