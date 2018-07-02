const { should } = require('chai');
const sinon = require('sinon');
const createSession = require('../src/xhr');

should();

describe('Veriff create seassion', function() {
	beforeEach(function() {
		this.xhr = sinon.useFakeXMLHttpRequest();

		this.requests = [];
		this.xhr.onCreate = function(xhr) {
			this.requests.push(xhr);
		}.bind(this);
	});

	afterEach(function() {
		this.xhr.restore();
	});

	it('should submit the verification data', function(done) {
		const responseData = JSON.stringify({ url: 'test' });
		const requestData = {
			features: [],
			person: {
				givenName: 'test',
				lastName: 'test'
			},
			env: 'test'
		};

		createSession('test', 'key', requestData, (err, resp) => {
			const expectedData = JSON.parse(responseData);
			resp.should.deep.equal(expectedData);
			done();
		})

		this.requests[0].respond(201, {
			'Content-Type': 'text/json'
		}, responseData);
	});

  it('should return error status call into callback', function(done) {
    const requestData = {
      features: [],
      person: {
        givenName: 'test',
        lastName: 'test'
      },
      env: 'test'
    };

    createSession('test', '123', requestData, function(err) {
      err.should.exist;
			err.status.should.eql(500);
			err.statusText.should.eql('Internal Server Error');
      done();
    });

    this.requests[0].respond(500);
  });
});
