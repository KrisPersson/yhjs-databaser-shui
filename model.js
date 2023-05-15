const { createDbConnection } = require('./db')

const db = createDbConnection()


async function postNewMessage(user_ID, channel_ID, text) {
    const date = new Date()
    const userIsSubscribed = await findSubscription(user_ID, channel_ID)
    if (!userIsSubscribed) {
        throw new Error('User not subscribed to this channel and can not post')
    }

    const sql = `INSERT INTO messages(user_ID, channel_ID, text, date) VALUES (?, ?, ?, ?)`
    const arr = [user_ID, channel_ID, text, date]
    db.run(sql, arr, (err) => {
        if (err) {
            throw new Error(err.message)
        }
    })
}

async function getMessages(channel_ID) {
    let sql = `SELECT * FROM messages WHERE channel_ID = ?`
    const arr = [channel_ID]
    
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

async function findMessage(ID) {
    let sql = `SELECT * FROM messages WHERE ID = ?`
    const arr = [ID]

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

async function deleteMessage(ID) {
    const sql = `DELETE FROM messages WHERE ID = ?`
    const arr = [ID]

    const foundMessage = await findMessage(ID)
    if (!foundMessage) {
        throw new Error(`Message with ID: ${ID} not found`)
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


module.exports = { postNewMessage, getMessages, deleteMessage, postSubscription, deleteSubscription }
