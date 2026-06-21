import React from 'react';
import { useHistory } from 'react-router-dom';

const Dashboard: React.FC = () => {
const history = useHistory();
    return (
        <div>
            <h1>Bem-Vinda, Nati</h1>
            <button onClick={() => history.push('/medicos')}>Agendar Consulta</button>
            <button onClick={() => history.push('/consultas')}>Minhas Consultas</button>
            
        </div>
    );
};

export default Dashboard;
