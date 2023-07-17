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

const saveConversationModel = async(userId,conversationFile) => {
  try {
    const query = "INSERT INTO conversations (user_id, conversation_file) VALUES (?, ?)";
    const [saveConversation] =  await connection.execute(query, [userId, conversationFile])
    return saveConversation
  } catch (error) {
    throw error
  }
}

module.exports = {
  getUserModel,
  saveConversationModel
};
