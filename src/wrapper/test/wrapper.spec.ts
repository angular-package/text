import { typeOf } from '@angular-package/type';
import {
  Testing,
  TestingToBeMatchers,
  randomString,
} from '@angular-package/testing';

import { AllowedChars } from '../../lib/allowed-chars.class';
import { Wrapper } from '../src/wrapper.class';
import { Wrap } from '../src/wrap.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Wrapper`, () => {
  let wrapper: Wrapper<string, string>;
  let opening: string, closing: string, text: string;

  beforeEach(() => {
    opening = randomString(1);
    closing = randomString(1);
    text = randomString(16);
    wrapper = new Wrapper(opening, closing);
  });

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

        .it(`Wrapper.getAllowedChars()`, () => {
          expect(Wrapper.getAllowedChars()).toEqual(
            new AllowedChars(/([\[\]\(\)<>{}])/g)
          );
          toBe
            .regexp(Wrapper.getAllowedChars())
            .instance(Wrapper.getAllowedChars(), AllowedChars);
        })

        .it(`Wrapper.getWrap()`, () => {
          expect(Wrapper.getWrap().value).toEqual(new Wrap(`[`, `]`).value);
          toBe.instance(Wrapper.getWrap(), Wrap);
        })

        .it(`Wrapper.isWrapper()`, () => {
          expect(Wrapper.isWrapper(wrapper)).toBeTrue();
          expect(Wrapper.isWrapper(wrapper, opening)).toBeTrue();

          expect(Wrapper.isWrapper(wrapper, undefined, closing)).toBeTrue();
          expect(Wrapper.isWrapper(wrapper, opening, closing)).toBeTrue();

          expect(Wrapper.isWrapper(new Wrap(`[`, `]`))).toBeFalse();
          expect(Wrapper.isWrapper(wrapper, `(`)).toBeFalse();

          expect(Wrapper.isWrapper(wrapper, undefined, `)`)).toBeFalse();
          expect(Wrapper.isWrapper(wrapper, `(`, `)`)).toBeFalse();
        })

        .it(`Wrapper.setAllowedChars()`, () => {
          expect(Wrapper.setAllowedChars(/[]/g).getAllowedChars()).toEqual(new AllowedChars(/[]/g));

          Wrapper.setAllowedChars(/([\[\]\(\)<>{}])/g);
        })

        .it(`Wrapper.setWrap()`, () => {
          expect(Wrapper.setWrap(`(`, `)`).getWrap().value).toEqual(`()`);
          expect(Wrapper.setWrap(null as any, `)`).getWrap().value).toEqual(`)`);
          expect(Wrapper.setWrap(`(`, null as any).getWrap().value).toEqual(`(`);

          Wrapper.setWrap(`[`, `]`);

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
      })
      .it(`Wrapper.prototype.textHasClosing()`, () => {
        expect(wrapper.textHasClosing(`${opening}text${closing}`)).toBeTrue();
      })
      .it(`Wrapper.prototype.textHasOpening()`, () => {
        expect(wrapper.textHasOpening(`${opening}text${closing}`)).toBeTrue();
      })
      .it(`Wrapper.prototype.unwrapText()`, () => {
        expect(wrapper.unwrapText(`${opening}text is ok${closing}`)).toEqual(`text is ok`);
      })
      .it(`Wrapper.prototype.valueOf()`, () => {
        expect(wrapper.valueOf()).toEqual(`${opening}${closing}`);
      });
    });
});
