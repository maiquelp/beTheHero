import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { Container, Content, Section, H1, P, Form, Input } from '../../components/Container';// component styled-components
import logoImg from '../../assets/logo.svg'

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
        <Container>
            <Content>
                <Section>
                    <img src={logoImg} alt="logo"/>
                    <H1>Recadastramento de Senha</H1>
                    <P>Informe a nova senha de acesso</P>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Home
                    </Link>
                </Section>
                <Form onSubmit={handleReset}> 
                    <Input value={password} type="password" onChange={ e => setPassword(e.target.value)} placeholder="Nova Senha" />
                    <button className="button" type="submit">Enviar</button>
                </Form>
            </Content>
        </Container>
    )
}

export default Reset;