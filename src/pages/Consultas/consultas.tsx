import React, { useState, useEffect } from 'react';
import { buscar } from '../../services/StorageService';
import { listar, excluir } from '../../services/ConsultaService';
import { useHistory } from 'react-router';
import './consultas.css';

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
        <div className='consultas-container'>
            <h1>Minhas Consultas</h1>
            {consultas.map((consulta: any, index) => (
                <div key={index} className='consulta-card'>
                    <p>Médico: {consulta.medico}</p>
                    <p>Horário: {consulta.horario}</p>
                    <p>Status: {consulta.status}</p>
                    <div className='consulta-acoes'>
                        <button className='btn-editar' onClick={() => history.push(`/editar/${consulta.id}`)}>Editar</button>
                        <button className='btn-cancelar' onClick={() => cancelar(consulta.id)}>Cancelar</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Consultas;