const ENV_MAP = process.env.ENV_MAP;

const createSession = function(env = 'production', apiKey, data, cb) {
  const api = ENV_MAP[env]['VERIFF_API_URL'];
  const apiUrl = `${api}/sessions`;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', apiUrl, true);
  xhr.setRequestHeader('Content-type','application/json');
  xhr.setRequestHeader('x-auth-client', apiKey);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status == '201') {
        const resp = JSON.parse(xhr.responseText);
        cb(null, resp);
      } else {
        cb({
          status: xhr.status,
          statusText: xhr.statusText
        }, null);
      }
    }
  }

  const body = {
    verification: {
      features: data.features,
      person: {
        firstName: data.person.givenName,
        lastName: data.person.lastName,
        idNumber: data.person.idNumber
      },
      timestamp: new Date().toISOString()
    }
  }

  const json = JSON.stringify(body);
  xhr.send(json);
}

module.exports = createSession;
