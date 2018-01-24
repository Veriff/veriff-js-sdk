const uuid = require('uuid');

const API_URL = {
  dev: 'http://localhost:3000/v1/sessions',
  sandbox: 'https://sandbox.veriff.me/v1/sessions',
  staging: 'https://staging.veriff.me/v1/sessions',
  production: 'http://magic.veriff.me/v1/sessions',
};

const createSession = function(apiKey, data, env) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", API_URL[env], true);
  xhr.setRequestHeader('Content-type','application/json');
  xhr.setRequestHeader('x-auth-client', apiKey);

  xhr.onload = function () {
    const data = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "201") {
      window.location.href = data.verification.url;
    } else {
      throw new Error(data);
    }
  }
  const body = {
    verification: {
      id: uuid.v4(),
      features: data.features,
      person: data.person,
      timestamp: new Date().toISOString()
    }
  }

  const json = JSON.stringify(body);
  xhr.send(json);
}

module.exports = createSession;
