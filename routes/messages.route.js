const { Router } = require('express')
const router = Router()
<<<<<<< Updated upstream
=======
const { postNewMessageCtrl, getChannelMessagesCtrl, deleteMessageCtrl, getUserMessagesCtrl } = require('../controllers/messages.controller')
const { checkNewMessage, checkGetChannelMessages, checkDeleteMessage, checkGetUserMessages } = require('../middlewares/messages.middleware')


router.post('/', checkNewMessage, postNewMessageCtrl)
router.get('/', checkGetChannelMessages, getChannelMessagesCtrl)
router.delete('/', checkDeleteMessage, deleteMessageCtrl)
router.get('/user', checkGetUserMessages, getUserMessagesCtrl)


>>>>>>> Stashed changes


module.exports = {messagesRouter: router}
