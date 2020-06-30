import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Container, Content, Section, H1, P, Form, Input, ArrowLeftButton } from '../../components/Container';// component styled-components
import ReqButton from '../../components/ReqButton';
import logoImg from '../../assets/logo.svg'

import api from '../../services/api';

const Reset = () => {

    const [ password, setPassword ] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleReset = async (e) => {
        e.preventDefault();

        setLoading(true);

        const params = (new URL(document.location)).searchParams;

        try {
            await api.put('reset?' + params, {password});

            alert('Nova senha cadastrada');

            history.push('/')

        } catch (error) {
            alert('Falha ao criar nova senha, tente novamente ou solicite a recuperação de senha novamente');
            setLoading(false);
        }
    }

    return (
        <Container>
            <Content>
                <Section>
                    <img src={logoImg} alt="logo"/>
                    <H1>Recadastramento de Senha</H1>
                    <P>Informe a nova senha de acesso</P>
                    <Link className="back-link" to="/">
                        <ArrowLeftButton size={16} color="#E02041" />
                        Home
                    </Link>
                </Section>
                <Form onSubmit={handleReset}> 
                    <Input value={password} type="password" onChange={ e => setPassword(e.target.value)} placeholder="Nova Senha" autoFocus />
                    <ReqButton  loading={loading} text={'Enviar'} loadingText={'Enviando'} />
                </Form>
            </Content>
        </Container>
    )
}

export default Reset;