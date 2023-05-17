const { createDbConnection } = require('../db');
const db = createDbConnection();

function insertNewChannel(owner_ID, name) {
  const sql = `INSERT INTO channels (owner_ID, name) VALUES (?, ?)`;
  db.run(sql, [owner_ID, name], (error) => {
    if (error) console.error(error.message);
  });
}

function removeChannel(owner_ID, name) {
  const sql = `DELETE FROM channels WHERE owner_ID = ? AND name = ? `;
  db.run(sql, [owner_ID, name], (error) => {
    if (error) return console.error(error);
  });
}

function getAllChannels() {
  const sql = `SELECT * FROM channels`;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

function getChannelName(name) {
  const sql = `SELECT name FROM channels WHERE name = ?`;

  return new Promise((resolve, reject) => {
    db.get(sql, [name], (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}

function getChannelById(channel_ID) {
    const sql = `SELECT * FROM channels WHERE ID = ?`;
  
    return new Promise((resolve, reject) => {
      db.get(sql, [channel_ID], (error, row) => {
        if (error) {
          reject(error);
        } else {
          resolve(row);
        }
      });
    });
  }

function getChannelOwnerID(owner_ID) {
  const sql = `SELECT owner_ID FROM channels WHERE owner_ID = ?`;

  return new Promise((resolve, reject) => {
    db.get(sql, [owner_ID], (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}

module.exports = {
  insertNewChannel,
  getAllChannels,
  getChannelName,
  getChannelOwnerID,
  removeChannel,
};
