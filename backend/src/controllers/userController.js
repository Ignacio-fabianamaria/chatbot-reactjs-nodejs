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

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserController,
};
