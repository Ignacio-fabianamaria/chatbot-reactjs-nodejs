const express = require('express')
const userController = require('../controllers/userController');
const errorHandler = require('../middlewares/errorHandler');
const {authenticateToken} = require('../middlewares/authenticateToken');


const router = express.Router()


router.post('/', authenticateToken, errorHandler,  userController.saveConversationController);
router.get('/csv', authenticateToken, errorHandler, userController.getChatDataCSVController);
router.get('/datacsv', errorHandler, userController.getAllChatDataController)


module.exports = router