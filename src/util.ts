export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function camelCaseToSlug (str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}

export function camelCaseHuminize (str) {
  return this.capitalize(str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toLowerCase());
}
