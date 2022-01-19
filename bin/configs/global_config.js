require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.PORT,
  mysqlConfig: {
    connectionLimit: process.env.DB_MYSQL_CONNECTION_LIMIT,
    host: process.env.DB_MYSQL_HOST,
    user: process.env.DB_MYSQL_USER,
    port: process.env.DB_MYSQL_PORT,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE,
    timezone: process.env.DB_MYSQL_TIMEZONE,
    charset: process.env.DB_MYSQL_CHARSET
  },
  storage: process.env.STORAGE_URL,
  convert: process.env.CONVERT_URL
};
const store = new confidence.Store(config);

exports.get = key => store.get(key);
