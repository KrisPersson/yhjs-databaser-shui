const { Router } = require('express')
const router = Router()

const { postSubscriptionCtrl, deleteSubscriptionCtrl } = require('../controllers/subscriptions.controller')
const { checkPostSubscription } = require('../middlewares/subscriptions.middleware')

router.post('/', checkPostSubscription, postSubscriptionCtrl)
router.delete('/', checkPostSubscription, deleteSubscriptionCtrl)


module.exports = {subscriptionsRouter: router}
