const mysql = require('promise-mysql');
const config = require('./config');

let connection = null;

const connect = async ()=> {
  connection = await mysql.createConnection(config.database)
};
const disconnect = () => {
  connection.end();
};

module.exports = {
  connect,
  disconnect,
  getConnection: () => connection,
};