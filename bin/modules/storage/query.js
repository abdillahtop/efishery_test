const Mysql = require('../../helpers/databases/mysql/db');
const mysql = new Mysql()

module.exports = {
    insertCurrency: async (payload) => {
        const valueData = [payload.idr, payload.usd, payload.name];
        const query = `INSERT INTO currency_converter (idr,usd, updated_by) VALUES 
      (?,?,?)`
        const result = await mysql.insertOne(query, valueData)
        return result
    },

    newCurrency: async () => {
        const query = `SELECT * FROM currency_converter ORDER BY id DESC`
        const result = await mysql.findData(query)
        return result
    },

};