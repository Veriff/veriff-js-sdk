// @ts-ignore
import { IPersonData } from '../src/template';

// @ts-ignore
const sinon = require('sinon');
import { should } from 'chai';
import { createSession } from '../src/xhr';

should();

let xhr;
let requests;

beforeEach(() => {
  xhr = sinon.useFakeXMLHttpRequest();

  requests = [];
  xhr.onCreate = function(xhrCopy) {
    requests.push(xhrCopy);
  }.bind(this);
});

afterEach(() => {
  xhr.restore();
});

describe('Veriff create session', () => {
  it('should submit the verification data', (done) => {
    const responseData = JSON.stringify({ url: 'test' });
    const requestData: { person?: IPersonData; vendorData?: string; env: string } = {
      person: {
        givenName: 'test',
        lastName: 'test',
      },
      env: 'test',
    };

    createSession('test', 'key', requestData, (err, resp) => {
      const expectedData = JSON.parse(responseData);
      resp.should.deep.equal(expectedData);
      done();
    });

    requests[0].respond(
      201,
      {
        'Content-Type': 'text/json',
      },
      responseData
    );
  });

  it('should return error status call into callback', (done) => {
    const requestData = {
      features: [],
      person: {
        givenName: 'test',
        lastName: 'test',
      },
      env: 'test',
    };

    createSession('test', '123', requestData, (err) => {
      err.should.exist;
      err.status.should.eql(500);
      err.statusText.should.eql('Internal Server Error');
      done();
    });

    requests[0].respond(500);
  });
});
