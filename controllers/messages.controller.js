const { postNewMessage, getMessages, deleteMessage } = require('../model')

async function postNewMessageCtrl(request, response) {
    try {
        const { user_ID, channel_ID, text } = request.body
        await postNewMessage(user_ID, channel_ID, text)
        response.json({ success: true, message: 'New message posted successfully!' })
    } catch (error) {
        response.json({ success: false, error: error.message })
    }
}

async function getChannelMessagesCtrl(request, response) {
    try {
        const channel_ID = request.headers.channel_id
        const messages = await getMessages(channel_ID)
        response.json({ success: true, messages: messages.sort((a, b) => b.date - a.date) })
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



module.exports = { postNewMessageCtrl, getChannelMessagesCtrl, deleteMessageCtrl }
