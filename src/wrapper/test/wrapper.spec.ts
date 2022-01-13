import { typeOf } from '@angular-package/type';
import { Testing, TestingToBeMatchers } from '@angular-package/testing';

import { Wrap } from '../src/wrap.class';
import { Wrapper } from '../src/wrapper.class';

const testing = new Testing(false, false);
const toBe = new TestingToBeMatchers();

testing.describe(`Wrapper`, () => {
  const opening = `<`;
  const replaceOpening = '{{';
  const closing = `>`;
  const replaceClosing = '}}';
  const text = `There is a text to be wrapped`;
  const wrapper = new Wrapper(opening, closing, text);
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
        })
        .it(`Wrapper.replaceClosing()`, () => {
          console.log(Wrapper.replaceClosing(text, closing, replaceClosing));
          console.log(Wrapper.replaceOpening(text, opening, replaceOpening));
        })
        .it(`Wrapper.replaceOpening()`, () => {})
        .it(`Wrapper.unwrap()`, () => {
        })

        ;
    })

    .describe(`instance accessors`, () => {
      testing
      .it(`[Symbol.toStringTag]`, () => {
        expect(typeOf(wrapper)).toEqual('wrapper');
      });
    })

    .describe(`instance methods`, () => {
      testing

      // .it(`Wrapper.prototype.isTextWrapped()`, () => {
      //   expect(wrapper.isTextWrapped(`${opening}text${closing}`)).toBeTrue();
      //   expect(wrapper.isTextWrapped(wrap.valueOf())).toBeTrue();
      //   expect(wrapper.isTextWrapped(wrapper.wrapText(text).valueOf())).toBeTrue();
      // })

      .it(`Wrapper.prototype.isClosingIn()`, () => {
        expect(wrapper.isClosingIn(`${opening}text${closing}`)).toBeTrue();
        expect(wrapper.isClosingIn(`${closing}text${opening}`)).toBeFalse();
      })
      .it(`Wrapper.prototype.isOpeningIn()`, () => {
        expect(wrapper.isOpeningIn(`${opening}text${closing}`)).toBeTrue();
        expect(wrapper.isOpeningIn(`${closing}text${closing}`)).toBeFalse();
      })
      .it(`Wrapper.prototype.replaceClosingIn()`, () => {
        expect(wrapper.replaceClosingIn(wrapper.value, replaceClosing)).toEqual(`${opening}${text}${replaceClosing}`);
        expect(wrapper.replaceClosingIn(wrapper.value, replaceOpening)).not.toEqual(`${opening}${text}${replaceClosing}`);
      })
      .it(`Wrapper.prototype.replaceOpeningIn()`, () => {
        expect(wrapper.replaceOpeningIn(wrapper.value, replaceOpening)).toEqual(`${replaceOpening}${text}${closing}`);
        expect(wrapper.replaceOpeningIn(wrapper.value, replaceClosing)).not.toEqual(`${replaceOpening}${text}${closing}`);
      })
      .it(`Wrapper.prototype.textWrap()`, () => {
        expect(wrapper.textWrap(replaceOpening, replaceClosing)).toEqual(`${replaceOpening}${text}${replaceClosing}`);
        expect(wrapper.textWrap(opening, replaceClosing)).not.toEqual(`${replaceOpening}${text}${replaceClosing}`);
        expect(wrapper.textWrap(replaceOpening, closing)).not.toEqual(`${replaceOpening}${text}${replaceClosing}`);
      })
      .it(`Wrapper.prototype.textReplaceClosing()`, () => {
        expect(wrapper.textReplaceClosing(replaceOpening)).toEqual(`${opening}${text}${replaceClosing}`);
        expect(wrapper.textReplaceClosing(opening)).not.toEqual(`${opening}${text}${replaceClosing}`);
        expect(wrapper.textReplaceClosing(closing)).not.toEqual(`${opening}${text}${replaceClosing}`);
      })
      .it(`Wrapper.prototype.textReplaceOpening()`, () => {
        expect(wrapper.textReplaceOpening(replaceOpening)).toEqual(`${replaceOpening}${text}${closing}`);
        expect(wrapper.textReplaceOpening(opening)).not.toEqual(`${replaceOpening}${text}${closing}`);
        expect(wrapper.textReplaceOpening(closing)).not.toEqual(`${replaceOpening}${text}${closing}`);
      })
      .it(`Wrapper.prototype.textUnwrap()`, () => {
        expect(wrapper.textReplaceOpening(replaceOpening)).toEqual(`${replaceOpening}${text}${closing}`);
        expect(wrapper.textReplaceOpening(opening)).not.toEqual(`${replaceOpening}${text}${closing}`);
        expect(wrapper.textReplaceOpening(closing)).not.toEqual(`${replaceOpening}${text}${closing}`);
      })
      .it(`Wrapper.prototype.toArray()`, () => {
        expect(wrapper.toArray()).toEqual([ opening, text, closing]);
        expect(wrapper.toArray()).not.toEqual([ text, opening, closing]);
      })
      .it(`Wrapper.prototype.toWrap()`, () => {
        expect(wrapper.toWrap().closing).toEqual(closing);
        expect(wrapper.toWrap().opening).toEqual(opening);
        expect(wrapper.toWrap().text).toEqual(text);
      })
      .it(`Wrapper.prototype.unwrap()`, () => {
        expect(wrapper.unwrap()).toEqual(text);
      })
      .it(`Wrapper.prototype.wrap()`, () => {
        expect(wrapper.wrap()).toEqual(`${opening}${opening}${text}${closing}${closing}`);
      })

      .it(`Wrapper.prototype.removeWrapIn()`, () => {
        expect(wrapper.removeWrapIn(`${opening}text is ok${closing}`)).toEqual(`text is ok`);
        expect(wrapper.removeWrapIn(wrapper.value)).toEqual(text);
      })

      .it(`Wrapper.prototype.wrapOn()`, () => {
        expect(wrapper.wrapOn(text)).toEqual(`${opening}${text}${closing}`);
        expect(wrapper.wrapOn(wrapper.value)).toEqual(`${opening}${opening}${text}${closing}${closing}`);
      });
    });
});
