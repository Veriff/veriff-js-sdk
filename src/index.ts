import './styles/style.css';
import { createTemplate, IPersonData } from './template';
import { createSession } from './xhr';

interface IOptions {
  host?: string;
  apiKey: string;
  parentId: string;
  onSession: (err, response) => void;
}

interface IMountOptions {
  formLabel?: any;
  submitBtnText?: string;
  loadingText?: string;
}

interface IParams {
  person?: IPersonData;
  vendorData?: string;
}

const Veriff = (options: IOptions) => {
  const { host = 'https://api.veriff.me', apiKey, parentId, onSession } = options;
  return {
    params: {
      person: {},
    },
    setParams(newParams: IParams) {
      this.params = { ...this.params, ...newParams };
    },
    updateParams(newParams: IParams) {
      this.params = { ...newParams };
      this.form = createTemplate(parentId, {
        person: this.params.person,
        vendorData: this.params.vendorData,
      });
      this.form = this.assignSubmit(this.form);
    },
    form: this.form,
    assignSubmit(form, loadingText = 'Loading...', submitBtnText = 'Start Verification') {
      form.onsubmit = (e) => {
        e.preventDefault();

        const givenName = form.givenName?.value || this.params.person.givenName;
        const lastName = form.lastName?.value || this.params.person.lastName;
        const idNumber = form.idNumber?.value || this.params.person.idNumber;
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
    mount(mountOptions: IMountOptions = {}) {
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
