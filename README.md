# veriff-js-sdk
Veriff JS SDK for browser integration

### Setup

Include Veriff SDK (SDK builds for different env can be found in dist folder) as a script tag:

```html
<script src='dist/veriff.min.js'></script>
```

add the CSS styles:

```html
<link rel='stylesheet' href='dist/style.css'>
```

### Usage

Veriff SDK requires one parent element in HTML:

```html
<div id='veriff-root'></div>
```
To initialize the library you would need an API Key and the list of features
```Javascript
  const veriff = Veriff(apiKey);
  veriff.setOptions({ features: ['selfid', 'video_call'] })
  veriff.mount('veriff-root')
```
