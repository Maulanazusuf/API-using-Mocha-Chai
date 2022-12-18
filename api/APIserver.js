const httpCaller = require('supertest');
const serverAPI = httpCaller('http://localhost:1234');

function getUser(inputNama, inputLastName){
    return serverAPI.get(`/v1/users`)
        .query({
            name: inputNama,
            lastName: inputLastName,
        })
        .set('Connection', 'keep-alive')
        .set('Content-type','application/json');
}

function getUserById(userId){
    return serverAPI.get(`/v1/users/`+userId)
        .query({
            id: userId,
        })
        .set('Connection', 'keep-alive')
        .set('Content-type','application/json');
}

function postUser(bodyRequestData) {
    return serverAPI.post('/v1/users')
        .set('Connection', 'keep-alive')
        .set('Content-type','application/json')
        .send(bodyRequestData);
}

function putUser(bodyRequestData) {
    return serverAPI.put('/v1/users')
        .set('Connection', 'keep-alive')
        .set('Content-type','application/json')
        .send(bodyRequestData);
}

function deleteUser(userId) {
    return serverAPI.delete('/v1/users/'+userId)
        .set('Connection', 'keep-alive')
        .set('Content-type','application/json')
        .send(userId);
}

module.exports = {
    getUser,
    getUserById,
    postUser,
    putUser,
    deleteUser
}