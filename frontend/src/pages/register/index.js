import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg'



const Register = () => {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ city, setCity ] = useState('');
    const [ uf, setUf ] = useState('');

    const history = useHistory();

    const handleRegister = async e => {
        e.preventDefault();

        const data = { name, email, password, whatsapp, city, uf }

        try {
            await api.post('ong', data);

            alert('Cadastro efetuado com sucesso.');

            history.push('/')

        } catch (err) {

            alert('Erro no cadastro, verifique os dados e tente novamente.')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Home
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" value={name} 
                        onChange={ e => setName( e.target.value )} />
                    <input type="email" placeholder="E-mail" value={email} 
                        onChange={ e => setEmail( e.target.value ) } />
                    <input type="password" placeholder="Senha" value={password} 
                        onChange={ e => setPassword( e.target.value ) } />
                    <input placeholder="Whatsapp(DDD+Numero)" value={whatsapp} 
                        onChange={ e => setWhatsapp( e.target.value ) } />
                    <div className="input-group">
                        <input placeholder="Cidade" value={city} 
                            onChange={ e => setCity( e.target.value ) } />
                        <input placeholder="UF" style={{ width: 80 }} value={uf} 
                            onChange={ e => setUf( e.target.value ) } />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Register;