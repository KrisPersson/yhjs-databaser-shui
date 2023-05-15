const { Router } = require('express')
const router = Router()
const { postNewMessageCtrl, getChannelMessagesCtrl, deleteMessageCtrl } = require('../controllers/messages.controller')
const { checkNewMessage, checkGetChannelMessages, checkDeleteMessage } = require('../middlewares/messages.middleware')


router.post('/', checkNewMessage, postNewMessageCtrl)
router.get('/', checkGetChannelMessages, getChannelMessagesCtrl)
router.delete('/', checkDeleteMessage, deleteMessageCtrl)




module.exports = {messagesRouter: router}
