import { typeOf } from '@angular-package/type';
import { Testing, TestingToBeMatchers } from '@angular-package/testing';
import { Wrap } from '../src/wrap.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Wrap`, () => {
  const opening = `[`;
  const closing = `]`;
  const content = `quote`;
  const wrap = new Wrap(opening, closing, content);
  testing
    .describe(`accessors`, () => {
      testing
        .it(`Wrap.prototype.closing`, () => {
          expect(wrap.closing).toEqual(closing);
          toBe.stringIncludes(wrap.closing, [closing]);
        })
        .it(`Wrap.prototype.opening`, () => {
          expect(wrap.opening).toEqual(opening);
          toBe.stringIncludes(wrap.valueOf(), [opening]);
        })
        .it(`Wrap.prototype.content`, () => {
          expect(wrap.content).toEqual(content);
          toBe.stringIncludes(wrap.valueOf(), [content]);
        })
        .it(`[Symbol.toStringTag]`, () => {
          expect(typeOf(wrap)).toEqual('wrap');
        });
    })
    .describe(`methods`, () => {
      testing
        .it(`Wrap.isWrap()`, () => {
          expect(Wrap.isWrap(wrap, opening, closing, content)).toEqual(true);
          expect(Wrap.isWrap(wrap, undefined, closing, content)).toEqual(true);
          expect(Wrap.isWrap(wrap, undefined, undefined, content)).toEqual(true);
          expect(Wrap.isWrap(wrap, undefined, undefined, undefined)).toEqual(true);
          expect(Wrap.isWrap(wrap, opening, undefined, undefined)).toEqual(true);
          expect(Wrap.isWrap(wrap, opening, closing, undefined)).toEqual(true);
        })
        .it(`Wrap.prototype.getClosing()`, () => {
          expect(wrap.getClosing()).toEqual(closing);
          toBe.stringIncludes(wrap.getClosing(), [closing]);
        })
        .it(`Wrap.prototype.getContent()`, () => {
          expect(wrap.getContent()).toEqual(content);
          toBe.stringIncludes(wrap.getContent(), [content]);
        })
        .it(`Wrap.prototype.getOpening()`, () => {
          expect(wrap.getOpening()).toEqual(opening);
          toBe.stringIncludes(wrap.getOpening(), [opening]);
        })
        .it(`Wrap.prototype.toString()`, () => {
          expect(wrap.toString()).toEqual(`${opening}${content}${closing}`);
          toBe.stringIncludes(wrap.toString(), [opening, content, closing]);
        })
        .it(`Wrap.prototype.getWrap()`, () => {
          expect(wrap.getWrap()).toEqual(`${opening}${content}${closing}`);
          toBe.stringIncludes(wrap.getWrap(), [opening, content, closing]);
        })
        .it(`Wrap.prototype.valueOf()`, () => {
          expect(wrap.valueOf()).toEqual(`${opening}${content}${closing}`);
          toBe.stringIncludes(wrap.valueOf(), [opening, content, closing]);
        });
    });
});
