const connection = require("../db/connection");

const getUserModel = async (username) => {
  try {
    const query = "SELECT * FROM users WHERE username = ?";
    const [users] = await connection.execute(query, [username]);
    return users[0];
  } catch (error) {
    throw error;
  }
};

const saveConversationModel = async (userId, conversationData) => {
  try {
    const serializedConversation = JSON.stringify(conversationData);
    const query = "INSERT INTO conversations (user_id, conversation_file) VALUES (?, ?)";
    const [saveConversation] = await connection.execute(query, [userId, serializedConversation]);

    return saveConversation;
  } catch (error) {
    throw error;
  }
}

const getChatDataCSVModel = async(userId)=>{
  try {
    const query = 'SELECT conversation_file FROM conversations WHERE user_id = ?';
    const [rows] = await connection.execute(query, [userId]);
    if (rows.length === 0) {
      return null;
    }
    const csvData = rows[0].conversation_file;

    return csvData;
  } catch (error) {
    throw error;
  }
}

const getAllChatDataCSVModel = async()=>{
  try {
    const query = 'SELECT * FROM conversations';
    const [rows] = await connection.execute(query);
    if (rows.length === 0) {
      return null;
    }
    const chatAllData = rows.map(row => {
      const conversationFileBuffer = row.conversation_file;
      const conversationFileString = conversationFileBuffer.toString('utf8');
      return {
        id: row.id,
        user_id: row.user_id,
        conversation_file: conversationFileString,
        created_at: row.created_at
      };
    });
    return chatAllData;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getUserModel,
  saveConversationModel,
  getChatDataCSVModel,
  getAllChatDataCSVModel,
};
