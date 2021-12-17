import { Testing, TestingToBeMatchers } from '@angular-package/testing';
import { AllowedChars } from '../lib/allowed-chars.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Attribute`, () => {

  const allowedWrap = new AllowedChars(/([\[\]\(\)<>{}])/g);

  testing.describe(`static`, () => {
    testing.it(`AllowedChars.isAllowedChars()`, () => {
      expect(AllowedChars.isAllowedChars(allowedWrap)).toBeTrue();
    });
  });

  testing.describe(`instance`, () => {
    testing.it(`AllowedChars.prototype.filterText()`, () => {
      expect(allowedWrap.filterText('There is [] text')).toEqual(`[]`);
      expect(new AllowedChars(/([\[\]\(\)<>])/g).textContains(`There is not {}`)).toBeFalse();
      expect(new AllowedChars(/([\[\]\(\)<>])/g).textContains(`There is <>`)).toBeTrue();
    })
    .it(`AllowedChars.prototype.textContains()`, () => {
      expect(allowedWrap.textContains('There is [] text')).toBeTrue();
      expect(new AllowedChars(/([\[\]\(\)<>{}])/g).textContains(`There is []`)).toBeTrue();
      expect(new AllowedChars(/([\[\]\(\)<>])/g).textContains(`There is not {}`)).toBeFalse();
    });
  });

});
