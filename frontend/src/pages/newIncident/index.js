import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg'

import api from '../../services/api';

const NewIncident = () => {

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState('');

    const token = localStorage.getItem('token');

    const history = useHistory();

    const handleNewIncident = async (e) => {
        e.preventDefault();

        const data = { title, description, value }

        try {
            await api.post('incident', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            history.push('/profile')

        } catch (error) {
            alert('Erro ao cadastrar, tente novamente')
        }
    }

    return (
        <div className="newIncident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="logo"/>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói disposto a ajudar.{value}</p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para Cadastro
                </Link>
            </section>
            <form onSubmit={handleNewIncident}> 
                <input value={title} onChange={ e => setTitle(e.target.value)} placeholder="Título do caso" required />
                <textarea value={description} onChange={ e => setDescription(e.target.value)} placeholder="Descrição" 
                    required />
                <input value={value} type="number" min="0.01" step="0.01" onChange={ e => setValue(e.target.value)} 
                    placeholder="Valor" required />
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
        </div>
    )
}

export default NewIncident;