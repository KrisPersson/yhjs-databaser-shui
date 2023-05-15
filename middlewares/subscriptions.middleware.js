const Joi = require('joi');


const checkPostSubscriptionSchema = Joi.object({
    user_ID: Joi.number().required(),
    channel_ID: Joi.number().required()
})

async function checkPostSubscription(request, response, next) {
    const { body } = request
    const validation = checkPostSubscriptionSchema.validate(body)

    if (!validation.error) {
        next()
    } else {
        const { error } = validation
        response.status(400).json({ success: false, message: 'Wrong body input', error })
    }
}

module.exports = { checkPostSubscription }
