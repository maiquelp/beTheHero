import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import { Container, Header, Span, Img, StyledLink, Button, H1, Ul, Li, LiButton, Strong, P } from './styles.js';

const Profile = () => {
    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const token = localStorage.getItem('token');

    const history = useHistory();

    useEffect( () => {
        api.get('profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then( res => {
            setIncidents(res.data)
        })
    }, [token]);

    const handleDeleteIncident = async id => {
        try {
            await api.delete(`incident/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setIncidents(incidents.filter( incident => incident.id !== id))

        } catch (err) {
            alert('Erro ao deletar, tente noamente')
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        history.push('/')
    }

    return (
        <Container>
            <Header>
                <Img src={logoImg} alt="logo" />
                <Span>Olá, {ongName}</Span>
                <StyledLink className="button" to="/incidents/new">Cadastrar novo caso</StyledLink>
                <Button onClick={handleLogout} >
                    <FiPower size={18} color="#e02041" />
                </Button>
            </Header>

            <H1>Casos cadastrados</H1>
            <Ul>
                {incidents.map( incident => (
                    <Li key={incident.id}>
                        <Strong>Caso:</Strong>
                        <P>{incident.title}</P>
                        <Strong>Desc.</Strong>
                        <P>{incident.description}</P>
                        <Strong>Valor:</Strong>
                        <P>{Intl.NumberFormat('pt-BR', { 
                            style: 'currency', currency: 'BRL'}).format(incident.value)}</P>
                        <LiButton type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </LiButton>
                    </Li>    
                ))}
            </Ul>
        </Container>
    )
}

export default Profile;