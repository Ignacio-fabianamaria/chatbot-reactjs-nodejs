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

module.exports = {
  getUserModel,
  saveConversationModel,
  getChatDataCSVModel,
};
