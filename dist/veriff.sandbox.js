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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && msCrypto.getRandomValues.bind(msCrypto));
if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uuid = __webpack_require__(3);

var _require = __webpack_require__(6),
    createTemplate = _require.createTemplate;

var createSession = __webpack_require__(8);

var Veriff = function Veriff(apiKey) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      features = _ref.features,
      _ref$id = _ref.id,
      id = _ref$id === undefined ? uuid.v4() : _ref$id;

  return {
    apiKey: apiKey,
    person: {},
    features: features,
    id: id,
    env: {"ENV":"sandbox","VERIFF_API_URL":"https://sandbox.veriff.me/v1"}.ENV,
    targetBlank: false,
    setOptions: function setOptions(_ref2) {
      var person = _ref2.person,
          features = _ref2.features,
          targetBlank = _ref2.targetBlank;

      if (person) {
        this.person = Object.assign({}, this.person, person.givenName ? { givenName: person.givenName } : null, person.lastName ? { lastName: person.lastName } : null);
      }
      if (features && features instanceof Array) {
        this.features = features;
      }

      if (targetBlank) {
        this.targetBlank = targetBlank;
      }
    },
    mount: function mount(parentId) {
      var _this = this;

      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          label = _ref3.label,
          submitValue = _ref3.submitValue;

      var form = createTemplate(parentId, { person: this.person, label: label, submitValue: submitValue });
      form.onsubmit = function (e) {
        e.preventDefault();
        if (!_this.features || !(_this.features instanceof Array)) {
          throw new Error('Session features array is required');
        }
        var givenName = form.givenName ? form.givenName.value : null;
        var lastName = form.lastName ? form.lastName.value : null;
        _this.setOptions({ person: { givenName: givenName, lastName: lastName } });
        var data = {
          id: _this.id,
          person: _this.person,
          features: _this.features
        };

        createSession(_this.apiKey, data, function (err, response) {
          if (err) {
            throw new Error(err);
          }
          if (_this.targetBlank) {
            return window.open(response.verification.url);
          }
          window.location.href = response.verification.url;
        });
      };
    }
  };
};

module.exports = Veriff;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(4);
var v4 = __webpack_require__(5);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(0);
var bytesToUuid = __webpack_require__(1);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(0);
var bytesToUuid = __webpack_require__(1);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(7),
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
      _ref2$label = _ref2.label,
      label = _ref2$label === undefined ? {
    givenName: 'Given name',
    lastName: 'Last name'
  } : _ref2$label,
      _ref2$person = _ref2.person,
      person = _ref2$person === undefined ? {
    givenName: false,
    lastName: false
  } : _ref2$person,
      _ref2$value = _ref2.value,
      value = _ref2$value === undefined ? 'Start verification' : _ref2$value;

  var parent = document.getElementById(parentId);
  if (!parent) {
    new Error('Element ' + parentId + ' does not exists');
  }
  var fragment = document.createDocumentFragment();
  var container = document.createElement('form');

  container.setAttribute('class', 'veriff-container');
  container.setAttribute('name', 'veriff-form');

  createInputIfNeeded({ container: container, name: 'givenName', label: label.givenName, shouldRender: person.givenName });
  createInputIfNeeded({ container: container, name: 'lastName', label: label.lastName, shouldRender: person.lastName });

  var submit = createInput({ type: 'submit', name: 'submitBtn', value: value });
  container.appendChild(submit);

  fragment.appendChild(container);
  parent.appendChild(fragment);
  return container;
};

module.exports = {
  createTemplate: createTemplate
};

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var API_URL = {"ENV":"sandbox","VERIFF_API_URL":"https://sandbox.veriff.me/v1"}.VERIFF_API_URL + '/sessions';

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
        cb(xhr.status, null);
      }
    }
  };

  var body = {
    verification: {
      id: data.id,
      features: data.features,
      person: {
        firsName: data.person.givenName,
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
//# sourceMappingURL=veriff.sandbox.js.map