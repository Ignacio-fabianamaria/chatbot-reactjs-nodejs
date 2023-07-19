import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

export const requestLogin = async (endpoint, body) => {
  try {
    const { data } = await api.post(endpoint, body);
    localStorage.setItem('token', data.token)
    return data;
  } catch (error) {
    throw Error('Failed to login'); 
  }
};


export const requestConversation = async (endpoint, conversationData) => {
  try {
    const token = localStorage.getItem('token');
    const formattedConversationData = conversationData === undefined ? null : conversationData;
    const { data } = await api.post(
      endpoint,
      {conversationData: formattedConversationData !== undefined ? formattedConversationData : null },
      { headers: { Authorization: token } } 
      );
    console.log('Resposta:', data);
    return data;
  } catch (error) {
    console.error('Failed to post conversation:', error);
    throw new Error('Erro ao processar a solicitação de conversação');

  }
};
export const requestChatCsv = async (endpoint)=>{
  try {
    const token = localStorage.getItem('token');
    const {data} = await api.get(endpoint, { headers: { Authorization: token } } );
    return data;
  } catch (error) {
    console.log('Status do erro:', error.response.status);
    throw new Error('Erro ao processar a solicitação de conversação')
  }
}

export const requestAllDataCSV = async (endpoint)=>{
  try {
    
    const {data} = await api.get(endpoint);
    return data;
  } catch (error) {
    console.log('Status do erro:', error.response.status);
    throw new Error('Erro ao processar a solicitação de conversação')
  }
}
