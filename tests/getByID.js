const chai = require('chai')
const expect = chai.expect;
const api = require('../api/APIserver');
const jsonPostData = require('../data/create-user.json');
const jsonSchemaGet = require('../schemas/get-user-schema.json');

chai.use(require('chai-like'));
chai.use(require('chai-things'));
chai.use(require('chai-json-schema'));

let targetID = null;

describe('[@get-data] GET users', async() => {
    before(async() => {
        let response = await api.postUser(jsonPostData);
        expect(response.status).to.equal(200);
        targetID = response.body.id;

    });

    after(async () =>{
        let response = await api.deleteUser(targetID);
        expect(response.status).to.equal(200);
    });


    it('[@positive1] search user by valid ID', async() => {
        let response = await api.getUserById(targetID);
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(targetID); 
        expect(response.body).jsonSchema(jsonSchemaGet);
    });

    it('[@negative1] search user by invalid ID', async() => {
        let response = await api.getUserById("00101");
        expect(response.status).to.equal(404); 
        expect(response.body.errorCode).to.equal("ER-01");
        expect(response.body).to.contain.like({"message": "user not found"});
    });


})