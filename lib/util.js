const util = exports;

util.capitalize = function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

util.camelCaseToSlug = function camelCaseToSlug (str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}

util.camelCaseHuminize = function camelCaseHuminize (str) {
  return util.capitalize(str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toLowerCase());
}
