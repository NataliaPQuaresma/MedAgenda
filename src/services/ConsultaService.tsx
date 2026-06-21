import { buscar, salvar } from './StorageService';

const listar = () => {
    return buscar('consultas');
};

const criar = (consulta: unknown) => {
    const consultas = buscar('consultas');
    consultas.push(consulta);
    salvar('consultas', consultas);
};
const excluir = (id:number) => {
    const consultas = buscar('consultas');
    const novaLista = consultas.filter((c: any) => c.id !== id);
    salvar('consultas', novaLista);
};

const editar = (id: number, dadosNovos: any) => {
    const consultas = buscar('consultas');
    const novaLista = consultas.map((c: any) => c.id === id ? { ...c, ...dadosNovos } : c);
    salvar('consultas', novaLista);
};

export { listar, criar, excluir, editar };