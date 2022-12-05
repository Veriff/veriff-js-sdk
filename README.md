---
owner: "Client Tools"
description: "JS SDK for easy integration with Veriff"
status: "production"
type: "library"
---

# Veriff JS SDK
Veriff JS SDK, is a simple and customisable library which helps to integrate with Veriff Online Identity solution.

### Install JS SDK
Include as a script tag: 
  
```html
<script src='https://cdn.veriff.me/sdk/js/1.5/veriff.min.js'></script>
```

or install it via a package manager

```bash
  $ npm install --save @veriff/js-sdk
```

```javascript
   // CommonJS
  const Veriff = require('@veriff/js-sdk');

  // ES6 style import
  import { Veriff } from '@veriff/js-sdk';

```

### Adding JS SDK
 Veriff JS SDK requires one parent element in HTML:
 

```html
<div id='veriff-root'></div>
```

It is possible to set the width of js-sdk form through style attribute:

```html
<div id='veriff-root' style="width:400px"></div>
```

In order to initialize the library, *API Key*, *parentId* and *onSession* callback function is required.

```javascript
  const veriff = Veriff({
    apiKey: 'API_KEY',
    parentId: 'veriff-root',
    onSession: function(err, response) {
      // received the response, verification can be started now
    }
  });
    
  veriff.mount(); 
```

By default the following form will be rendered:
  
![alt text](https://cdn.veriff.me/assets/jssdk-default-sample.png "Veriff JS SDK")
  
  *onSession* function is executed after the *response* is received from the API, response body contains a verification object with following schema:
  

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

vendorData: string - Client specific data string, max 1000 characters long, will be sent back unmodified using webhooks.
In case the Given name / Last name / Vendor Data or all of them are known, they can be passed to the SDK, therefore text input fields will not be rendered.

```javascript
  const veriff = Veriff({
    apiKey: 'API_KEY',
    parentId: 'veriff-root',
    onSession: function(err, response) {
      // received the response, verification can be started now
    }
  });
  veriff.setParams({
    person: {
      givenName: 'Foo',
      lastName: 'Bar'
    },
    vendorData: '7eb19312-79d6-11ec-90d6-0242ac120003'
  });
  veriff.mount({
    submitBtnText: 'Get verified'
  });
```

![alt text](https://cdn.veriff.me/assets/jssdk-only-button-sample.png "Veriff JS SDK")

It is possible to disable fields rendering without passing any data by not including anything in corresponding value:

```javascript
  const veriff = Veriff({
    apiKey: 'API_KEY',
    parentId: 'veriff-root',
    onSession: function(err, response) {
      // received the response, verification can be started now
    }
  });
  veriff.setParams({
    person: {
      givenName: ' ',
      lastName: ' '
    },
    vendorData: ' '
  });
  veriff.mount({
    submitBtnText: 'Get verified'
  });
```

Additionally, the input placeholder and button text value can be customised.

```javascript
  const veriff = Veriff({
    apiKey: 'API_KEY',
    parentId: 'veriff-root',
    onSession: function(err, response) {
      // received the response, verification can be started now
    }
  });
  veriff.mount({
    formLabel: {
      givenName: 'First name',
      lastName: 'Family name',
      vendorData: 'Data'
    },
    submitBtnText: 'Get verified',
    loadingText: 'Please wait...'
  });
```
![alt text](https://cdn.veriff.me/assets/jssdk-default-sample.png "Veriff JS SDK")
