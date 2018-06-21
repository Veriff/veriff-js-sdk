require('./styles/style.css');
const { createTemplate } = require('./template');
const createSession = require('./xhr');

const Veriff = function Veriff({ env, apiKey, parentId, onSession }) {
  return {
    env: process.env.ENV,
    params: {
      person: {},
      features: ['selfid'],
    },
    setParams(newParams) {
      this.params = Object.assign({}, this.params, newParams );
    },
    mount({ formLabel, submitBtnText = 'Start Verification', loadingText = 'Loading...' } = {}) {
      const form = createTemplate(parentId, { person: this.params.person, formLabel, submitBtnText });
      form.onsubmit = (e) => {
        e.preventDefault();

        const givenName = form.givenName ? form.givenName.value : this.params.person.givenName;
        const lastName = form.lastName ? form.lastName.value : this.params.person.lastName;

        if (!this.params.features || !(this.params.features instanceof Array)) {
          throw new Error('Session features array is required');
        }
        
        if (!givenName || !lastName) {
          throw new Error('Required parameters givenName or lastName is missing');
        }
        
        this.setParams({ person: { givenName, lastName }});
        form.submitBtn.value = loadingText;
        form.submitBtn.disabled = true;
        createSession(env, apiKey, this.params, (err, response) => {
          onSession(err, response);
          form.submitBtn.value = submitBtnText;
          form.submitBtn.disabled = false;
        });
      }
    }
  }
}


module.exports = Veriff;
