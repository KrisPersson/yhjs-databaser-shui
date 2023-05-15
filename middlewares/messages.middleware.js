const Joi = require('joi');

const checkNewMessageSchema = Joi.object({
    user_ID: Joi.number().required(),
    channel_ID: Joi.number().required(),
    text: Joi.string().min(1).max(100)
})

const checkGetChannelMessagesSchema = Joi.object({
    channel_ID: Joi.number().required()
})

const checkDeleteMessageSchema = Joi.object({
    ID: Joi.number().required()
})

async function checkNewMessage(request, response, next) {
    const { body } = request
    const validation = checkNewMessageSchema.validate(body)
    if (!validation.error) {
        next()
    } else {
        const { error } = validation
        response.status(400).json({ success: false, message: 'Wrong body input', error })
    }
}

async function checkGetChannelMessages(request, response, next) {
    const input = { channel_ID: request.headers.channel_id }
    const validation = checkGetChannelMessagesSchema.validate(input)
    if (!validation.error) {
        next()
    } else {
        const { error } = validation
        response.status(400).json({ success: false, message: 'Wrong headers input', error })
    }
}

async function checkDeleteMessage(request, response, next) {
    const { body } = request
    const validation = checkDeleteMessageSchema.validate(body)
    if (!validation.error) {
        next()
    } else {
        const { error } = validation
        response.status(400).json({ success: false, message: 'Wrong body input', error })
    }
}

module.exports = { checkNewMessage, checkGetChannelMessages, checkDeleteMessage }
