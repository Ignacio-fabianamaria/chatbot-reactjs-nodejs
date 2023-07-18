const express = require('express')
const userController = require('../controllers/userController');
const errorHandler = require('../middlewares/errorHandler');
const {authenticateToken} = require('../middlewares/authenticateToken');


const router = express.Router()


router.post('/', authenticateToken, errorHandler,  userController.saveConversationController)


module.exports = router