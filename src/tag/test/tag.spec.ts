import { Testing, TestingToBeMatchers } from '@angular-package/testing';

import { Attributes } from '../../lib/attributes.class';
import { Tag } from '../src/tag.class';
import { Wrapper } from '../../wrapper/src/wrapper.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Tag`, () => {
  const border = '1px solid #000';
  const closing = ']';
  const color = '#333';
  const name = 'quote';
  const opening = '[';
  const a = new Tag(name, opening, closing);
  const tag = new Tag(
    name,
    opening,
    closing,
    ['color' as string, color],
    ['border', border]
  );
  const attributes = new Attributes(['color' as string, color], ['border', border]);
  const text = `[quote color="#333" border="1px solid #000"]Lorem Ipsum is simply dummy text of the printing and typesetting industry. [/quote]`;

  testing
    .describe(`accessors`, () => {
      testing

        .it(`Tag.prototype.attribute`, () => {
          toBe.object(tag.attribute);
          expect(tag.attribute?.color).toEqual(color);
          expect(tag.attribute?.border).toEqual(border);
        })

        .it(`Tag.prototype.attributes`, () => {
          expect(tag.attributes).toBeInstanceOf(Attributes);
          toBe.instance(tag.attributes, Attributes);
          expect(tag.attributes?.attribute.color).toEqual(color);
          expect(tag.attributes?.attribute.border).toEqual(border);
        })

        .it(`Tag.prototype.closing`, () => {
          toBe.stringIncludes(tag.closing, [closing]);
          expect(tag.closing).toContain(closing);
          expect(
            new Wrapper(opening, closing).textHasClosing(tag.closing)
          ).toBeTrue();
        })

        .it(`Tag.prototype.name`, () => {
          expect(tag.name).toEqual(name);
          toBe.stringIncludes(tag.name, [name]);
        })

        .it(`Tag.prototype.openingTag`, () => {
          expect(tag.opening).toContain(opening);
          toBe.stringIncludes(tag.opening, [opening]);
          expect(new Wrapper(opening, closing).textHasOpening(tag.opening)).toBeTrue();
        })
    })
    .describe(`methods`, () => {
      testing

        .it(`Tag.prototype.getAttribute()`, () => {
          expect(tag.getAttribute('border')?.value).toEqual(border);
          expect(tag.getAttribute('color')?.value).toEqual(color);
        })

        .it(`Tag.prototype.getClosing()`, () => {
          expect(tag.getClosing()).toContain(closing);
          expect(
            new Wrapper(opening, closing).textHasClosing(tag.getClosing())
          ).toBeTrue();
        })
        .it(`Tag.prototype.getName()`, () => {
          expect(tag.getName()).toEqual(name);
          toBe.stringIncludes(tag.getName(), [name]);
        })

        .it(`Tag.prototype.getOpening()`, () => {
          expect(tag.getOpening()).toContain(opening);
          expect(new Wrapper(opening, closing).textHasOpening(tag.getOpening())).toBeTrue();
        })

        .it(`Tag.prototype.hasAttribute()`, () => {
          expect(tag.hasAttribute('border')).toBeTrue();
          expect(tag.hasAttribute('color')).toBeTrue();
          expect(tag.hasAttribute('colorFalse')).toBeFalse();
        })

        .it(`Tag.prototype.replaceTag()`, () => {
          expect(tag.replaceTag(text, `closing tag replaced`)).toContain(
            `closing tag replaced`
          );
          expect(
            new Tag(`quote`, `[`, `]`).replaceTag(`[quote]no quote [quote] and the quote`, 'There is ')
          ).toEqual('There is no quote There is  and the quote');
        })

        .it(`Tag.prototype.toString()`, () => {
          expect(tag.toString()).toEqual(`${opening}${name}${attributes}${closing}`);
        })

        .it(`Tag.prototype.valueOf()`, () => {
          expect(tag.valueOf()).toEqual(`${opening}${name}${attributes}${closing}`);
        });
    });
});
