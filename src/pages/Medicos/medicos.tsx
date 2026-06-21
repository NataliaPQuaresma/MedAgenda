import React, { useState, useEffect } from 'react';
import { listar } from '../../services/MedicoService';
import { useHistory } from 'react-router';

const Medicos: React.FC = () => {
    const [medicos, setMedicos] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const lista = listar();
        setMedicos(lista);
    }, []);

    return (
        <div>
            <h1>Médicos</h1>
            {medicos.map((medico: any, index) => (
                <div key={index}>
                    <p>{medico.nome}</p>
                    <p>{medico.especialidade}</p>
                    <button onClick={() => history.push(`/agendamento/${medico.id}`)}>Agendar</button>
                </div>
            ))}
        </div>
    );
};

export default Medicos;
