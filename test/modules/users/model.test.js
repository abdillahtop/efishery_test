const { expect } = require('chai');
const model = require('../../../bin/modules/users/model')

describe('#users-model', () => {

    describe('#user', () => {
        it('expect to be function', () => {
            expect(model.user).to.be.a('function');
        });

        it('expect to be object', () => {
            const result = model.user();
            expect(result).to.be.an('object');
        });
    });

});