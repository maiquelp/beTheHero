import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Container, Content, Section, H1, P, ArrowLeftButton } from '../../components/Container'; // component styled-components   
import ReqButton from '../../components/ReqButton';
import { Form, Input } from './styles.js'; // page styled-components
import logoImg from '../../assets/logo.svg'

import api from '../../services/api';

const NewAsset = () => {

    const [ title, setTitle ] = useState('');
    const [ value, setValue ] = useState('');
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');

    const history = useHistory();

    const handleNewAsset = async (e) => {
        e.preventDefault();

        setLoading(true);

        const data = { title, value }

        try {
            await api.post('asset', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            history.push('/profile')

        } catch (error) {
            alert('Erro ao cadastrar, tente novamente');
            setLoading(false);
        }
    }

    return (
        <Container>
            <Content>
                <Section>
                    <img src={logoImg} alt="logo"/>
                    <H1>Cadastrar novo ativo</H1>
                    <P>Cadastre o seu ativo informando o ticker e o valor total de mercado.</P>
                    <Link className="back-link" to="/profile">
                        <ArrowLeftButton />
                        Voltar para Dashboard
                    </Link>
                </Section>
                <Form onSubmit={handleNewAsset}> 
                    <Input value={title} onChange={ e => setTitle(e.target.value)} placeholder="Ticker do ativo" required autoFocus />
                    <Input value={value} type="number" min="0.01" step="0.01" onChange={ e => setValue(e.target.value)} 
                        placeholder="Valor total de mercado em R$" required />
                    <ReqButton  loading={loading} text={'Cadastrar'} loadingText={'Cadastrando'} />
                </Form>
            </Content>
        </Container>
    )
}

export default NewAsset;