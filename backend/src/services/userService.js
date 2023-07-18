const userModel = require('../models/userModel')

const getUserService = async(username) =>{
    try {
        const user = await userModel.getUserModel(username)
        return user;
    } catch (error) {
        throw error
    }
};

const saveConversationService = async (userId, conversationData) => {
    try {
      const saveConversation = await userModel.saveConversationModel(userId, conversationData);
      return saveConversation;
    } catch (error) {
      throw error;
    }
  }
  

module.exports = {
    getUserService,
    saveConversationService,
  };