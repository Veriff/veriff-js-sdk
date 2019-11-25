export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function camelCaseToSlug(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}

export function camelCaseHumanize(str) {
  return this.capitalize(str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toLowerCase());
}
