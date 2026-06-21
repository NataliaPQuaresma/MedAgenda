import React from 'react';
import { useHistory } from 'react-router-dom';
import './Dashboard.css';
const Dashboard: React.FC = () => {
    const history = useHistory();
    return (
        <div className='dashboard-container'>
            <h1>Bem-Vindo ao MedAgenda</h1>
            <div className='dashboard-cards'>
                <div className='card'>
                    <button onClick={() => history.push('/medicos')}>Agendar Consulta</button>
                </div>
                <div className='card'>
                    <button onClick={() => history.push('/consultas')}>Minhas Consultas</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
