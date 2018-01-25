const { expect } = require('chai');
const { createTemplate } = require('../lib/template');


describe('Veriff create template', function() {
	beforeEach(function() {
    const veriffRoot = '<div id="veriff-root"></div>'
    document.body.insertAdjacentHTML('afterbegin', veriffRoot);
	});

	afterEach(function() {
    document.body.removeChild(document.getElementById('veriff-root'));
	});

  it('should create a full template and mount it into root', () => {
    createTemplate('veriff-root');
    expect(document.querySelector('.veriff-container')).to.exist;
    expect(document.getElementById('veriff-label-given-name')).to.exist;
    expect(document.getElementById('veriff-given-name')).to.exist;
    expect(document.getElementById('veriff-label-last-name')).to.exist;
    expect(document.getElementById('veriff-last-name')).to.exist;
    expect(document.getElementById('veriff-submit-btn')).to.exist;
  });

  it('should create partial template', () => {
    createTemplate('veriff-root', { person: { givenName: 'foo'}});
    expect(document.querySelector('.veriff-container')).to.exist;
    expect(document.getElementById('veriff-label-given-name')).not.to.not.exist;
    expect(document.getElementById('veriff-given-name')).not.to.exist;
    expect(document.getElementById('veriff-label-last-name')).to.exist;
    expect(document.getElementById('veriff-last-name')).to.exist;
    expect(document.getElementById('veriff-submit-btn')).to.exist;
  });

});
