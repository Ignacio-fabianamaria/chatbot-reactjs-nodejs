import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

export const requestLogin = async (endpoint, body) => {
  try {
    const { data } = await api.post(endpoint, body);
    return data;
  } catch (error) {
    throw new Error('Failed to login'); // ou personalize a mensagem de erro conforme necessário
  }
};
