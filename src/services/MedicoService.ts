import { salvar, buscar } from './StorageService';

export interface Medico {
  id: string;
  nome: string;
  especialidade: string;
  crm: string;
  horarios: string[];
}

export const listarMedicos = (): Medico[] => {
  return buscar('medicos') || [];
};

export const cadastrarMedico = (medico: Omit<Medico, 'id'>) => {
  const medicos = listarMedicos();
  const novoMedico = { ...medico, id: Date.now().toString() };
  medicos.push(novoMedico);
  salvar('medicos', medicos);
  return novoMedico;
};

export const editarMedico = (id: string, dados: Partial<Medico>) => {
  const medicos = listarMedicos();
  const index = medicos.findIndex(m => m.id === id);
  if (index !== -1) {
    medicos[index] = { ...medicos[index], ...dados };
    salvar('medicos', medicos);
  }
};

export const excluirMedico = (id: string) => {
  const medicos = listarMedicos().filter(m => m.id !== id);
  salvar('medicos', medicos);
};