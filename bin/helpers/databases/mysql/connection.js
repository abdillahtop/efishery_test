const mysql = require('mysql');

let variableGlobal;

const init = (config) => {
  createConnectionPool(config);
};

const createConnectionPool = async (config) => {
  const db = mysql.createPool(config);
  variableGlobal = db;
};

const getConn = async () => {
  return variableGlobal;
};

module.exports = {
  init,
  getConn
};
