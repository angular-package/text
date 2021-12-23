import { typeOf } from '@angular-package/type';
import {
  Testing,
  TestingToBeMatchers,
} from '@angular-package/testing';

import { Wrap } from '../src/wrap.class';
import { Wrapper } from '../src/wrapper.class';

const testing = new Testing(false, false);
const toBe = new TestingToBeMatchers();

testing.describe(`Wrapper`, () => {
  const opening = `<`;
  const closing = `>`;
  const text = `There is a text to be wrapped`;
  const wrapper = new Wrapper(opening, closing);
  const wrap = new Wrap(opening, closing, text);
  testing
    .describe(`static methods`, () => {
      testing

        .it(`Wrapper.define()`, () => {
          const definedWrapper = Wrapper.define(`{{{`, `}}}`);
          expect(definedWrapper.closing).toEqual(`}}}`);
          toBe.string(definedWrapper.closing);
          expect(definedWrapper.opening).toEqual(`{{{`);
          toBe.string(definedWrapper.opening);
        })

        .it(`Wrapper.isWrapper()`, () => {
          expect(Wrapper.isWrapper(wrapper)).toBeTrue();
          expect(Wrapper.isWrapper(wrapper, opening)).toBeTrue();

          expect(Wrapper.isWrapper(wrapper, undefined, closing)).toBeTrue();
          expect(Wrapper.isWrapper(wrapper, opening, closing)).toBeTrue();

          expect(Wrapper.isWrapper(new Wrap(`[`, `]`))).toBeFalse();
          expect(Wrapper.isWrapper(wrapper, `{{{{{}}}}}`)).toBeFalse();

          expect(Wrapper.isWrapper(wrapper, undefined, `)`)).toBeFalse();
          expect(Wrapper.isWrapper(wrapper, `(`, `)`)).toBeFalse();
        });
    })
    .describe(`instance accessors`, () => {
      testing
      .it(`[Symbol.toStringTag]`, () => {
        expect(typeOf(wrapper)).toEqual('wrapper');
      });
    })
    .describe(`instance methods`, () => {
      testing
      .it(`Wrapper.prototype.isTextWrapped()`, () => {
        expect(wrapper.isTextWrapped(`${opening}text${closing}`)).toBeTrue();
        expect(wrapper.isTextWrapped(wrap.valueOf())).toBeTrue();
        expect(wrapper.isTextWrapped(wrapper.wrap(text))).toBeTrue();
      })
      .it(`Wrapper.prototype.textHasClosing()`, () => {
        expect(wrapper.textHasClosing(`${opening}text${closing}`)).toBeTrue();
        expect(wrapper.textHasClosing(`${closing}text${opening}`)).toBeFalse();
      })
      .it(`Wrapper.prototype.textHasOpening()`, () => {
        expect(wrapper.textHasOpening(`${opening}text${closing}`)).toBeTrue();
        expect(wrapper.textHasOpening(`${closing}text${closing}`)).toBeFalse();
      })
      .it(`Wrapper.prototype.unwrapText()`, () => {
        expect(wrapper.unwrapText(`${opening}text is ok${closing}`)).toEqual(`text is ok`);
      })
      .it(`Wrapper.prototype.wrap()`, () => {
        expect(wrapper.wrap(text)).toEqual(`${opening}${text}${closing}`);
      });
    });
});
