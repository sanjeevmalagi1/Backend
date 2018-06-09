var expect  = require('chai').expect;
var request = require('request');


it('API test', function(done) {
    request('http://localhost:8000/api/' , function(error, response, body) {
        expect(body).to.equal('I am serving API here...');
        done();
    });
});

it('Get Todos', function(done) {
    request('http://localhost:8000/api/Todos' , function(error, response, body) {
    console.log(response);
            
    expect(body).to.isArray('I am serving API here...');
        done();
    });
});