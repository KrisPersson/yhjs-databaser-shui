const { createDbConnection } = require('../db')

const db = createDbConnection()

async function postSubscription(user_ID, channel_ID) {

    const subscriptionAlreadyExists = await findSubscription(user_ID, channel_ID)
    if (subscriptionAlreadyExists) {
        throw new Error(`User is already subscribed to this channel`)
    }

    const sql = `INSERT INTO subscriptions(user_ID, channel_ID) VALUES (?, ?)`
    const arr = [user_ID, channel_ID]
    db.run(sql, arr, (err) => {
        if (err) {
            throw new Error(err.message)
        }
    })
}

async function findSubscription(user_ID, channel_ID) {
    let sql = `SELECT * FROM subscriptions WHERE user_ID = ? AND channel_ID = ?`
    const arr = [user_ID, channel_ID]

    return new Promise((resolve, reject) => {
        db.get(sql, arr, (error, row) => {
            if (error) {
                reject(error.message)
            } else {
                resolve(row)
            }
        })
    })
}

async function findSubscriptions(user_ID) {
    let sql = `SELECT * FROM subscriptions WHERE user_ID = ?`
    const arr = [user_ID]

    return new Promise((resolve, reject) => {
        db.all(sql, arr, (error, rows) => {
            if (error) {
                reject(error.message)
            } else {
                resolve(rows)
            }
        })
    })
}

async function deleteSubscription(user_ID, channel_ID) {
    const sql = `DELETE FROM subscriptions WHERE user_ID = ? AND channel_ID = ?`
    const arr = [user_ID, channel_ID]
    const foundSubscription = await findSubscription(user_ID, channel_ID)
    if (!foundSubscription) {
        throw new Error(`Subscription not found`)
    }

    return new Promise((resolve, reject) => {
        db.run(sql, arr, (err) => {
            if (err) {
                reject(err.message)
            } else {
                resolve('Message successfully deleted!')
            }
        })
    })
}


module.exports = { postSubscription, deleteSubscription, findSubscriptions }
