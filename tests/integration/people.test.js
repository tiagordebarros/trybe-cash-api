const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../src/app');
const connection = require('../../src/db/connection');
const { person, peopleList } = require('../mocks/peopleMocks');

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

    it('Testando a listagem de todas as pessoas', async function () {
        sinon.stub(connection, 'execute').resolves([peopleList]);

        // console.log(await connection.execute()); // Retorna o array do mock

        const response = await chai
        .request(app)
        .get('/people');

        // console.log(response); // Imprime o objeto response no console

        expect(response.status).to.deep.equal(200);
        expect(response.body).to.deep.equal(peopleList);
    });

    it('Testando a listagem da pessoa com id 1', async function () {
        sinon.stub(connection, 'execute').resolves([[peopleList[0]]]);

        const response = await chai
        .request(app)
        .get('/people/1');

        expect(response.status).to.deep.equal(200);
        expect(response.body).to.deep.equal(peopleList[0]);
    });

    afterEach(sinon.restore);
});
