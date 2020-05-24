import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { Container, Content, Section, H1, P, Form, Input } from '../../components/Container';// component styled-components
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
        <Container>
        <Content>
            <Section>
                <img src={logoImg} alt="logo"/>
                <H1>Recuperação de Senha</H1>
                <P>Será enviado um email para o endereço informado com um link para recadastramento da senha.</P>
                <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#E02041" />
                    Home
                </Link>
            </Section>
            <Form onSubmit={handleRecover}> 
                <Input value={email} onChange={ e => setEmail(e.target.value)} placeholder="email" />
                <button className="button" type="submit">Enviar</button>
            </Form>
        </Content>
        </Container>
    )
}

export default Recover;