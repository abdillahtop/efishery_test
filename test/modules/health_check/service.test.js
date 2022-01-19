const assert = require('assert')
const sinon = require('sinon')
const mysqlConnect = require('../../../bin/helpers/databases/mysql/connection')
const HC = require('../../../bin/modules/health_check/service')
const hc = new HC()

describe('#health-check-service', () => {
    describe('healthCheck', () => {
        it('Should mysql cant connect', async () => {
            sinon.stub(hc, 'getPingMysql').resolves(false)
            const res = await hc.healthCheck();
            assert.equal(res.err, 'fail');
            assert.equal(res.code, 500);
            hc.getPingMysql.restore()
        })

        it('Should Health check success', async () => {
            sinon.stub(hc, 'getPingMysql').resolves(true)
            const res = await hc.healthCheck();
            assert.equal(res.err, null);
            assert.equal(res.code, 200);
            hc.getPingMysql.restore()
        })
    })
})