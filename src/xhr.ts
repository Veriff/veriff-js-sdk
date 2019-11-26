const CREATED_RESPONSE_STATUS = 201;

export function createSession(host, apiKey, data, cb) {
  const url = `${host}/v1/sessions`;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('x-auth-client', apiKey);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === CREATED_RESPONSE_STATUS) {
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
      person: {
        firstName: data.person.givenName,
        lastName: data.person.lastName,
        idNumber: data.person.idNumber,
      },
      vendorData: data.person.vendorData,
      timestamp: new Date().toISOString(),
    },
  };

  const json = JSON.stringify(body);
  xhr.send(json);
}
