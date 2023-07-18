const { generateToken } = require("../middlewares/authenticateToken");
const userService = require("../services/userService");
const bcrypt = require("bcrypt");

const getUserController = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await userService.getUserService(username);
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }

    const role = user.role;
    console.log("Role do usuário:", role);

    const token = generateToken({
      id: user.id,
      username: user.username,
      password: user.password,
      role: user.role,
    });

    res.status(200).json({ role, token: token });
  } catch (error) {
    next(error);
  }
};

let conversationId = null;

const saveConversationController = async (req, res, next) => {
  const { conversationData } = req.body;
  console.log("Valor de conversationData:", conversationData);

  try {
    const userId = req.user.id;

    const saveConversation = await userService.saveConversationService(
      userId,
      conversationData
    );
    conversationId = saveConversation.insertId;
    if (!saveConversation) {
      res.status(401).json({ error: "Conversation not found" });
      return;
    }
    console.log("Resposta:", saveConversation);
    res.status(201).json({ message: "Conversation saved successfully" });
  } catch (error) {
    next(error);
  }
};

const getChatDataCSVController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!conversationId) {
      return null;
    }

    const csvData = await userService.getChatDataCSVService(
      userId,
      conversationId
    );
    if (!csvData) {
      res.status(404).json({ error: "CSV not found" });
      return;
    }
    res.attachment("conversation.csv");
    res.send(csvData);
  } catch (error) {
    next(error);
  }
}
  const getAllChatDataController = async(req, res, next)=>{
    try {
      const chatAllData = await userService.getAllChatDataCSVService();
      if (!chatAllData) {
        res.status(404).json({ error: "CSV not found" });
        return;
      }
      res.attachment("conversations.csv");
      res.send(chatAllData);
    } catch (error) {
      next(error);
  }
};

module.exports = {
  getUserController,
  saveConversationController,
  getChatDataCSVController,
  getAllChatDataController,
};
