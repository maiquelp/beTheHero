import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Container, Content, Section, H1, P, Form, Input, ArrowLeftButton } from '../../components/Container';// component styled-components
import ReqButton from '../../components/ReqButton';
import logoImg from '../../assets/logo.svg'

import api from '../../services/api';

const Recover = () => {

    const [ email, setEmail ] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleRecover = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await api.put('recover', {email})

            alert('Pedido recebido, aguarde alguns instantes e verifique o seu email');

            history.push('/')

        } catch (error) {
            alert('Verifique o email e tente novamente');
            setLoading(false);
        }
    }

    return (
        <Container>
        <Content>
            <Section>
                <img src={logoImg} alt="logo"/>
                <H1>Recuperação de Senha</H1>
                <P>Será enviado um email para o endereço informado no cadastro com um link para o recadastramento da senha.</P>
                <Link className="back-link" to="/">
                    <ArrowLeftButton size={16} color="#E02041" />
                    Home
                </Link>
            </Section>
            <Form onSubmit={handleRecover}> 
                <Input value={email} onChange={ e => setEmail(e.target.value)} placeholder="email" autoFocus />
                <ReqButton  loading={loading} text={'Enviar'} loadingText={'Enviando'} />

            </Form>
        </Content>
        </Container>
    )
}

export default Recover;