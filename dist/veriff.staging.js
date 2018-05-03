(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Veriff", [], factory);
	else if(typeof exports === 'object')
		exports["Veriff"] = factory();
	else
		root["Veriff"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _require = __webpack_require__(2),
    createTemplate = _require.createTemplate;

var createSession = __webpack_require__(4);

var Veriff = function Veriff(_ref) {
  var apiKey = _ref.apiKey,
      parentId = _ref.parentId,
      onSession = _ref.onSession;

  return {
    params: {
      person: {},
      features: ['selfid']
    },
    env: {"ENV":"staging","VERIFF_API_URL":"https://staging.veriff.me/v1"}.ENV,
    setParams: function setParams(newParams) {
      this.params = Object.assign({}, this.params, newParams);
    },
    mount: function mount() {
      var _this = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          formLabel = _ref2.formLabel,
          submitBtnText = _ref2.submitBtnText;

      var form = createTemplate(parentId, { person: this.params.person, formLabel: formLabel, submitBtnText: submitBtnText });
      form.onsubmit = function (e) {
        e.preventDefault();
        if (!_this.params.features || !(_this.params.features instanceof Array)) {
          throw new Error('Session features array is required');
        }
        var givenName = form.givenName ? form.givenName.value : null;
        var lastName = form.lastName ? form.lastName.value : null;
        _this.setParams({ person: { givenName: givenName, lastName: lastName } });

        createSession(apiKey, _this.params, function (err, response) {
          onSession(err, response);
        });
      };
    }
  };
};

module.exports = Veriff;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    camelCaseToSlug = _require.camelCaseToSlug;

var createInput = function createInput(opts) {
  var type = opts.type,
      value = opts.value,
      name = opts.name;

  var input = document.createElement('input');
  input.setAttribute('type', type);
  if (type === 'submit' && value) {
    input.value = value;
  }

  input.setAttribute('class', 'veriff-' + type);
  input.setAttribute('id', 'veriff-' + camelCaseToSlug(name));
  input.setAttribute('name', name);
  input.setAttribute('required', true);
  return input;
};
var createLabel = function createLabel(value, labelFor) {
  var label = document.createElement('label');
  label.setAttribute('class', 'veriff-label');
  label.setAttribute('id', 'veriff-label-' + camelCaseToSlug(labelFor));
  label.setAttribute('htmlFor', labelFor);
  label.innerHTML = value;
  return label;
};
var createInputIfNeeded = function createInputIfNeeded(_ref) {
  var container = _ref.container,
      name = _ref.name,
      label = _ref.label,
      shouldRender = _ref.shouldRender;

  if (!shouldRender) {
    var inputLabel = createLabel(label, name);
    var input = createInput({ type: 'text', name: name });
    container.appendChild(inputLabel);
    container.appendChild(input);
  }
};

var createTemplate = function createTemplate(parentId) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$formLabel = _ref2.formLabel,
      formLabel = _ref2$formLabel === undefined ? {
    givenName: 'Given name',
    lastName: 'Last name'
  } : _ref2$formLabel,
      _ref2$person = _ref2.person,
      person = _ref2$person === undefined ? {
    givenName: false,
    lastName: false
  } : _ref2$person,
      _ref2$submitBtnText = _ref2.submitBtnText,
      submitBtnText = _ref2$submitBtnText === undefined ? 'Start verification' : _ref2$submitBtnText;

  var parent = document.getElementById(parentId);
  if (!parent) {
    new Error('Element ' + parentId + ' does not exists');
  }
  var fragment = document.createDocumentFragment();
  var container = document.createElement('form');

  container.setAttribute('class', 'veriff-container');
  container.setAttribute('name', 'veriff-form');

  createInputIfNeeded({ container: container, name: 'givenName', label: formLabel.givenName, shouldRender: person.givenName });
  createInputIfNeeded({ container: container, name: 'lastName', label: formLabel.lastName, shouldRender: person.lastName });

  var submit = createInput({ type: 'submit', name: 'submitBtn', value: submitBtnText });
  container.appendChild(submit);

  fragment.appendChild(container);
  parent.appendChild(fragment);
  return container;
};

module.exports = {
  createTemplate: createTemplate
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = exports;

util.capitalize = function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

util.camelCaseToSlug = function camelCaseToSlug(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
};

util.camelCaseHuminize = function camelCaseHuminize(str) {
  return util.capitalize(str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toLowerCase());
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var API_URL = {"ENV":"staging","VERIFF_API_URL":"https://staging.veriff.me/v1"}.VERIFF_API_URL + '/sessions';

var createSession = function createSession(apiKey, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", API_URL, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('x-auth-client', apiKey);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status == '201') {
        var resp = JSON.parse(xhr.responseText);
        cb(null, resp);
      } else {
        cb({
          status: xhr.status,
          statusText: xhr.statusText
        }, null);
      }
    }
  };

  var body = {
    verification: {
      features: data.features,
      person: {
        firstName: data.person.givenName,
        lastName: data.person.lastName
      },
      timestamp: new Date().toISOString()
    }
  };

  var json = JSON.stringify(body);
  xhr.send(json);
};

module.exports = createSession;

/***/ })
/******/ ]);
});
//# sourceMappingURL=veriff.staging.js.map