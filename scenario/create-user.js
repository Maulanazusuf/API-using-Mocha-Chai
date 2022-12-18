const testcase = {
    description: '[@createuser] Create User API test',
    positive: {
        case1: '[@positive] Create User with valid request data',
        case2: '[@positive] Get User with valid request data'
    },
    negative: {
        case1: '[@negative] Get User with invalid request data'
    }
};

module.exports = {
    testcase
};