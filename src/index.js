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
    mount({ formLabel, submitBtnText } = {}) {
      const form = createTemplate(parentId, { person: this.params.person, formLabel, submitBtnText });
      form.onsubmit = (e) => {
        e.preventDefault();
        if (!this.params.features || !(this.params.features instanceof Array)) {
          throw new Error('Session features array is required');
        }
        
        const givenName = form.givenName ? form.givenName.value :
          this.params.person.givenName ? this.params.person.givenName : null;
        const lastName = form.lastName ? form.lastName.value :
          this.params.person.lastName ? this.params.person.lastName : null;
        
        this.setParams({ person: { givenName, lastName }});

        createSession(env, apiKey, this.params, (err, response) => { onSession(err, response) });
      }
    }
  }
}


module.exports = Veriff;
