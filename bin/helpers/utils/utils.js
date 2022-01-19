const crypto = require('crypto');

module.exports = {
  hashWithCrypto: (hashValue) => {
    const hash = crypto.createHash('md5').update(hashValue).digest('hex');
    return hash
  }

};
