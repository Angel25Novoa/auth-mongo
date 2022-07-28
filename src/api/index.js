const express = require('express')
const router = express.Router()
const cors = require('cors')
const usersRouter = require('./users')
const registerRouter = require('./register')
const authRouter = require('./auth')
const authMiddleware = require('../middlewares/authorization')

router.use(cors())

router.use('/auth', authRouter)
router.use('/register', registerRouter)

router.use(authMiddleware)
router.use('/users', usersRouter)

module.exports = router
