const chai = require('chai')
const expect = chai.expect;
const api = require('../api/APIserver');
const jsonPostData = require('../data/create-user.json');
const jsonSchemaPut = require('../schemas/put-user-schema.json');
const updateData = require('../data/update-data.json');

chai.use(require('chai-like'));
chai.use(require('chai-things'));
chai.use(require('chai-json-schema'));

var targetID = null;

describe('[@update-data] PUT /v1/users ', async() => {
    before(async() => {
        let response = await api.postUser(jsonPostData);
        expect(response.status).to.equal(200);
        targetID = response.body.id;

    });

    after(async () =>{
        let response = await api.deleteUser(targetID);
        expect(response.status).to.equal(200);
    });


     it('[@positive1] update occupation and nationality data', async() => {
        updateData.id=targetID
        let occupationUpdate = "Volley Player"
        let nationalityUpdate = "Indonesian"
        updateData.occupation = occupationUpdate
        updateData.nationality = nationalityUpdate
        
        let response = await api.putUser(updateData);
        expect(response.status).to.equal(200); 
        expect(response.body.id).to.equal(targetID); 
        expect(response.body).to.contain.like({occupation: occupationUpdate, nationality: nationalityUpdate}); 
        expect(response.body).jsonSchema(jsonSchemaPut); 
    });

    it('[@negative1] failed update when age is 0', async() => {
        updateData.age = 0;
        let response = await api.putUser(updateData);
        expect(response.status).to.equal(400); 
        expect(response.body.errorCode).to.equal('ER-03'); 
        expect(response.body).to.contain.like({"message": "you must specify data for firstname, lastName, age, occupation, nationality, hobbies (at least 1), and gender"}); 

        updateData.age = 36;
    });

    it('[@negative2] failed update when hobbies is empty array', async() => {
        updateData.hobbies.length=0;
        let response = await api.putUser(updateData);
        expect(response.status).to.equal(400); 
        expect(response.body.errorCode).to.equal('ER-03'); 
        expect(response.body).to.contain.like({"message": "you must specify data for firstname, lastName, age, occupation, nationality, hobbies (at least 1), and gender"}); 

        updateData.hobbies=["Riding a motorcycle"];
    });

    it('[@negative3] failed update when id is null', async() => {
        updateData.id = null;
        let response = await api.putUser(updateData);
        expect(response.status).to.equal(404); 
        expect(response.body.errorCode).to.equal('ER-01'); 
        expect(response.body).to.contain.like({"message": "user not found"}); 

        updateData.id = targetID;
    })


})