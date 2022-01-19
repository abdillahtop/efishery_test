const wrapper = require('../../helpers/utils/wrapper');
const validate = require('validate.js');
const mysqlConnect = require('../../helpers/databases/mysql/connection');
const logger = require('../../helpers/utils/logger');

class Users {
  async healthCheck() {
    const data = ['mysql'];
    for (let a = 0; a < data.length; a++) {
      switch (data[a]) {
      case 'mysql':
        if (! await this.getPingMysql()) {
          logger.log('MYSQL', 'MYSQL Error', 'Error Mysql connection');
          return wrapper.error('fail', 'Mysql cant connect', 500);
        }
        break;
      }
    }
    logger.log('healthCheck', 'success', 'Health check success');
    return wrapper.data('success', 'Health check success', 200);

  }

  async getPingMysql() {
    try {
      let pool = await mysqlConnect.getConn();
      if (validate.isEmpty(pool)) {
        logger.log('Mysql', 'Error Mysql', 'Error mysql connection');
        return false;
      }
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
            connection.release();
            logger.log('Mysql', errorMessage, 'Error mysql connection');
            return reject(false);
          }
          connection.ping((err) => {
            if (err) {
              logger.log('Mysql', err, 'Error mysql connection');
              return reject(false);
            }
            logger.log('Mysql', 'success', 'Success mysql connection');
            return resolve(true);
          });
        });
      });
    } catch (error) {
      logger.log('mysql', error, 'Error mysql connection');
      return false;
    }
  }
}

module.exports = Users;
