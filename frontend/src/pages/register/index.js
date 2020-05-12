import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import apiIbge from '../../services/apiIbge';

import './styles.css';
import logoImg from '../../assets/logo.svg'

const Register = () => {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ city, setCity ] = useState('');
    const [ cityList, setCityList ] = useState([]);
    const [ uf, setUf ] = useState('');
    const [ ufList, setUfList ] = useState([]);

    const history = useHistory();

    const handleRegister = async e => {
        e.preventDefault();

        const data = { name, email, password, whatsapp, city, uf }

        data.whatsapp =  whatsapp.match(/\d+/g).join('');//retira a máscara

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

    // function verifyWhatsappFormat(e) {
    //     // eslint-disable-next-line
    //     const exp = /\(\d{2}\)\ \d{5}\ - \d{4}/;
    //     if(!exp.test(e)){
    //         alert('Numero do Whatsapp invalido!')
    //     }
    // }
  
    const getCityList = async (uf) => {     
        setUf(uf);
        const res = await apiIbge.get(`${uf}/municipios`);
        setCityList(res.data);   
    }

    useEffect(() => {
        const getUfList = async () => {
            const res = await apiIbge.get();
            const sortedRes = res.data.sort((a, b) => {
                var textA = a.sigla;
                var textB = b.sigla;
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            setUfList(sortedRes);
        }
        getUfList();
    }, [])
    

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
                            onChange={ e => setName( e.target.value )} required />
                        <input type="email" placeholder="E-mail" value={email} 
                            onChange={ e => setEmail( e.target.value ) } required />
                        <input type="password" placeholder="Senha" value={password} 
                            onChange={ e => setPassword( e.target.value ) } required />
                        <input placeholder="Whatsapp(DDD+Numero)" value={whatsapp} 
                            onChange={ e => applyWhatsappMask( e.target.value )}
                            // onBlur={ e => verifyWhatsappFormat( e.target.value )}
                            maxLength="17" required  />
                    </div>
                    <div className="input-group-address">
                        <select style={{ width: 100 }} value={uf} maxLength="2"
                            onChange={ e => getCityList( e.target.value ) } required >
                            <option value="" disabled hidden>UF</option>
                            {ufList.map(e => (<option key={e.id} value={e.sigla}>{e.sigla}</option>))}
                        </select>    
                        <select style={{ width: 300 }} value={city} 
                            onChange={ e => setCity( e.target.value ) } required >
                            <option value="" disabled hidden>Cidade</option>
                            {cityList.map(e => (<option key={e.id} value={e.nome}>{e.nome}</option>))}
                        </select>    
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Register;