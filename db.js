const sqlite3 = require('sqlite3').verbose()
const path = './database.db'

function createDbConnection() {
	const db = new sqlite3.Database(path, (error) => {
		if (error) return console.log(error.message)
		createTables(db)
	})
    return db
}

function createTables(db) {
    let tables = [ 
        `
        CREATE TABLE IF NOT EXISTS users (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            username varchar(100) NOT NULL,
            password varchar(100) NOT NULL
        );
        `,
        `
        CREATE TABLE IF NOT EXISTS channels (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            owner_ID INTEGER NOT NULL,
            name varchar(100) NOT NULL,
            FOREIGN KEY (owner_ID) REFERENCES users(ID)
        );
        `,
        `
        CREATE TABLE IF NOT EXISTS messages (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            user_ID INTEGER NOT NULL,
            channel_ID INTEGER NOT NULL,
            text varchar(100) NOT NULL,
            FOREIGN KEY (user_ID) REFERENCES users(ID),
            FOREIGN KEY (channel_ID) REFERENCES channels(ID)
        );
        `,
        `
        CREATE TABLE IF NOT EXISTS subscriptions (
            user_ID INTEGER NOT NULL,
            channel_ID INTEGER NOT NULL,
            FOREIGN KEY (user_ID) REFERENCES users(ID),
            FOREIGN KEY (channel_ID) REFERENCES channels(ID)
        );
        `
    ]

    tables.forEach(table => db.exec(table))
}

module.exports =  { createDbConnection }
