import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import { Container, Header, Span, Img, StyledLink, Button, H1, Ul, Li, Trash, Delete, Strong, P, 
            PowerButton, XButton, Trash2Button, Loading } from './styles.js'; //styled-components

const Profile = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState([]);

    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');

    const history = useHistory();

    useEffect( () => {
        setLoading(true)
        api.get('profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then( res => {
            setAssets(res.data)
        });
        setLoading(false);
    }, [token]);

    const handleDeleteAsset = async id => {
        try {
            await api.delete(`asset/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAssets(assets.filter( asset => asset.id !== id))

        } catch (err) {
            alert('Erro ao deletar, tente novamente')
        }
    }

    const handleConfirmDelete = (id) => {
        setDeleting( deleting => {
            const newDel = [...deleting, id]; // coping the old array and adding the new element
            return newDel; 
        })       
    }

    const handleLogout = () => {
        localStorage.clear();
        history.push('/')
    }

    return (
        <Container>
            <Header>
                <Img src={logoImg} alt="logo" />
                <Span>Olá, {userName} !</Span>
                <StyledLink className="button" to="/assets/new">Cadastrar novo ativo</StyledLink>
                <Button onClick={handleLogout} >
                    <PowerButton />
                </Button>
            </Header>

            <H1>Ativos cadastrados</H1>
            {loading ? <Loading /> : null}
            <Ul>
                {assets.map( asset => (
                    <Li key={asset.id}>
                        <Strong>Ativo:</Strong>
                        <P>{asset.title}</P>
                        <Strong>Valor:</Strong>
                        <P>{Intl.NumberFormat('pt-BR', { 
                            style: 'currency', currency: 'BRL'}).format(asset.value)}
                        </P>
                        <Strong>Percentual:</Strong>
                        <P>{Intl.NumberFormat('pt-BR', { 
                            style: 'percent', maximumFractionDigits: 2 }).format(asset.percent)}
                        </P>
                        <Trash type="button" onClick={() => handleConfirmDelete(asset.id)}>
                            <XButton />
                        </Trash>
                        {deleting.includes(asset.id) ? 
                            <Delete type="button" onClick={() => handleDeleteAsset(asset.id)}>
                                <Trash2Button />
                            </Delete> : null
                        }
                        <div id={asset.id}></div>
                    </Li>    
                ))}
            </Ul>
        </Container>
    )
}

export default Profile;