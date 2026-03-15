const express = require('express')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() });

const authRouter = express.Router()

authRouter.post('/register', authController.registerUser)
authRouter.post('/login', authController.loginUser)
authRouter.put('/update', auth, upload.single('profileImage'), authController.updateUser)
authRouter.get('/me', auth, authController.getUserData)


module.exports = authRouter;