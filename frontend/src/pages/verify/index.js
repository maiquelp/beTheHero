import { useHistory } from 'react-router-dom';

import api from '../../services/api';

const Verify = () => {

    const history = useHistory();

    const params = (new URL(document.location)).searchParams;

    const verify = async () => {
        try {   
            await api.put('verify?' + params);

            alert('Usuário verificado');

            history.push('/')
        } catch (error) {
            alert('Erro ao verificar usuário. Tente novamente ou faça o logon');

            history.push('/')
        }
    }

    verify();

    return null
}

export default Verify;