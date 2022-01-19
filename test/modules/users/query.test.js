const sinon = require('sinon')
const query = require('../../../bin/modules/users/query')
const Mysql = require('../../../bin/helpers/databases/mysql/db')
describe('#query-users', () => {

    const req = {
        user_id: '-'
    };

    const resultSucces = {
        err: null,
        message: '',
        data:{},
        code: 200
    };

    it('Should success save user', async () => {
        sinon.stub(Mysql.prototype, 'insertOne').resolves(resultSucces);
        await query.saveUser(req);
        Mysql.prototype.insertOne.restore();
    });

    it('Should success get user', async () => {
        sinon.stub(Mysql.prototype, 'findData').resolves(resultSucces);
        await query.getUserBy(req);
        Mysql.prototype.findData.restore();
    });

});