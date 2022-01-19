const {
  createLogger,
  transports,
  format
} = require('winston');
const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }))
    })
  ]
});

const log = (context, message, scope) => {
  const obj = {
    context,
    message: message.toString()
  }
  logger.info(obj);
};

module.exports = {
  log
};