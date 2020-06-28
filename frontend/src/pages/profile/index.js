import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactDOM from 'react-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import { Container, Header, Span, Img, StyledLink, Button, H1, Ul, Li, Trash, Delete, Strong, P, 
            PowerButton, XButton, Trash2Button, Loading } from './styles.js'; //styled-components

const Profile = () => {
    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const token = localStorage.getItem('token');

    const history = useHistory();

    useEffect( () => {
        setTimeout(
        api.get('profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then( res => {
            setIncidents(res.data)
        })
        , 2000);
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

    const handleConfirmDelete = (id) => {
            ReactDOM.render(
                <Delete type="button" onClick={() => handleDeleteIncident(id)}>
                    <Trash2Button />
                </Delete>,
                document.getElementById(id)
          );
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
                    <PowerButton />
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
                        <Trash type="button" onClick={() => handleConfirmDelete(incident.id)}>
                            <XButton />
                        </Trash>
                        <div id={incident.id}></div>
                    </Li>    
                ))}
            </Ul>
        </Container>
    )
}

export default Profile;