import axios from 'axios';

//URl padrão
const BASE_URL = 'http://127.0.0.1:8080';

// Requisição padrão
export const requisicao = ({ method = 'GET', url, data, params, headers }) => {
    return axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        params,
        headers
    });
}