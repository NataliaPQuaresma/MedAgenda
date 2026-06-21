import React, { useState, useEffect } from 'react';
import { buscar } from '../../services/StorageService';
import { listar, excluir } from '../../services/ConsultaService';
import { useHistory } from 'react-router';

const Consultas: React.FC = () => {
    const [consultas, setConsultas] = useState([]);

    useEffect(() => {
        carregarConsultas();
    }, []);

    const carregarConsultas = () => {
        const usuarioLogado = buscar('usuarioLogado');
        const todas = listar();
        const minhas = todas.filter((c: any) => c.pacienteId === usuarioLogado.email);
        setConsultas(minhas);
    };

    const cancelar = (id: number) => {
        excluir(id);
        carregarConsultas();
    };

    const history = useHistory();

    return (
        <div>
            <h1>Minhas Consultas</h1>
            {consultas.map((consulta: any, index) => (
                <div key={index}>
                    <p>Médico: {consulta.medico}</p>
                    <p>Horário: {consulta.horario}</p>
                    <p>Status: {consulta.status}</p>
                    <button onClick={() => history.push(`/editar/${consulta.id}`)}>Editar</button>
                    <button onClick={() => cancelar(consulta.id)}>Cancelar</button>
                </div>
            ))}
            
        </div>
    );
};

export default Consultas;