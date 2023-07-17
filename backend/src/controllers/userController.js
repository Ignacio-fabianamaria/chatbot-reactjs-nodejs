const { generateToken } = require("../middlewares/authenticateToken");
const userService = require("../services/userService");
const bcrypt = require('bcrypt');

const getUserController = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await userService.getUserService(username);
    if (!user) {
        res.status(401).json({ error: "User not found" });
        return;
      };
      const isPasswordMatch = await bcrypt.compare(password, user.password );
      if (!isPasswordMatch) {
        res.status(401).json({ error: "Incorrect password" });
        return;
      }

      const token = generateToken({
      id: user.id,
      username: user.username,
      password: user.password,
      });

    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
};

const saveConversationController = async(req, res, next) => {
  const {conversationFile } = req.body;
  try {
    const userId = req.user.id;
    
     const saveConversation = await userService.saveConversationService(userId, conversationFile);
     if (!saveConversation) {
      res.status(401).json({ error: "Conversation not found" });
      return;
    };
    res.status(201).json({message: "Conversation saved successfully" })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUserController,
  saveConversationController,
};
