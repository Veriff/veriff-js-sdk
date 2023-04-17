import './styles/style.css';
import { createTemplate, PersonData, FormLabel } from './template';
import { createSession } from './xhr';

interface Options {
  host?: string;
  apiKey: string;
  parentId: string;
  onSession: (err, response) => void;
}

interface MountOptions {
  formLabel?: FormLabel;
  submitBtnText?: string;
  loadingText?: string;
}

interface Params {
  callback?: string;
  person?: PersonData;
  vendorData?: string;
}

const Veriff = (options: Options) => {
  const { host = 'https://api.veriff.me', apiKey, parentId, onSession } = options;
  const onSessionCallback = onSession;
  let mountedOptions: MountOptions = { loadingText: 'Loading...', submitBtnText: 'Start Verification' };
  let params: Params = {
    person: {},
  };
  let veriffForm: HTMLFormElement;

  function setParams(newParams: Params): void {
    params = { ...params, ...newParams };
  }

  function assignSubmit(form, loadingText = 'Loading...', submitBtnText): HTMLFormElement {
    form.onsubmit = (e) => {
      e.preventDefault();

      const callback = params.callback;
      const givenName = veriffForm.givenName?.value || params.person.givenName;
      const lastName = veriffForm.lastName?.value || params.person.lastName;
      const idNumber = params.person?.idNumber;
      const vendorData =
        typeof veriffForm.vendorData?.value === 'string' ? veriffForm.vendorData?.value : params.vendorData;

      if (!givenName || !lastName) {
        throw new Error('Required parameters givenName or lastName is missing');
      }

      setParams({ callback, person: { givenName, lastName, idNumber }, vendorData });
      form.submitBtn.value = loadingText;
      form.submitBtn.disabled = true;
      createSession(host, apiKey, params, (err, response) => {
        if (onSessionCallback) {
          onSessionCallback(err, response);
        }
        form.submitBtn.value = submitBtnText;
        form.submitBtn.disabled = false;
      });
    };

    return form;
  }

  function mount(mountOptions: MountOptions = {}): void {
    mountedOptions = { ...mountedOptions, ...mountOptions };
    const { formLabel, loadingText, submitBtnText } = mountedOptions;
    const { person, vendorData } = params;
    const form = createTemplate(parentId, {
      person,
      vendorData,
      formLabel,
      submitBtnText,
    });

    veriffForm = assignSubmit(form, loadingText, submitBtnText);
  }

  return {
    params,
    setParams,
    mount,
  };
};

export default Veriff;
