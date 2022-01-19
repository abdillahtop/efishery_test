const assert = require('assert');
const sinon = require('sinon');
const query = require('../../../bin/modules/users/query')
const Service = require('../../../bin/modules/users/service')
const service = new Service()
const jwt = require('../../../bin/auth/jwt_auth_helper')

describe('#user-service', () => {

    const resultSucces = {
        err: null,
        message: 'success',
        data: [{
            name: 'xxx'
        }],
        code: 200
    };

    const resultEmpty = {
        data: []
    };

    const resultError = {
        err: true
    };

    const reqSucces = {
        body: {},
        params: {},
        query: {}
    };

    const reqErr = {
        body: {},
        params: {},
        query: {}
    };

    describe('registerUser', () => {
        const reqSucces = {
            name: 'xxs',
            phone: 'xxxxxxxxxx',
            role_id: '1'
        }

        it('Should name has been used', async () => {
            sinon.stub(query, 'getUserBy').resolves(resultSucces)
            const res = await service.registerUser(reqSucces)
            assert.equal(res.err, 'fail');
            assert.equal(res.code, 409);
            query.getUserBy.restore()
        })

        it('Should register failed', async () => {
            sinon.stub(query, 'getUserBy').resolves(resultEmpty)
            sinon.stub(query, 'saveUser').resolves({ err: true })
            const res = await service.registerUser(reqSucces)
            assert.equal(res.err, 'fail');
            assert.equal(res.code, 500);
            query.getUserBy.restore()
            query.saveUser.restore()
        })

        it('Should register success', async () => {
            sinon.stub(query, 'getUserBy').resolves(resultEmpty)
            sinon.stub(query, 'saveUser').resolves(resultSucces)
            const res = await service.registerUser(reqSucces)
            assert.equal(res.err, null);
            assert.equal(res.code, 200);
            query.getUserBy.restore()
            query.saveUser.restore()
        })
    })

    describe('loginUser', () => {
        const reqSucces = {
            phone: 'xxxxxxxxxx',
            password: 'xxxx'
        }

        const result1 = {
            data: [{
                password: 'xxxx'
            }]
        }

        const resNotmatch = {
            data: [{
                password: 'xx'
            }]
        }

        const genToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsInBob25lIjoiMTExMTExMTExIiwicm9sZV9pZCI6IjMiLCJyb2xlIjoiTm9uIEFkbWluIiwidGltZXN0YW1wIjoiMjAyMi0wMS0xOVQwNDoxMDowNiswNzowMCIsImlhdCI6MTY0MjU2NTQwNn0.LL3txPWW-7eRRWMYVktIuruZh3S2AHrCoV5KHpzgG0c'

        it('Should user not found', async () => {
            sinon.stub(query, 'getUserBy').resolves(resultEmpty)
            const res = await service.loginUser(reqSucces)
            assert.equal(res.err, 'fail');
            assert.equal(res.code, 404);
            query.getUserBy.restore()
        })

        it('Should password not match', async () => {
            sinon.stub(query, 'getUserBy').resolves(resNotmatch)
            const res = await service.loginUser(reqSucces)
            assert.equal(res.err, 'fail');
            assert.equal(res.code, 400);
            query.getUserBy.restore()
        })

        it('Should login success', async () => {
            sinon.stub(query, 'getUserBy').resolves(result1)
            sinon.stub(jwt, 'generateToken').resolves(genToken)
            const res = await service.loginUser(reqSucces)
            assert.equal(res.err, null);
            assert.equal(res.code, 200);
            query.getUserBy.restore()
            jwt.generateToken.restore()
        })

    })

    describe('detailUser', () => {
        const reqSucces = {
            phone: 'xxxxxxxxxx',
            name: 'xxxx'
        }

        const result1 = {
            data: [{
                password: 'xxxx'
            }]
        }

        it('Should user not found', async () => {
            sinon.stub(query, 'getUserBy').resolves(resultEmpty)
            const res = await service.detailUser(reqSucces)
            assert.equal(res.err, 'fail');
            assert.equal(res.code, 404);
            query.getUserBy.restore()
        })

        it('Should detail user success', async () => {
            sinon.stub(query, 'getUserBy').resolves(result1)
            const res = await service.detailUser(reqSucces)
            assert.equal(res.err, null);
            assert.equal(res.code, 200);
            query.getUserBy.restore()
        })

    })


})