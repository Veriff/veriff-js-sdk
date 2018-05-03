require('./styles/style.css');
const { createTemplate } = require('./template');
const createSession = require('./xhr');

const Veriff = function Veriff({ apiKey, parentId, onSession }) {
  return {
    params: {
      person: {},
      features: ['selfid'],
    },
    env: process.env.ENV,
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
        const givenName = form.givenName ? form.givenName.value : null;
        const lastName = form.lastName ? form.lastName.value : null;
        this.setParams({ person: { givenName, lastName }});

        createSession(apiKey, this.params, (err, response) => { onSession(err, response) });
      }
    }
  }
}


module.exports = Veriff;
