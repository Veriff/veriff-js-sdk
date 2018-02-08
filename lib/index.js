const uuid = require('uuid');
const { createTemplate } = require('./template');
const createSession = require('./xhr');

const Veriff = function Veriff(apiKey, {features, id=uuid.v4()} = {}) {
  return {
    apiKey,
    person: {},
    features,
    id,
    env: process.env.ENV,
    setOptions({ person, features}) {
      if (person) {
        this.person = Object.assign({}, this.person, person.givenName ? { givenName: person.givenName } : null,
                                                     person.lastName ? { lastName: person.lastName } : null );
      }
      if (features && features instanceof Array) {
        this.features = features;
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
          id: this.id,
          person: this.person,
          features: this.features
        }

        createSession(this.apiKey, data, (err, response) => {
            if (err) {
              throw new Error(err);
            }
            window.location.href = response.verification.url;
        })
      }
    }
  }
}


module.exports = Veriff;
