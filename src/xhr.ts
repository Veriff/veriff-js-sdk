export function createSession(host, apiKey, data, cb) {
  const url = `${host}/v1/sessions`;
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('x-auth-client', apiKey);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 201) {
        const resp = JSON.parse(xhr.responseText);
        cb(null, resp);
      } else {
        cb(
          {
            status: xhr.status,
            statusText: xhr.statusText,
          },
          null
        );
      }
    }
  };

  const body = {
    verification: {
      features: data.features,
      person: {
        firstName: data.person.givenName,
        lastName: data.person.lastName,
      },
      timestamp: new Date().toISOString(),
    },
  };

  const json = JSON.stringify(body);
  xhr.send(json);
}
