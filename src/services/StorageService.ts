export const salvar = (chave: string, dados: any) => {
  localStorage.setItem(chave, JSON.stringify(dados));
};

export const buscar = (chave: string) => {
  const dados = localStorage.getItem(chave);
  return dados ? JSON.parse(dados) : null;
};