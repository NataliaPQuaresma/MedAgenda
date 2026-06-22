import React from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonButton, IonIcon, IonGrid, IonRow, IonCol
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { calendarOutline, personAddOutline, timeOutline, medkitOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>MedAgenda</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Bem-vindo, Médico!</h2>
        <p>O que deseja fazer hoje?</p>

        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonCard button onClick={() => history.push('/cadastro-medico')}>
                <IonCardHeader>
                  <IonIcon icon={personAddOutline} size="large" color="primary" />
                  <IonCardTitle>Meu Cadastro</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Cadastre ou edite suas informações e horários disponíveis.
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12">
              <IonCard button onClick={() => history.push('/agenda-medico')}>
                <IonCardHeader>
                  <IonIcon icon={calendarOutline} size="large" color="primary" />
                  <IonCardTitle>Minha Agenda</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Visualize suas consultas agendadas e confirme atendimentos.
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12">
              <IonCard button onClick={() => history.push('/agenda-medico')}>
                <IonCardHeader>
                  <IonIcon icon={timeOutline} size="large" color="primary" />
                  <IonCardTitle>Horários Disponíveis</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Gerencie seus horários de atendimento.
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12">
              <IonCard button>
                <IonCardHeader>
                  <IonIcon icon={medkitOutline} size="large" color="primary" />
                  <IonCardTitle>Especialidade</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Sua especialidade médica cadastrada.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;