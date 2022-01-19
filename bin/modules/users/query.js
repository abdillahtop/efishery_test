const Mysql = require('../../helpers/databases/mysql/db');
const mysql = new Mysql()

module.exports = {
    saveUser: async (payload) => {
        const valueData = [payload.user_id, payload.name, payload.phone, payload.password, payload.role_id];
        const query = `INSERT INTO users (user_id, name, phone, password, role_id) VALUES 
      (?,?,?,?,?)`
        const result = await mysql.insertOne(query, valueData)
        return result
    },

    getUserBy: async (payload) => {
        let query = (payload.length != 0) ? `SELECT * FROM users WHERE ` : `SELECT * FROM users`
        for (let i = 0; i < payload.length; i++) {
            query += `${payload[i].variable} = '${payload[i].value}'`
            query += (i + 1 < payload.length) ? ' AND ' : ''
        }
        const result = await mysql.findData(query)
        return result
    },

};