import { buscar } from './StorageService';


const listar = () => {
    return buscar('medicos');
};
export { listar };