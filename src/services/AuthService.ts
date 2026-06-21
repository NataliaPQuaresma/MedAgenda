import { salvar, buscar } from './StorageService';

interface Usuario {
    email: string;
    senha: string;
    nome: string;
    tipo: string;
}
const login = (email: string, senha: string) => {
    const usuarios : Usuario[] = buscar('usuarios');
    const usuario = usuarios.find((u: Usuario) => u.email === email && u.senha === senha);

    if (usuario) {
        salvar('usuarioLogado', usuario);
        return usuario;
    } else {
        return null;
    }
};

const logout = () => {
    localStorage.removeItem('usuarioLogado');
};

export {  login, logout };