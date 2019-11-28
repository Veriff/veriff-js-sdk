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
  person?: PersonData;
  vendorData?: string;
}

const Veriff = (options: Options) => {
  const { host = 'https://api.veriff.me', apiKey, parentId, onSession } = options;
  return {
    params: {
      person: {},
    },
    setParams(newParams: Params): void {
      this.params = { ...this.params, ...newParams };
    },
    updateParams(newParams: Params, mountOptions: MountOptions = {}): void {
      this.params = { ...newParams };
      const { formLabel, loadingText, submitBtnText } = mountOptions;
      this.form = createTemplate(parentId, { ...newParams, formLabel, submitBtnText });
      this.form = this.assignSubmit(this.form, loadingText, submitBtnText);
    },
    form: this.form,
    assignSubmit(form, loadingText = 'Loading...', submitBtnText = 'Start Verification'): void {
      form.onsubmit = (e) => {
        e.preventDefault();

        const givenName = form.givenName?.value || this.params.person.givenName;
        const lastName = form.lastName?.value || this.params.person.lastName;
        const idNumber = this.params.person?.idNumber;
        const vendorData = form.vendorData?.value || this.params.vendorData;

        if (!givenName || !lastName) {
          throw new Error('Required parameters givenName or lastName is missing');
        }

        this.setParams({ person: { givenName, lastName, idNumber }, vendorData });
        form.submitBtn.value = loadingText;
        form.submitBtn.disabled = true;
        createSession(host, apiKey, this.params, (err, response) => {
          onSession(err, response);
          form.submitBtn.value = submitBtnText;
          form.submitBtn.disabled = false;
        });
      };

      return form;
    },
    mount(mountOptions: MountOptions = {}): void {
      const { formLabel, loadingText, submitBtnText } = mountOptions;
      const form = createTemplate(parentId, {
        person: this.params.person,
        vendorData: this.params.vendorData,
        formLabel,
        submitBtnText,
      });

      this.form = this.assignSubmit(form, loadingText, submitBtnText);
    },
  };
};

export = Veriff;
