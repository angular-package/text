import { Testing, TestingToBeMatchers } from '@angular-package/testing';

import { Html } from '../src/html.class';
import { Wrapper } from '../../wrapper/src/wrapper.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Html`, () => {
  const border = '1px solid #000';
  const closing = '>';
  const color = '#333';
  const name = 'span';
  const opening = '<';

  const htmlSize14 = new Html('size', ['', '14px']);
  const htmlSpan = new Html(name, ['color', color], ['border', border]);

  const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`;
  const taggedText = htmlSpan.tag(text);
  const taggedSizeText = htmlSize14.tag(text);

  testing
    .describe(`accessors`, () => {
      testing

        .it(`Html.prototype.closingTag`, () => {
          toBe.stringIncludes(htmlSize14.closingTag, [closing]);
          expect(htmlSize14.closingTag).toContain(closing);
          expect(
            new Wrapper(opening, closing).textHasClosing(htmlSize14.closingTag.valueOf())
          ).toBeTrue();

          toBe.stringIncludes(htmlSpan.closingTag, [closing]);
          expect(htmlSpan.closingTag).toContain(closing);
          expect(
            new Wrapper(opening, closing).textHasClosing(htmlSpan.closingTag.valueOf())
          ).toBeTrue();
        })

        .it(`Html.prototype.name`, () => {
          expect(htmlSpan.name).toEqual(name);
          toBe.stringIncludes(htmlSpan.name, [name]);

          expect(htmlSize14.name).toEqual('size');
          toBe.stringIncludes(htmlSize14.name, ['size']);
        });
    })

    .describe(`methods`, () => {
      testing

        .it(`Html.prototype.getAttribute()`, () => {
          expect(htmlSpan.getAttribute('border')?.value).toEqual(border);
          expect(htmlSpan.getAttribute('color')?.value).toEqual(color);
        })

        .it(`Html.prototype.getClosingTag()`, () => {
          expect(htmlSpan.getClosingTag()).toContain(closing);
          expect(
            new Wrapper(opening, closing).textHasClosing(htmlSpan.getClosingTag().valueOf())
          ).toBeTrue();
        })

        .it(`Html.prototype.getName()`, () => {
          expect(htmlSpan.getName()).toEqual(name);
          toBe.stringIncludes(htmlSpan.getName(), [name]);
        })

        .it(`Html.prototype.getOpeningTag()`, () => {
          expect(htmlSpan.getOpeningTag()).toContain(opening);
          expect(new Wrapper(opening, closing).textHasOpening(htmlSpan.getOpeningTag().valueOf())).toBeTrue();
        })

        .it(`Html.prototype.replaceClosingTag()`, () => {
          expect(htmlSpan.replaceClosingTag(taggedText, `ClosingTag`)).toContain(
            `ClosingTag`
          );
        })
        .it(`Html.prototype.replaceOpeningTag()`, () => {
          expect(htmlSpan.replaceOpeningTag(taggedText, `OpeningTag`)).toContain(
            `OpeningTag`
          );
        })

        .it(`Html.prototype.replaceTag()`, () => {
          expect(
            htmlSpan.replaceTag(`<span>no quote <span> and the quote`, 'There is ')
          ).toEqual('There is no quote There is  and the quote');
        })

        .it(`Html.prototype.tag()`, () => {
          expect(htmlSpan.tag(text)).toContain(text);
          expect(htmlSpan.tag(text)).toContain(htmlSpan.closingTag.valueOf());
          expect(htmlSpan.tag(text)).toContain(htmlSpan.openingTag.valueOf());
        })

        .it(`Html.prototype.textHasClosingTag()`, () => {
          expect(htmlSpan.textHasClosingTag(taggedText)).toBeTrue();
          expect(htmlSize14.textHasClosingTag(taggedSizeText)).toBeTrue();
        })

        .it(`Html.prototype.textHasOpeningTag()`, () => {
          expect(htmlSpan.textHasOpeningTag(taggedText)).toBeTrue();
          expect(htmlSize14.textHasOpeningTag(taggedSizeText)).toBeTrue();
        })

        .it(`Html.prototype.untagText()`, () => {
          expect(htmlSpan.untagText(taggedText)).toEqual(text);
          expect(htmlSize14.untagText(taggedSizeText)).toEqual(text);
        })

        .it(`Html.prototype.valueOf()`, () => {
          expect(htmlSpan.valueOf()).toEqual(`${opening}${name}${closing}`);
          expect(htmlSize14.valueOf()).toEqual(`${opening}${'size'}${closing}`);
        });
    });
});
