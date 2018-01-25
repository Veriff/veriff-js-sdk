const util = require('../lib/util');
const { expect } = require('chai');

describe('Util', function() {
  describe('#capitalize', function() {
    it('should capitalize given string', function() {
      expect(util.capitalize('foo bar')).to.eql('Foo bar');
      expect(util.capitalize('foo-bar')).to.eql('Foo-bar');
      expect(util.capitalize('Foo bar')).to.eql('Foo bar');
    });
  });

  describe('#camelCaseToSlug', function() {
    it('should slugify the camelCase', function() {
      expect(util.camelCaseToSlug('f')).to.eql('f');
      expect(util.camelCaseToSlug('fooBar')).to.eql('foo-bar');
      expect(util.camelCaseToSlug('FooBar')).to.eql('foo-bar');
    });
  });

  describe('#camelCaseHuminize', function() {
    it('should huminize the camelCase', function() {
      expect(util.camelCaseHuminize('f')).to.eql('F');
      expect(util.camelCaseHuminize('fooBar')).to.eql('Foo bar');
      expect(util.camelCaseHuminize('FooBar')).to.eql('Foo bar');
    });
  });
})
