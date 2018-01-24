const { createTemplate } = require('./template');
const createSession = require('./xhr');

const Veriff = function Veriff(apiKey, opts = {}) {
  const { person, features } = opts;
  return {
    apiKey,
    person,
    features,
    env: 'production',
    setOptions({ person, features, env }) {
      if (person) {
        this.person = Object.assign({}, this.person, person.givenName ? { givenName: person.givenName } : null,
                                                     person.lastName ? { lastName: person.lastName } : null );
      }
      if (features && features instanceof Array) {
        this.features = features;
      }

      if (env) {
        this.env = env;
      }
    },
    mount(parentId, { label, submitValue } = {}) {
      const form = createTemplate(parentId, { person: this.person, label, submitValue });
      form.onsubmit = (e) => {
        e.preventDefault();
        if (!this.features || !(this.features instanceof Array)) {
          throw new Error('Session features array is required');
        }
        const givenName = form.givenName ? form.givenName.value : null;
        const lastName = form.lastName ? form.lastName.value : null;
        this.setOptions({ person: { givenName, lastName }});
        const data = {
          person:this.person,
          features: this.features
        }
        createSession(this.apiKey, data, this.env)
      }
    }
  }
}


module.exports = Veriff;
