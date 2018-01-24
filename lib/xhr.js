const uuid = require('uuid');

const API_URL = {
  dev: 'http://localhost:3000/v1/sessions',
  sandbox: 'https://sandbox.veriff.me/v1/sessions',
  staging: 'https://staging.veriff.me/v1/sessions',
  production: 'http://magic.veriff.me/v1/sessions',
};

const createSession = function(apiKey, data, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", API_URL[data.env], true);
  xhr.setRequestHeader('Content-type','application/json');
  xhr.setRequestHeader('x-auth-client', apiKey);

  xhr.onload = () => cb(xhr);
  
  const body = {
    verification: {
      id: uuid.v4(),
      features: data.features,
      person: {
        firsName: data.person.givenName,
        lastName: data.person.lastName
      },
      timestamp: new Date().toISOString()
    }
  }

  const json = JSON.stringify(body);
  xhr.send(json);
}

module.exports = createSession;
