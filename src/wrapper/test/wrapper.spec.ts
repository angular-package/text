// @angular-package/testing.
import { Testing, TestingToBeMatchers } from '@angular-package/testing';
import { isFalse } from '@angular-package/type';
// Class.
import { Wrapper } from '../src/wrapper.class';
// Spec.
import { specWrapper } from './wrapper.func';
/**
 * 
 */
const testing = new Testing(false, false);
const toBe = new TestingToBeMatchers();
/**
 *
 */
testing.describe(`Wrapper`, () => {
  /**
   * Instance.
   */
  testing.it(`new Wrapper('[]')`, () => {
    specWrapper('[]', (result, value) => {
      return result;
    });
    // Wrapper.closingChar = '[[';
    // console.log(Wrapper.value);
    // Wrapper.define();
    // Wrapper.get
    // Wrapper.getCallback
    // Wrapper.getClosingChar
    // Wrapper.getOpeningChar
    // Wrapper.getWrap
    // Wrapper.isWrapper
    // Wrapper.openingChar
    // Wrapper.set
    // Wrapper.setCallback
    // Wrapper.setClosingChar
    // Wrapper.setOpeningChar
    // Wrapper.value
    // Wrapper.wrap
    // Wrapper.wrapText
  })
  .it(`new Wrapper('()')`, () => {
    specWrapper('()', (result, value) => {
      return result;
    });
  })
  .it(`new Wrapper('<>')`, () => {
    specWrapper('<>', (result, value) => {
      return result;
    });
  })
  .it(`new Wrapper() allowed chars`, () => {
    specWrapper('[)', (result, value) => {
      return result;
    });
    specWrapper('[>', (result, value) => {
      return result;
    });
    specWrapper('>>', (result, value) => {
      return result;
    });
  })

  .it(`new Wrapper() not allowed chars`, () => {
    specWrapper('BB', (result, value) => {
      if (isFalse(result)) {
        console.log(result, value);
        // throw new Error();
      }
      return result;
    });
  });

});
