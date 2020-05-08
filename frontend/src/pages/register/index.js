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

            alert('Cadastro efetuado com sucesso. Verifique o seu email para confirmação');

            history.push('/')

        } catch (err) {

            alert('Erro no cadastro, verifique os dados e tente novamente.')
        }
    }

    function applyWhatsappMask(e) {  
        if (e.length === 1 && e !== '(') return setWhatsapp( '(' + e );//adiciona o '(' e evita adicionar novamente caso já exista
        if (e.length === 3) return setWhatsapp( e + ') ' );
        if (e.length === 4) return setWhatsapp( e.substring(0,(e.length - 2)));//apaga o ') '
        if (e.length === 10) return setWhatsapp( e + ' - ' );
        if (e.length === 12) return setWhatsapp( e.substring(0,(e.length - 3)));//apaga o ' - '
       
        return setWhatsapp( e )
    }

    function verifyWhatsappFormat(e) {
        // eslint-disable-next-line
        const exp = /\(\d{2}\)\ \d{5}\ - \d{4}/;
        if(!exp.test(e)){
            alert('Numero do Whatsapp invalido!')
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
                    <div className="input-group-personal">
                        <input placeholder="Nome da ONG" value={name} 
                            onChange={ e => setName( e.target.value )} />
                        <input type="email" placeholder="E-mail" value={email} 
                            onChange={ e => setEmail( e.target.value ) } />
                        <input type="password" placeholder="Senha" value={password} 
                            onChange={ e => setPassword( e.target.value ) } />
                        <input placeholder="Whatsapp(DDD+Numero)" value={whatsapp} 
                            onChange={ e => applyWhatsappMask( e.target.value )}
                            onBlur={ e => verifyWhatsappFormat( e.target.value )}
                            maxLength="17" />
                    </div>
                    <div className="input-group-address">
                        <input placeholder="Cidade" value={city} 
                            onChange={ e => setCity( e.target.value ) } />
                        <select placeholder="UF" style={{ width: 100 }} value={uf} maxLength="2"
                            onChange={ e => setUf( e.target.value ) } required>
                            <option value="" disabled hidden>UF</option><option value="AC">AC</option>
                            <option value="AL">AL</option><option value="AP">AP</option>
                            <option value="AM">AM</option><option value="BA">BA</option>
                            <option value="CE">CE</option><option value="DF">DF</option>
                            <option value="ES">ES</option><option value="GO">GO</option>
                            <option value="MA">MA</option><option value="MT">MT</option>
                            <option value="MS">MS</option><option value="MG">MG</option>
                            <option value="PA">PA</option><option value="PB">PB</option>
                            <option value="PR">PR</option><option value="PE">PE</option>
                            <option value="PI">PI</option><option value="RJ">RJ</option>
                            <option value="RN">RN</option><option value="RS">RS</option>
                            <option value="RO">RO</option><option value="RR">RR</option>
                            <option value="SC">SC</option><option value="SP">SP</option>
                            <option value="SE">SE</option><option value="TO">TO</option>
                        </select>    
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Register;