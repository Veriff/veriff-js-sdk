import { camelCaseToSlug } from './util';

export interface FormLabel {
  [P: string]: string;
}

export interface PersonData {
  givenName?: string;
  lastName?: string;
  idNumber?: string;
}

const defaultFormLabel: FormLabel = {
  givenName: 'Given name',
  lastName: 'Last name',
  idNumber: 'Id number',
  vendorData: 'Data',
};

const defaultPerson: PersonData = {
  givenName: '',
  lastName: '',
  idNumber: '',
};

export interface InputCreationOptions {
  type: string;
  value?: string;
  name: string;
  label?: string;
  required: boolean;
}

export function createInput(opts: InputCreationOptions) {
  const { type, value, name, label, required } = opts;
  const input = document.createElement('input');
  input.setAttribute('type', type);
  input.setAttribute('class', `veriff-${type}`);
  input.setAttribute('id', `veriff-${camelCaseToSlug(name)}`);
  input.setAttribute('name', name);
  input.required = required;

  if (type === 'submit' && value) {
    input.value = value;
  } else {
    input.setAttribute('placeholder', label || defaultFormLabel[name]);
  }

  return input;
}

export function createLabel(value = '', labelFor) {
  const label = document.createElement('label');
  label.setAttribute('class', `veriff-label`);
  label.setAttribute('id', `veriff-label-${camelCaseToSlug(labelFor)}`);
  label.setAttribute('htmlFor', labelFor);
  label.innerHTML = value;
  return label;
}

export interface CreationOptions {
  container: HTMLFormElement;
  name: string;
  label: string;
  shouldRender: boolean;
  required: boolean;
}

export function createInputIfNeeded(opts: CreationOptions) {
  const { container, name, label, shouldRender, required } = opts;
  if (shouldRender) {
    const inputLabel = createLabel(label, name);
    const input = createInput({ type: 'text', name, label, required });
    if (name === 'vendorData') {
      input.setAttribute('maxlength', '400');
    }

    container.appendChild(inputLabel);
    container.appendChild(input);
  }
}

export function createDescription() {
  const companyLink = document.createElement('a');
  const linkText = document.createTextNode('Veriff');
  companyLink.appendChild(linkText);
  companyLink.title = 'Veriff';
  companyLink.href = 'https://www.veriff.com/';
  companyLink.target = '_blank';

  const description = document.createElement('p');
  const descriptionText = document.createTextNode(
    ' is an identity verification provider that helps companies connect with customers.'
  );
  description.appendChild(companyLink);
  description.appendChild(descriptionText);
  description.setAttribute('class', 'veriff-description');

  return description;
}

export interface Options {
  formLabel?: FormLabel;
  person?: PersonData;
  vendorData?: string;
  submitBtnText?: string;
}

export function createTemplate(parentId: string, options: Options) {
  const { formLabel = defaultFormLabel, person = defaultPerson, vendorData, submitBtnText } = options;
  const parent = document.getElementById(parentId);
  if (!parent) {
    throw new Error(`Element ${parentId} does not exists`);
  }

  const fontLink = document.createElement('link');
  fontLink.setAttribute('rel', 'stylesheet');
  fontLink.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');
  document.head.appendChild(fontLink);

  parent.innerHTML = '';
  const fragment = document.createDocumentFragment();
  const container = document.createElement('form');

  container.setAttribute('class', 'veriff-container');
  container.setAttribute('name', 'veriff-form');

  createInputIfNeeded({
    container,
    name: 'givenName',
    label: formLabel.givenName,
    shouldRender: !person.givenName,
    required: true,
  });

  createInputIfNeeded({
    container,
    name: 'lastName',
    label: formLabel.lastName,
    shouldRender: !person.lastName,
    required: true,
  });

  createInputIfNeeded({
    container,
    name: 'vendorData',
    label: formLabel.vendorData,
    shouldRender: !vendorData,
    required: true,
  });

  const submit = createInput({ type: 'submit', name: 'submitBtn', value: submitBtnText, required: true });
  container.appendChild(submit);

  const description = createDescription();
  container.appendChild(description);

  fragment.appendChild(container);
  parent.appendChild(fragment);
  return container;
}
