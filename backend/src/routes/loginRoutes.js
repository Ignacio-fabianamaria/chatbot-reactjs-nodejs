const express = require('express')
const userController = require('../controllers/userController');
const errorHandler = require('../middlewares/errorHandler');


const router = express.Router()


router.post('/', errorHandler,  userController.getUserController)


module.exports = router