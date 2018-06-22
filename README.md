# Veriff JS SDK
Veriff JS SDK, is a simple and customisable library which helps to integrate with Veriff Online Identity solution.

### Install
Include as a script tag:

```html
<script src='https://cdn.veriff.me/sdk/js/veriff.min.js'></script>
```

add the CSS styles:

```html
<link rel='stylesheet' href='https://cdn.veriff.me/sdk/js/styles.css'>
```

or install it via a package manager, *styles* are added inline

```bash
$ npm install --save @veriff/js-sdk
```

```javascript
 // CommonJS
 var Veriff = require('@veriff/js-sdk');

 // ES6 style import
 import Veriff from '@veriff/js-sdk';
```

### Usage

Veriff JS SDK requires one parent element in HTML:

```html
<div id='veriff-root'></div>
```
In order to initialize the library, **API Key**, **parentId** and **onSession** callback function is required.

```Javascript
  var veriff = Veriff({
    env: 'production', // or 'staging'
    apiKey: 'API_KEY',
    parentId: 'veriff-root',
    onSession: function(err, response) {
      // received the response, verification can be started now
    }
  });
  veriff.mount();
```
By default the following form will be rendered:

![alt text](https://cdn.veriff.me/assets/veriff-js-sdk.png "Veriff JS SDK")

**onSession** function is executed after the **response** is received from the API, response body contains a
verification object with following schema:

```json
{
    "status": "success",
    "verification": {
        "id": "UUID V4 Identifying the verification",
        "url": "full url to which a person should be redirected in order to proceed with verification flow",
        "host": "hostname",
        "status": "status of the verification",
        "sessionToken": "JWT encoded verification token"
    }
}
```

In case the Given name / Last name or both are known, they can be passed to the SDK, therefore text input fields will not be rendered.

```Javascript
  veriff.setParams({
    person: {
      givenName: 'Foo',
      lastName: 'Bar',
      idNumber: 12345
    }
  });
```

additionally the input labels and button text value can be customised.

```Javascript
  veriff.mount({
    formLabel: {
      givenName: 'First name',
      lastName: 'Family name',
      idNumber: 'Id'
    },
    submitBtnText: 'Veriff Me'
    loadingText: 'Please wait...'
  });
```
