const salvar = (chave: string, dados: unknown) => {
    localStorage.setItem(chave, JSON.stringify(dados));  // recebe um nome e os dados e salva no localstorage
};                                                       // JSON.stringfy transforma os dados em texto pq o localstorage so aceita texto

const buscar = (chave: string) => {
    const dados = localStorage.getItem(chave); // recebe o nome e retorna os dados. O JSON.parse transforma o texto de volta em dados.
    return dados ? JSON.parse(dados) : [];     // se nao encontrar nada, retorna uma lista vazia
};

export { salvar, buscar }; // deixa essas funções disponiveis p outros arquivos usarem
