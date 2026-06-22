import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonToast,
  IonSelect, IonSelectOption, IonBackButton, IonButtons
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { cadastrarMedico } from '../../services/MedicoService';

const CadastroMedico: React.FC = () => {
  const history = useHistory();
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [crm, setCrm] = useState('');
  const [horarios, setHorarios] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [erro, setErro] = useState('');

  const handleCadastro = () => {
    if (!nome || !especialidade || !crm || !horarios) {
      setErro('Preencha todos os campos!');
      setShowToast(true);
      return;
    }

    cadastrarMedico({
      nome,
      especialidade,
      crm,
      horarios: horarios.split(',').map(h => h.trim())
    });

    setErro('');
    setShowToast(true);
    setTimeout(() => history.push('/agenda-medico'), 1500);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Cadastro do Médico</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Nome completo</IonLabel>
          <IonInput value={nome} onIonChange={e => setNome(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Especialidade</IonLabel>
          <IonSelect value={especialidade} onIonChange={e => setEspecialidade(e.detail.value)}>
            <IonSelectOption value="Cardiologia">Cardiologia</IonSelectOption>
            <IonSelectOption value="Dermatologia">Dermatologia</IonSelectOption>
            <IonSelectOption value="Ortopedia">Ortopedia</IonSelectOption>
            <IonSelectOption value="Pediatria">Pediatria</IonSelectOption>
            <IonSelectOption value="Clínico Geral">Clínico Geral</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">CRM</IonLabel>
          <IonInput value={crm} onIonChange={e => setCrm(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Horários disponíveis (separados por vírgula)</IonLabel>
          <IonInput
            value={horarios}
            placeholder="Ex: 08:00, 09:00, 10:00"
            onIonChange={e => setHorarios(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" className="ion-margin-top" onClick={handleCadastro}>
          Salvar Cadastro
        </IonButton>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={erro || 'Médico cadastrado com sucesso!'}
          duration={1500}
          color={erro ? 'danger' : 'success'}
        />
      </IonContent>
    </IonPage>
  );
};

export default CadastroMedico;