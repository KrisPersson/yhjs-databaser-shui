
const { postNewMessage, getMessages, deleteMessage, postMessChan, getMesschanByChannel, getMessagesByUser } = require('../models/messages.model')

async function postNewMessageCtrl(request, response) {
    try {
        const { user_ID, channels, text } = request.body
        const message_ID = await postNewMessage(user_ID, channels, text)
        await postMessChan(message_ID, channels)
        
        response.json({ success: true, message: 'New message posted successfully!' })
    } catch (error) {
        response.json({ success: false, error: error.message })
    }
}

async function getChannelMessagesCtrl(request, response) {
    try {
        const channel_ID = request.headers.channel_id
        const messageIDsFromMesschan = await getMesschanByChannel(channel_ID)
        const messagesFromDb = await getMessages(messageIDsFromMesschan)
        const messages = request.query.sort === 'oldest' ?
            messagesFromDb.sort((a, b) => a.date - b.date) :
            request.query.sort === 'newest' ?
            messagesFromDb.sort((a, b) => b.date - a.date) :
            [...messagesFromDb]
        
        response.json({ success: true, messages })
    } catch (error) {
        response.json({ success: false, error: error.message })
    }
}

async function getUserMessagesCtrl(request, response) {
    try {
        const user_ID = request.headers.user_id
        const messagesFromDb = await getMessagesByUser(user_ID)
        const messages = request.query.sort === 'oldest' ?
            messagesFromDb.sort((a, b) => a.date - b.date) :
            request.query.sort === 'newest' ?
            messagesFromDb.sort((a, b) => b.date - a.date) :
            [...messagesFromDb]
        
        response.json({ success: true, messages })
    } catch (error) {
        response.json({ success: false, error: error.message })
    }
}

async function deleteMessageCtrl(request, response) {
    try {
        const { ID } = request.body
        const result = await deleteMessage(ID)
        response.json({ success: true, message: result })
    } catch (error) {
        response.json({ success: false, error: error.message })
    }
}



module.exports = { postNewMessageCtrl, getChannelMessagesCtrl, deleteMessageCtrl, getUserMessagesCtrl }
