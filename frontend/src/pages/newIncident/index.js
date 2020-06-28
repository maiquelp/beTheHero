import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Container, Content, Section, H1, P, ArrowLeftButton } from '../../components/Container'; // component styled-components   
import ReqButton from '../../components/ReqButton';
import { Form, Input, TextArea } from './styles.js'; // page styled-components
import logoImg from '../../assets/logo.svg'

import api from '../../services/api';

const NewIncident = () => {

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState('');
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');

    const history = useHistory();

    const handleNewIncident = async (e) => {
        e.preventDefault();

        setLoading(true);

        const data = { title, description, value }

        try {
            await api.post('incident', data, {
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
                    <H1>Cadastrar novo caso</H1>
                    <P>Descreva o caso detalhadamente para encontrar um herói disposto a ajudar.</P>
                    <Link className="back-link" to="/profile">
                        <ArrowLeftButton />
                        Voltar para Cadastro
                    </Link>
                </Section>
                <Form onSubmit={handleNewIncident}> 
                    <Input value={title} onChange={ e => setTitle(e.target.value)} placeholder="Título do caso" required />
                    <TextArea value={description} onChange={ e => setDescription(e.target.value)} placeholder="Descrição" 
                        required />
                    <Input value={value} type="number" min="0.01" step="0.01" onChange={ e => setValue(e.target.value)} 
                        placeholder="Valor" required />
                    <ReqButton  loading={loading} text={'Cadastrar'} loadingText={'Cadastrando'} />
                </Form>
            </Content>
        </Container>
    )
}

export default NewIncident;