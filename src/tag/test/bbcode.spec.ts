import { Testing, TestingToBeMatchers } from '@angular-package/testing';

import { BBCode } from '../src/bbcode.class';
import { Wrapper } from '../../wrapper/src/wrapper.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`BBCode`, () => {
  const border = '1px solid #000';
  const closing = ']';
  const color = '#333';
  const name = 'quote';
  const opening = '[';

  const bbCodeSize14 = new BBCode('size', ['', '14px']);
  const bbCodeQuote = new BBCode(name, ['color', color], ['border', border]);

  const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`;
  const taggedText = bbCodeQuote.tag(text);
  const taggedSizeText = bbCodeSize14.tag(text);

  testing
    .describe(`accessors`, () => {
      testing

        .it(`BBcode.prototype.closingTag`, () => {
          toBe.stringIncludes(bbCodeSize14.closingTag, [closing]);
          expect(bbCodeSize14.closingTag).toContain(closing);
          expect(
            new Wrapper(opening, closing).textHasClosing(bbCodeSize14.closingTag.valueOf())
          ).toBeTrue();

          toBe.stringIncludes(bbCodeQuote.closingTag, [closing]);
          expect(bbCodeQuote.closingTag).toContain(closing);
          expect(
            new Wrapper(opening, closing).textHasClosing(bbCodeQuote.closingTag.valueOf())
          ).toBeTrue();
        })

        .it(`BBcode.prototype.name`, () => {
          expect(bbCodeQuote.name).toEqual(name);
          toBe.stringIncludes(bbCodeQuote.name, [name]);

          expect(bbCodeSize14.name).toEqual('size');
          toBe.stringIncludes(bbCodeSize14.name, ['size']);
        });
    })

    .describe(`methods`, () => {
      testing

        .it(`BBcode.prototype.getAttribute()`, () => {
          expect(bbCodeQuote.getAttribute('border')?.value).toEqual(border);
          expect(bbCodeQuote.getAttribute('color')?.value).toEqual(color);
        })

        .it(`BBcode.prototype.getClosingTag()`, () => {
          expect(bbCodeQuote.getClosingTag()).toContain(closing);
          expect(
            new Wrapper(opening, closing).textHasClosing(bbCodeQuote.getClosingTag().valueOf())
          ).toBeTrue();
        })

        .it(`BBcode.prototype.getName()`, () => {
          expect(bbCodeQuote.getName()).toEqual(name);
          toBe.stringIncludes(bbCodeQuote.getName(), [name]);
        })

        .it(`BBcode.prototype.getOpeningTag()`, () => {
          expect(bbCodeQuote.getOpeningTag()).toContain(opening);
          expect(new Wrapper(opening, closing).textHasOpening(bbCodeQuote.getOpeningTag().valueOf())).toBeTrue();
        })

        .it(`BBcode.prototype.replaceClosingTag()`, () => {
          expect(bbCodeQuote.replaceClosingTag(taggedText, `ClosingTag`)).toContain(
            `ClosingTag`
          );
        })
        .it(`BBcode.prototype.replaceOpeningTag()`, () => {
          expect(bbCodeQuote.replaceOpeningTag(taggedText, `OpeningTag`)).toContain(
            `OpeningTag`
          );
        })

        .it(`BBcode.prototype.replaceTag()`, () => {
          expect(
            bbCodeQuote.replaceTag(`[quote]no quote [quote] and the quote`, 'There is ')
          ).toEqual('There is no quote There is  and the quote');
        })

        .it(`BBcode.prototype.tag()`, () => {
          expect(bbCodeQuote.tag(text)).toContain(text);
          expect(bbCodeQuote.tag(text)).toContain(bbCodeQuote.closingTag.valueOf());
          expect(bbCodeQuote.tag(text)).toContain(bbCodeQuote.openingTag.valueOf());
        })

        .it(`BBcode.prototype.textHasClosingTag()`, () => {
          expect(bbCodeQuote.textHasClosingTag(taggedText)).toBeTrue();
          expect(bbCodeSize14.textHasClosingTag(taggedSizeText)).toBeTrue();
        })

        .it(`BBcode.prototype.textHasOpeningTag()`, () => {
          expect(bbCodeQuote.textHasOpeningTag(taggedText)).toBeTrue();
          expect(bbCodeSize14.textHasOpeningTag(taggedSizeText)).toBeTrue();
        })

        .it(`BBcode.prototype.untagText()`, () => {
          expect(bbCodeQuote.untagText(taggedText)).toEqual(text);
          expect(bbCodeSize14.untagText(taggedSizeText)).toEqual(text);
        })

        .it(`BBcode.prototype.valueOf()`, () => {
          expect(bbCodeQuote.valueOf()).toEqual(`${opening}${name}${closing}`);
          expect(bbCodeSize14.valueOf()).toEqual(`${opening}${'size'}${closing}`);
        });
    });
});
