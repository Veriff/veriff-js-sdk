require('./styles/style.css');
const { createTemplate } = require('./template');
const createSession = require('./xhr');

const Veriff = function Veriff({ host, apiKey, parentId, onSession }) {
  return {
    params: {
      person: {},
      features: ['selfid'],
    },
    setParams(newParams) {
      this.params = Object.assign({}, this.params, newParams);
    },
    mount({ formLabel, submitBtnText = 'Start Verification', loadingText = 'Loading...' } = {}) {
      const form = createTemplate(parentId, { person: this.params.person, formLabel, submitBtnText });
      form.onsubmit = (e) => {
        e.preventDefault();

        const givenName = form.givenName ? form.givenName.value : this.params.person.givenName;
        const lastName = form.lastName ? form.lastName.value : this.params.person.lastName;
        const idNumber = form.idNumber ? form.idNumber.value : this.params.person.idNumber;

        if (!this.params.features || !(this.params.features instanceof Array)) {
          throw new Error('Session features array is required');
        }
        
        if (!givenName || !lastName) {
          throw new Error('Required parameters givenName or lastName is missing');
        }
        
        this.setParams({ person: { givenName, lastName, idNumber }});
        form.submitBtn.value = loadingText;
        form.submitBtn.disabled = true;
        createSession(host, apiKey, this.params, (err, response) => {
          onSession(err, response);
          form.submitBtn.value = submitBtnText;
          form.submitBtn.disabled = false;
        });
      }
    }
  }
}


module.exports = Veriff;
