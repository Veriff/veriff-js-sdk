import { camelCaseToSlug }  from './util';

type FormLabel = { givenName: string, lastName: string, idNumber: string };
type Person = { givenName: boolean, lastName: boolean, idNumber: boolean };

const defaultFormLabel: FormLabel = {
  givenName: 'Given name',
  lastName: 'Last name',
  idNumber: 'Id number'
};
const defaultPerson: Person = {
      givenName: false,
      lastName: false,
      idNumber: false
    };

export function createInput(opts) {
  const { type, value, name, required } = opts;
  const input = document.createElement('input');
  input.setAttribute('type', type);
  if (type === 'submit' && value) {
    input.value = value;
  }

  input.setAttribute('class', `veriff-${type}`);
  input.setAttribute('id', `veriff-${camelCaseToSlug(name)}`);
  input.setAttribute('name', name);
  input.required = required;
  return input;
}

export function createLabel(value, labelFor) {
  const label = document.createElement('label');
  label.setAttribute('class', `veriff-label`);
  label.setAttribute('id', `veriff-label-${camelCaseToSlug(labelFor)}`);
  label.setAttribute('htmlFor', labelFor);
  label.innerHTML = value;
  return label;
}

export function createInputIfNeeded(opts) {
  const { container, name, label, shouldRender, required } = opts;
  if (!shouldRender) {
    const inputLabel = createLabel(label, name)
    const input = createInput({ type:'text', name, required });
    container.appendChild(inputLabel);
    container.appendChild(input);
  }
}

type Options = { formLabel: FormLabel, person: Person, submitBtnText: any };

export function createTemplate(parentId: string, options: Options) {
  const { formLabel = defaultFormLabel, person = defaultPerson, submitBtnText } = options;
  const parent = document.getElementById(parentId);
  if (!parent) {
    new Error(`Element ${parentId} does not exists`);
  }
  const fragment = document.createDocumentFragment();
  const container = document.createElement('form');

  container.setAttribute('class', 'veriff-container');
  container.setAttribute('name', 'veriff-form');

  createInputIfNeeded({ container, name: 'givenName', label: formLabel.givenName, shouldRender: person.givenName , required: true});
  createInputIfNeeded({ container, name: 'lastName',  label: formLabel.lastName, shouldRender: person.lastName, required: true });
  createInputIfNeeded({ container, name: 'idNumber',  label: formLabel.idNumber, shouldRender: person.idNumber, required: false });

  const submit = createInput({ type:'submit', name: 'submitBtn', value: submitBtnText, required: true });
  container.appendChild(submit);

  fragment.appendChild(container);
  parent.appendChild(fragment);
  return container;
}