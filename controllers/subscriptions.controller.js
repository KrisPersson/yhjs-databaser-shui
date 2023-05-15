const { postSubscription, deleteSubscription } = require('../model')

async function postSubscriptionCtrl(request, response) {

    try {
        const { user_ID, channel_ID } = request.body
        await postSubscription(user_ID, channel_ID)
        response.json({ success: true, message: `User with ID ${user_ID} successfully subscribed to channel with ID ${channel_ID}` })
    } catch (error) {
        response.json({ success: false, error: error.message })
    }
}

async function deleteSubscriptionCtrl(request, response) {

    try {
        const { user_ID, channel_ID } = request.body
        await deleteSubscription(user_ID, channel_ID)
        response.json({ success: true, message: `User with ID ${user_ID} successfully unsubscribed to channel with ID ${channel_ID}` })
    } catch (error) {
        response.json({ success: false, error: error.message })
    }
}


module.exports = { postSubscriptionCtrl, deleteSubscriptionCtrl }
