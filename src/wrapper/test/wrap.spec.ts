import { typeOf } from '@angular-package/type';
import {
  Testing,
  TestingToBeMatchers,
  randomString,
} from '@angular-package/testing';
import { Wrap } from '../src/wrap.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Wrap`, () => {
  let wrap: Wrap<string, string>;
  let opening: string, closing: string;

  beforeEach(() => {
    opening = randomString(1);
    closing = randomString(1);
    wrap = new Wrap(opening, closing);
  });

  testing
    .describe(`accessors`, () => {
      testing
      .it(`Wrap.prototype.closing`, () => {
        // wrap.closing
        expect(wrap.closing).toEqual(closing);
        toBe.stringIncludes(wrap.closing, [closing]);
      })
      .it(`Wrap.prototype.opening`, () => {
        // wrap.opening
        expect(wrap.opening).toEqual(opening);
        toBe.stringIncludes(wrap.value, [opening]);
      })
      .it(`Wrap.prototype.wrap`, () => {
        // wrap.wrap
        expect(wrap.wrap).toEqual(`${opening}${closing}`);
        toBe.stringIncludes(wrap.wrap, [opening, closing]);
      })
      .it(`Wrap.prototype.value`, () => {
        // wrap.value
        expect(wrap.value).toEqual(`${opening}${closing}`);
        toBe.stringIncludes(wrap.value, [opening, closing]);
      })
      .it(`[Symbol.toStringTag]`, () => {
        // wrap.value
        expect(typeOf(wrap)).toEqual('wrap');
      });
    })
    .describe(`methods`, () => {
      testing
      .it(`Wrap.prototype.getClosing()`, () => {
        // wrap.value
        expect(wrap.getClosing()).toEqual(closing);
        toBe.stringIncludes(wrap.getClosing(), [closing]);
      })
      .it(`Wrap.prototype.getOpening()`, () => {
        // wrap.getOpening
        expect(wrap.getOpening()).toEqual(opening);
        toBe.stringIncludes(wrap.getOpening(), [opening]);
      })
      .it(`Wrap.prototype.getWrap()`, () => {
        // wrap.getWrap()
        expect(wrap.getWrap()).toEqual(`${opening}${closing}`);
        toBe.stringIncludes(wrap.getWrap(), [opening, closing]);
      })
      .it(`Wrap.prototype.valueOf()`, () => {
        // wrap.valueOf()
        expect(wrap.valueOf()).toEqual(`${opening}${closing}`);
        toBe.stringIncludes(wrap.valueOf(), [opening, closing]);
      });
    });
});
