import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { buscar } from '../../services/StorageService';
import { listar, editar } from '../../services/ConsultaService';
import './editar.css';

const Editar: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [consulta, setConsulta] = useState<any>(null);
    const [medico, setMedico] = useState<any>(null);
    const [horarioSelecionado, setHorarioSelecionado] = useState('');
    const history = useHistory();

    useEffect(() => {
        const todas = listar();
        const consultaEncontrada = todas.find((c: any) => String(c.id) === id);
        setConsulta(consultaEncontrada);

        const medicos = buscar('medicos');
        const medicoEncontrado = medicos.find((m: any) => m.id === consultaEncontrada.medicoId);
        setMedico(medicoEncontrado);
    }, [id]);

    const salvarEdicao = () => {
        editar(Number(id), { horario: horarioSelecionado });
        alert('Consulta atualizada!');
        history.push('/consultas');
    };

    return (
        <div className='editar-container'>
            <h1>Editar Consulta</h1>
            {consulta && medico && (
                <div className='editar-info'>
                    <p>Médico: {consulta.medico}</p>
                    <h2>Escolha um novo horário:</h2>
                    <div className='horarios'>
                        {medico.horarios.map((horario: string, index: number) => (
                            <button key={index} onClick={() => setHorarioSelecionado(horario)}>
                                {horario}
                            </button>
                        ))}
                    </div>
                    {horarioSelecionado && (
                        <div className='salvar'>
                            <p>Novo horário: {horarioSelecionado}</p>
                            <button onClick={salvarEdicao}>Salvar</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Editar;