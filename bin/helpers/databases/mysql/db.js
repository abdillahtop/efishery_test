// require('dotenv').config(); // Initialize dotenv config

// const mysql = require('mysql');
// const configs = require('../../../configs/global_config');
// const logger = require('../../../helpers/utils/logger');
// const connection = mysql.createConnection(configs.get('/mysqlConfig'));

// connection.connect((err) => {
//   if (err) logger.log('error', err);
// });

// module.exports = connection;

const wrapper = require('../../utils/wrapper');
const connect = require('./connection');


class DB {
  done(connection) {
    connection.release();
  }

  async insertOne(statement, escape = null) {
    const self = this;
    let pool = await connect.getConn();
    const recordset = () => {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          if (err) {
            let errorMessage;
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
              errorMessage = 'Database connection was closed.';
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
              errorMessage = 'Database has too many connections.';
            }
            if (err.code === 'ECONNREFUSED') {
              errorMessage = 'Database connection was refused.';
            }
            self.done(connection);
            return reject(wrapper.error(err.code, errorMessage, 500));
          }
          connection.query(statement, escape, (err, result) => {
            if (err) {
              self.done(connection);
              return reject(wrapper.error(err.code, err.sqlMessage, 500));
            }
            self.done(connection);
            return resolve(wrapper.data(result));
          });
        });
      });
    };
    const result = await recordset().then(result => {
      return wrapper.data(result.data);
    }).catch(err => {
      return err;
    });
    return result;
  }

  async findData(statement, escape = null) {
    const self = this;
    let pool = await connect.getConn();
    const recordset = () => {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          if (err) {
            let errorMessage;
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
              errorMessage = 'Database connection was closed.';
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
              errorMessage = 'Database has too many connections.';
            }
            if (err.code === 'ECONNREFUSED') {
              errorMessage = 'Database connection was refused.';
            }
            self.done(connection);
            return reject(wrapper.error(err.code, errorMessage, 500));
          }

          connection.query(statement, escape, (err, result) => {
            if (err) {
              self.done(connection);
              return reject(wrapper.error(err.code, err.sqlMessage, 500));
            }

            self.done(connection);
            return resolve(wrapper.data(result));

          });

        });
      });
    };
    const result = await recordset().then(result => {
      return wrapper.data(result.data);
    }).catch(err => {
      return err;
    });
    return result;
  }
}
module.exports = DB;
