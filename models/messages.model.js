const { createDbConnection } = require('../db')
const { findSubscriptions } = require('./subscriptions.model')
const { uuidv4 } = require('../uuid')


const db = createDbConnection()


async function postNewMessage(user_ID, channels, text) {
    
    const userSubscriptions = await findSubscriptions(user_ID)
    channels.forEach(channel => {
        if (userSubscriptions.filter(userSub => userSub.channel_ID == channel).length !== 1) {
            throw new Error('User not subscribed to one or more channels and can not post')
        }
    });
    
    const date = new Date()
    const message_ID = uuidv4()
    const sql = `INSERT INTO messages(ID, user_ID, text, date) VALUES (?, ?, ?, ?)`
    const arr = [message_ID, user_ID, text, date]

    return new Promise((resolve, reject) => {
        db.run(sql, arr, (error) => {
            if (error) {
                reject(error.message)
            } else {
                resolve(message_ID)
            }
        })
    })
}

async function postMessChan(message_ID, channels) {
    let sql = `
        INSERT INTO messchan (message_ID, channel_ID) VALUES
    `
    const arr = []
    channels.forEach((channel, i) => {
        sql += `(?, ?)`
        if (i <= channels.length - 2) {
            sql += `, `
        } else {
            sql += `;`
        }
        arr.push(message_ID)
        arr.push(channel)
    })

    return new Promise((resolve, reject) => {
        db.run(sql, arr, (error) => {
            if (error) {
                reject(error.message)
            } else {
                resolve('Successfully posted messchan!')
            }
        })
    })
}

async function getMesschanByChannel(channel_ID) {
    let sql = `SELECT message_ID FROM messchan WHERE channel_ID = ?`
    const arr = [channel_ID]

    return new Promise((resolve, reject) => {
        db.all(sql, arr, (error, rows) => {
            if (error) {
                reject(error.message)
            } else {
                resolve(rows.map(row => row.message_ID))
            }
        })
    })
}

async function getMessages(messageIDs) {
    const allMessages = await getAllMessages()
    const result = []
    for (let i = 0; i < allMessages.length; i++) {
        if (messageIDs.includes(allMessages[i].ID)) {
            result.push(allMessages[i])
        }
    }
    return result
}

async function getMessagesByUser(user_ID) {
    let sql = `SELECT * FROM messages WHERE user_ID = ?`
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

async function getAllMessages() {
    let sql = `SELECT * FROM messages`
    const arr = []
    
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

module.exports = { postNewMessage, getMessages, getMessagesByUser, deleteMessage, postMessChan, getMesschanByChannel }
