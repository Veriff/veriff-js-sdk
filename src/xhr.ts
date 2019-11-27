import { IPersonData } from './template';

const CREATED_RESPONSE_STATUS = 201;

export function createSession<ICreationSession>(
  host: string,
  apiKey: string,
  data: { person?: IPersonData; vendorData?: string },
  cb: (statusObject, resp) => void
): void {
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
      vendorData: data.vendorData,
      timestamp: new Date().toISOString(),
    },
  };

  const json = JSON.stringify(body);
  xhr.send(json);
}
