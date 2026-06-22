import React, { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonButton, IonBadge, IonToast, IonButtons, IonBackButton,
  IonLabel, IonItem
} from '@ionic/react';
import { buscar, salvar } from '../../services/StorageService';

interface Consulta {
  id: string;
  pacienteId: string;
  medicoId: string;
  nomePaciente: string;
  data: string;
  horario: string;
  status: 'pendente' | 'confirmada' | 'cancelada';
}

const AgendaMedico: React.FC = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [mensagemToast, setMensagemToast] = useState('');

  useEffect(() => {
    carregarConsultas();
  }, []);

  const carregarConsultas = () => {
    const usuario = buscar('usuarioLogado');
    const todasConsultas: Consulta[] = buscar('consultas') || [];
    const minhasConsultas = todasConsultas.filter(c => c.medicoId === usuario?.id);
    setConsultas(minhasConsultas);
  };

  const atualizarStatus = (id: string, novoStatus: 'confirmada' | 'cancelada') => {
    const todasConsultas: Consulta[] = buscar('consultas') || [];
    const atualizadas = todasConsultas.map(c =>
      c.id === id ? { ...c, status: novoStatus } : c
    );
    salvar('consultas', atualizadas);
    carregarConsultas();

    setMensagemToast(novoStatus === 'confirmada' ? 'Consulta confirmada!' : 'Consulta cancelada!');
    setShowToast(true);
  };

  const getCorStatus = (status: string) => {
    if (status === 'confirmada') return 'success';
    if (status === 'cancelada') return 'danger';
    return 'warning';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Minha Agenda</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {consultas.length === 0 ? (
          <IonItem>
            <IonLabel>Nenhuma consulta agendada ainda.</IonLabel>
          </IonItem>
        ) : (
          consultas.map(consulta => (
            <IonCard key={consulta.id}>
              <IonCardHeader>
                <IonCardTitle>{consulta.nomePaciente}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p> Data: {consulta.data}</p>
                <p> Horário: {consulta.horario}</p>
                <p>
                  Status: <IonBadge color={getCorStatus(consulta.status)}>
                    {consulta.status}
                  </IonBadge>
                </p>

                {consulta.status === 'pendente' && (
                  <>
                    <IonButton
                      color="success"
                      size="small"
                      onClick={() => atualizarStatus(consulta.id, 'confirmada')}
                    >
                      Confirmar
                    </IonButton>
                    <IonButton
                      color="danger"
                      size="small"
                      onClick={() => atualizarStatus(consulta.id, 'cancelada')}
                    >
                      Cancelar
                    </IonButton>
                  </>
                )}
              </IonCardContent>
            </IonCard>
          ))
        )}

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={mensagemToast}
          duration={1500}
          color={mensagemToast.includes('confirmada') ? 'success' : 'danger'}
        />
      </IonContent>
    </IonPage>
  );
};

export default AgendaMedico;