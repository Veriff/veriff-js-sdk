import type { Params } from './interfaces';

const CREATED_RESPONSE_STATUS = 201;

export function createSession(
  host: string,
  apiKey: string,
  data: Params,
  cb: (statusObject, resp) => void
): void {
  const url = `${host}/v1/sessions`;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('x-auth-client', apiKey);
  xhr.setRequestHeader('x-origin', 'js-sdk');
  xhr.onreadystatechange = (): void => {
    if (xhr.readyState !== XMLHttpRequest.DONE) {
      return;
    }
    if (xhr.status === CREATED_RESPONSE_STATUS) {
      const resp = JSON.parse(xhr.responseText);
      return cb(null, resp);
    }
    return cb(
      {
        status: xhr.status,
        statusText: xhr.statusText,
      },
      null
    );
  };

  const body = {
    verification: {
      person: {
        firstName: data.person.givenName,
        lastName: data.person.lastName,
        idNumber: data.person.idNumber,
      },
      vendorData: data.vendorData,
      timestamp: new Date().toISOString(),
      lang: data.lang,
    },
  };

  const json = JSON.stringify(body);
  xhr.send(json);
}
