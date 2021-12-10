import {
  Testing,
  TestingToBeMatchers,
  randomString,
} from '@angular-package/testing';
import { typeOf } from '@angular-package/type';

import { Wrap } from '../src/wrap.class';
import { Wrapped } from '../src/wrapped.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Wrapped`, () => {
  let wrapped: Wrapped<string, string, string>;
  let opening: string, closing: string, text: string, wrap: Wrap<string, string>;

  beforeEach(() => {
    opening = randomString(1);
    closing = randomString(1);
    text = randomString(16);
    wrap = new Wrap(opening, closing);
    wrapped = new Wrapped(text, wrap);
  });

  testing
    .describe(`static methods`, () => {
      testing
      .it(`Wrapped.isWrapped()`, () => {
        expect(Wrapped.isWrapped(wrapped)).toBeTrue();
        expect(Wrapped.isWrapped(wrapped, `[`, `]`)).toBeFalse();
        expect(Wrapped.isWrapped(wrapped, opening, `]`)).toBeFalse();
        expect(Wrapped.isWrapped(wrapped, `[`, closing)).toBeFalse();
        expect(Wrapped.isWrapped(wrapped, opening, closing)).toBeTrue();
      })
      .it(`Wrapped.template()`, () => {
        expect(Wrapped.template`prefix-${text}${wrap}`).toContain(text);
        toBe.stringIncludes(Wrapped.template`prefix-${text}${wrap}`, [text, wrap.opening, wrap.closing]);
        expect(Wrapped.template`suffix-${text}${wrap}`).toEqual(`${wrap.opening}suffix-${text}${wrap.closing}`);
      });
    })
    .describe(`instance accessors`, () => {
      testing
      .it(`Wrapped.prototype.closing`, () => {
        // wrapped.closing
        expect(wrapped.closing).toEqual(closing);
        toBe.stringIncludes(wrapped.closing, [closing]);
      })
      .it(`Wrapped.prototype.opening`, () => {
        // wrapped.opening
        expect(wrapped.opening).toEqual(opening);
        toBe.stringIncludes(wrapped.value, [opening]);
      })
      .it(`Wrapped.prototype.text`, () => {
        // wrapped.text
        expect(wrapped.text).toEqual(text);
        toBe.stringIncludes(wrapped.text, [text]);
      })
      .it(`Wrapped.prototype.value`, () => {
        // wrap.value
        expect(wrapped.value).toEqual(`${opening}${text}${closing}`);
        toBe.stringIncludes(wrapped.value, [opening, closing, text]);
      })
      .it(`[Symbol.toStringTag]`, () => {
        // wrap.value
        expect(typeOf(wrapped)).toEqual('wrapped');
      });
    })
    .describe(`instance methods`, () => {
      testing
      .it(`Wrapped.prototype.unwrap()`, () => {
        // wrapped.unwrap()
        expect(wrapped.unwrap()).toEqual(text);
        toBe.stringIncludes(wrapped.unwrap(), [text]);
      })
      .it(`Wrapped.prototype.valueOf()`, () => {
        // wrapped.valueOf()
        expect(wrapped.valueOf()).toEqual(`${opening}${text}${closing}`);
        toBe.stringIncludes(wrapped.valueOf(), [opening, closing, text]);
      });
    });
});
