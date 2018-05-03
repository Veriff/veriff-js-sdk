# Veriff JS SDK
Veriff JS SDK, is a simple and customisable library which helps to integrate with Veriff Online Identity solution.

### Install
There two ways to add Veriff SDK to the project.
Include Veriff SDK (SDK builds for different env can be found in dist folder) as a script tag:

```html
<script src='dist/veriff.min.js'></script>
```

add the CSS styles:

```html
<link rel='stylesheet' href='dist/styles.css'>
```

or install it via a package manager, *styles* are added inline 

```bash
$ npm install --save @veriff/js-sdk
```

```javascript
 var Veriff = require('@veriff/js-sdk');

 import Veriff from '@veriff/js-sdk';
```

### Usage

Veriff JS SDK requires one parent element in HTML:

```html
<div id='veriff-root'></div>
```
In order to initialize the library, API Key, parentId and onSession callback function is required. 
onSession function is executed after the response is received from the API, response argument contains a 
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
```Javascript
<<<<<<< HEAD
  var veriff = Veriff({
    apiKey,
    parentId,
    onSession: function(err, response) {
      // received the response, verification can be started now
    }
  });
  veriff.mount();
=======
  const veriff = Veriff(apiKey);
  veriff.setOptions({ features: ['selfid'] })
  veriff.mount('veriff-root')
>>>>>>> 3bdd26d63e017b062cec9d7e86f7944782a7cf0f
```
By default the following form will be rendered: 

![alt text](https://s3-eu-west-1.amazonaws.com/cdn.veriff.me/assets/veriff-js-sdk.png "Veriff JS SDK")

In case the Given name / Last name or both are known, they can be passed to the SDK, therefore text input fields will not be rendered.

```Javascript
  veriff.setParams({
    person: {
      givenName: 'Foo',
      lastName: 'Bar'
    }
  });
```

additionally the input labels and button text value can be customised.

```Javascript
  veriff.mount({
    formLabel: {
      givenName: 'First name',
      lastName: 'Family name'
    },
    submitBtnText: 'Veriff Me'
  });
```