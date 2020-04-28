import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';

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
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="logo" />
                <span>Olá, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button">
                    <FiPower size={18} color="#e02041" onClick={handleLogout} />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map( incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>
                        <strong>Desc.</strong>
                        <p>{incident.description}</p>
                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { 
                            style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>    
                ))}
            </ul>
        </div>
    )
}

export default Profile;