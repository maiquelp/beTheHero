import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { Container, Content, Section, H1, P, ArrowLeftButton } from '../../components/Container'; // component styled-components   
import ReqButton from '../../components/ReqButton';
import { Form, Personal, Input } from './styles.js'; // page styled-components
import logoImg from '../../assets/logo.svg'

const Register = () => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleRegister = async e => {
        e.preventDefault();

        setLoading(true);
    
        const data = { name, email, password }
        
        try {
            await api.post('user', data);

            alert('Cadastro efetuado com sucesso. Verifique o seu email para confirmação');

            history.push('/')

        } catch (err) {

            alert('Erro no cadastro, verifique os dados e tente novamente.');
            setLoading(false);
        }
    }

    return (
        <Container>
            <Content>
                <Section>
                    <img src={logoImg} alt="logo"/>
                    <H1>Cadastro</H1>
                    <P>Faça seu cadastro, entre na plataforma e verifique a alocação dos seus ativos.</P>
                    <Link className="back-link" to="/">
                        <ArrowLeftButton size={16} color="#E02041" />
                        Home
                    </Link>
                </Section>
                <Form onSubmit={handleRegister}>
                    <Personal>
                        <Input placeholder="Nome" value={name} 
                            onChange={ e => setName( e.target.value )} required autoFocus />
                        <Input type="email" placeholder="E-mail" value={email} 
                            onChange={ e => setEmail( e.target.value ) } required />
                        <Input type="password" placeholder="Senha" value={password} 
                            onChange={ e => setPassword( e.target.value ) } required />
                    </Personal>
                    <ReqButton  loading={loading} text={'Cadastrar'} loadingText={'Cadastrando'} />
                </Form>
            </Content>
        </Container>
    )
}

export default Register;