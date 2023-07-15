const userService = require('../services/userService');
const bcrypt = require('bcrypt');

const getUserController = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await userService.getUserService(username); // Corrigido para "userService.getUserService(username)"
        // const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!user) {
            throw new Error('UserNotFoundError');
        }
       /*  if (!isPasswordMatch) {
            throw new Error('InvalidPasswordError');
        } */

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
   getUserController,
};
