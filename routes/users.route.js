const { Router } = require('express')
const { addNewUser, loginUser, getUsers } = require('../controllers/users.controller.js')
const router = Router()

router.get('/', getUsers)
router.post('/', addNewUser)
router.post('/login', loginUser)

module.exports = {usersRouter: router}
