const { createDbConnection } = require('../db')

const db = createDbConnection()

async function insertUser(username, password) {
    db.run(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        [username, password],
        function (error) {
            if(error) {
                console.error(error.message);
            }
            console.log(`Inserted a row with the ID: ${this.lastID}`)
        }
    );
}

async function listUsers() {
    const sql = `SELECT * FROM users`

    return new Promise((resolve, reject) => {
        db.all(sql, [], (error, rows) => {
            if (error) {
                reject(error)
            } else {
                resolve(rows)
            }
        })
    })
}

async function validateUser(username, password) {
    const sql = `SELECT username, ID as userID FROM users WHERE password = ? AND username = ?`

    return new Promise((resolve, reject) => {
        db.get(sql, [password, username], (error, row) => {
            if(error) {
                reject(error)
            } else {
                resolve(row)
            }
        })
    })
}

module.exports = { insertUser, listUsers, validateUser }


