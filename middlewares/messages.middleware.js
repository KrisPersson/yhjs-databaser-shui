const Joi = require('joi');

const checkNewMessageSchema = Joi.object({
    user_ID: Joi.number().required(),
    channels: Joi.array().required(),
    text: Joi.string().min(1).max(100).required()
})

const checkGetChannelMessagesSchema = Joi.object({
    channel_ID: Joi.number().required()
})

const checkGetUserMessagesSchema = Joi.object({
    user_ID: Joi.number().required()
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

async function checkGetUserMessages(request, response, next) {
    const input = { user_ID: request.headers.user_id }
    const validation = checkGetUserMessagesSchema.validate(input)
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

module.exports = { checkNewMessage, checkGetChannelMessages, checkGetUserMessages, checkDeleteMessage }
