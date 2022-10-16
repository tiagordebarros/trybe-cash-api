const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../src/app');
const connection = require('../../src/db/connection');
const { person } = require('../mocks/peopleMocks');

const { use, expect } = chai;

use(chaiHttp);

describe('Testando os endpoints da entidade `people`', function () {
    it('Testando o cadastro de uma pessoa ', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
        
        const response = await chai
        .request(app)
        .post('/people')
        .send(person);

        expect(response.status).to.deep.equal(201);
        expect(response.body).to.deep.equal({ message: 'Pessoa cadastrada com sucesso com o id 42' });
    });
});
