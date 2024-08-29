import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const postUser = async (nome, email, cpf, dataNascimento, diasOfensiva) => {
    return await api.post("/clientes", {
        nome: nome,
        email: email,
        cpf: cpf,
        dataNascimento: dataNascimento,
        congelado: false,
        diasDeOfensiva: diasOfensiva,
    });
}

export const getUsers = async () => {
    return await api.get("/clientes");
}

export const deleteUser = async (id) => {
    return await api.delete(`/clientes/${id}`);
}

export const editUser = async (id, nome, email, cpf, dataNascimento, diasOfensiva, congelado) => {
    return await api.put(`/clientes/${id}`, {
        nome: nome,
        email: email,
        cpf: cpf,
        dataNascimento: dataNascimento,
        diasDeOfensiva: diasOfensiva,
        congelado: congelado,
    });
}

export const buscarCliente = async (nome = '', cpf = '') => {

    console.log(nome, cpf);
    return await api.get('/clientes/buscar', {
        params: {
            nome,
            cpf,
        },
    });
}

export const freezeUser = async (id) => {
    return await api.patch(`/clientes/${id}/congelado?congelado=true`);
}

export const unfreezeUser = async (id) => {
    return await api.patch(`/clientes/${id}/congelado?congelado=false`);
}

export const resetUser = async (id) => {
    return await api.patch(`/clientes/${id}/diasDeOfensiva/zerar`);
}

export const addDay = async (id) => {
    return await api.patch(`/clientes/${id}/diasDeOfensiva/aumentar`);
}

export default api;