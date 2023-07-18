// import { createObjectCsvWriter } from 'csv-writer';

import csv from 'fast-csv';
import fs from 'fs';

export const saveChatToCSV = async (chatData) => {
  return new Promise((resolve, reject) => {
    const csvStream = csv.format({ headers: true });
    const writableStream = fs.createWriteStream('chat.csv');

    csvStream.pipe(writableStream);

    chatData.forEach((record) => {
      csvStream.write(record);
    });

    csvStream.end();

    writableStream.on('finish', () => {
      resolve('chat.csv');
    });

    writableStream.on('error', (error) => {
      reject(error);
    });
  });
};


/* 
export const saveChatToCSV = async (chatData) => {
  const csvWriter = createObjectCsvWriter({
    path: 'chat.csv',
    header: [
      { id: 'user', title: 'User' },
      { id: 'message', title: 'Message' }
    ],
    append: true,
  });

  try {
    await csvWriter.writeRecords(chatData);
    console.log('Conversa salva em chat.csv');
    console.log(csvWriter);
    return 'chat.csv'; // Retorna o caminho do arquivo CSV após a gravação
  } catch (error) {
    console.error('Erro ao salvar conversa:', error);
    throw error;
  }
}; */


/* export const saveChatToCSV = (chatData)=> {

    const csvWriter = createObjectCsvWriter({
        path: 'chat.csv',
        header: [
            {id: 'user', title: 'User'},
            {id: 'message', title: 'Message'}
        ],
        append:true,
    });

    console.log(chatData);
    csvWriter
    .writeRecords(chatData)
    .then(() => console.log('Conversa salva em chat.csv'))
    .catch((error) => console.error('Erro ao salvar conversa:', error));
} */




