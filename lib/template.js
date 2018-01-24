const { camelCaseToSlug }  = require('./util');

const createInput = function createInput(opts) {
  const { type, value, name } = opts;
  const input = document.createElement('input');
  input.setAttribute('type', type);
  if (type === 'submit' && value) {
    input.value = value;
  }

  input.setAttribute('class', `veriff-${type}`);
  input.setAttribute('id', `veriff-${camelCaseToSlug(name)}`);
  input.setAttribute('name', name);
  input.setAttribute('required', true);
  return input;
}
const createLabel = function createLabel(value, labelFor) {
  const label = document.createElement('label');
  label.setAttribute('class', `veriff-label`);
  label.setAttribute('id', `veriff-label-${camelCaseToSlug(labelFor)}`);
  label.setAttribute('htmlFor', labelFor);
  label.innerHTML = value;
  return label;
}
const createInputIfNeeded = function createInputIfNeeded({container, name, label, shouldRender}) {
  if (!shouldRender) {
    const inputLabel = createLabel(label, name)
    const input = createInput({ type:'text', name });
    container.appendChild(inputLabel);
    container.appendChild(input);
  }
}

const createTemplate = function createTemplate(parentId, {
  label = {
    givenName: 'Given name',
    lastName: 'Last name'
  },
  person = {
    givenName: false,
    lastName: false
  },
  value = 'Start verification'
} = {}) {
  const parent = document.getElementById(parentId);
  if (!parent) {
    new Error(`Element ${parentId} does not exists`);
  }
  const fragment = document.createDocumentFragment();
  const container = document.createElement('form');

  container.setAttribute('class', 'veriff-container');
  container.setAttribute('name', 'veriff-form');

  createInputIfNeeded({ container, name: 'givenName', label: label.givenName, shouldRender: person.givenName });
  createInputIfNeeded({ container, name: 'lastName',  label: label.lastName, shouldRender: person.lastName });

  const submit = createInput({ type:'submit', name: 'submitBtn', value });
  container.appendChild(submit);

  fragment.appendChild(container);
  parent.appendChild(fragment);
  return container;
}

module.exports = {
  createTemplate
}
