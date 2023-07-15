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

module.exports = {
  getUserModel,
};
