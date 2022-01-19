const assert = require('assert')
const sinon = require('sinon')
const { expect } = require('chai')
const handler = require('../../../bin/modules/users/api_handler')
const validator = require('../../../bin/modules/users/validator')
const Service = require('../../../bin/modules/users/service')
const service = new Service()

describe('#health-check-handler', () => {
    let res;
    beforeEach(() => {
        res = {
            send: function() {
                return true;
            }
        };
    });

    const resultSucces = {
        err: null,
        message: 'success',
        data: [],
        code: 200
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
            body: {
                name: 'xxs',
                phone: 'xxxxxxxxxx',
                role_id: '1'
            },
            params: {},
            query: {}
        };

        it('Should body not valid', async () => {
            sinon.stub(validator, 'isValidRegisterUser').resolves(resultError)
            expect(await handler.registerUser(reqErr, res));
            validator.isValidRegisterUser.restore()
        })

        it('Should error', async () => {
            sinon.stub(validator, 'isValidRegisterUser').resolves(resultSucces)
            sinon.stub(service, 'registerUser').resolves(resultError)
            expect(await handler.registerUser(reqSucces, res));
            validator.isValidRegisterUser.restore()
            service.registerUser.restore()
        })

        it('Should success', async () => {
            sinon.stub(validator, 'isValidRegisterUser').resolves(resultSucces)
            sinon.stub(service, 'registerUser').resolves(resultSucces)
            expect(await handler.registerUser(reqSucces, res));
            validator.isValidRegisterUser.restore()
            service.registerUser.restore()
        })
    })

    describe('loginUser', () => {
        it('Should body not valid', async () => {
            sinon.stub(validator, 'isValidloginUser').resolves(resultError)
            expect(await handler.loginUser(reqErr, res));
            validator.isValidloginUser.restore()
        })

        it('Should error', async () => {
            sinon.stub(validator, 'isValidloginUser').resolves(resultSucces)
            sinon.stub(service, 'loginUser').resolves(resultError)
            expect(await handler.loginUser(reqSucces, res));
            validator.isValidloginUser.restore()
            service.loginUser.restore()
        })

        it('Should success', async () => {
            sinon.stub(validator, 'isValidloginUser').resolves(resultSucces)
            sinon.stub(service, 'loginUser').resolves(resultSucces)
            expect(await handler.loginUser(reqSucces, res));
            validator.isValidloginUser.restore()
            service.loginUser.restore()
        })
    })
})