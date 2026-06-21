import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { buscar } from '../../services/StorageService';
import { criar } from '../../services/ConsultaService';
import './agendamento.css';

const Agendamento: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [medico, setMedico] = useState<any>(null);
    const [horarioSelecionado, setHorarioSelecionado] = useState('');
    const history = useHistory();

    useEffect(() => {
        const medicos = buscar('medicos');
        const medicoEncontrado = medicos.find((m: any) => String(m.id) === id);
        setMedico(medicoEncontrado);
    }, [id]);

    const confirmarAgendamento = () => {
        const usuarioLogado = buscar('usuarioLogado');
        const novaConsulta = {
            id: Date.now(),
            pacienteId: usuarioLogado.email,
            medicoId: medico.id,
            medico: medico.nome,
            horario: horarioSelecionado,
            status: 'agendada'
        };
        criar(novaConsulta);
        alert('Consulta agendada com sucesso!');
        history.push('/consultas');
    };

    return (
        <div className='agendamento-container'>
            <h1>Agendamento</h1>
            {medico && (
                <div className='agendamento-info'>
                    <p>Médico: {medico.nome}</p>
                    <p>Especialidade: {medico.especialidade}</p>
                    <h2>Horários disponíveis:</h2>
                    <div className='horarios'>
                        {medico.horarios.map((horario: string, index: number) => (
                            <button key={index} onClick={() => setHorarioSelecionado(horario)}>
                                {horario}
                            </button>
                        ))}
                    </div>
                    {horarioSelecionado && (
                        <div className='confirmar'>
                            <p>Horário selecionado: {horarioSelecionado}</p>
                            <button onClick={confirmarAgendamento}>Confirmar</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Agendamento;