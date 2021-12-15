import {
  Testing,
  TestingToBeMatchers,
} from '@angular-package/testing';

import { Tag } from '../src/tag.class';
import { Wrapper } from '../../wrapper/src/wrapper.class';
import { Attributes } from '../../lib/attributes.class';
import { Tagged } from '../src/tagged.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Tag`, () => {

  const border = '1px solid #000';
  const closing = ']';
  const color = '#333';
  const name = 'quote';
  const opening = '[';
  const tag = new Tag(name, opening, closing, ['color', color], ['border', border]);

  testing
    .describe(`accessors`, () => {
      testing
      .it(`Tag.prototype.attributes`, () => {
        expect(tag.attributes).toBeInstanceOf(Attributes);
        toBe.instance(tag.attributes, Attributes);
        expect(tag.attributes?.attribute.color).toEqual(color);
        expect(tag.attributes?.attribute.border).toEqual(border);
      })
      .it(`Tag.prototype.closingTag`, () => {
        toBe.stringIncludes(tag.closingTag, [closing]);
        expect(tag.closingTag).toContain(closing);
        expect(new Wrapper(opening, closing).textHasClosing(tag.closingTag)).toBeTrue();
      })
      .it(`Tag.prototype.name`, () => {
        expect(tag.name).toEqual(name);
        toBe.stringIncludes(tag.name, [name]);
      })
      .it(`Tag.prototype.openingTag`, () => {
        expect(tag.openingTag).toContain(opening);
        toBe.stringIncludes(tag.openingTag, [opening]);
        expect(new Wrapper(opening, closing).textHasOpening(tag.openingTag)).toBeTrue();
      })
      .it(`Tag.prototype.tag`, () => {
        expect(tag.tag).toContain(closing);
        toBe.stringIncludes(tag.tag, [closing]);
      })
      .it(`Tag.prototype.wrapper`, () => {
        expect(tag.wrapper).toContain(closing);
        toBe.stringIncludes(tag.wrapper, [closing]);
      })
      .it(`Tag.prototype.value`, () => {
        expect(tag.value).toContain(closing);
        toBe.stringIncludes(tag.value, [closing]);
      })
    })
    .describe(`methods`, () => {
      testing
      .it(`Tag.prototype.getAttribute()`, () => {
        expect(tag.getAttribute('border')?.value).toEqual(border);
        expect(tag.getAttribute('color')?.value).toEqual(color);
      })
      .it(`Tag.prototype.getClosingTag()`, () => {
        expect(tag.getClosingTag()).toContain(closing);
        expect(new Wrapper(opening, closing).textHasClosing(tag.getClosingTag())).toBeTrue();
      })
      .it(`Tag.prototype.getName()`, () => {
        expect(tag.getName()).toEqual(name);
        toBe.stringIncludes(tag.getName(), [name]);
      })
      .it(`Tag.prototype.getOpeningTag()`, () => {
        expect(tag.getOpeningTag()).toContain(opening);
        expect(new Wrapper(opening, closing).textHasOpening(tag.getOpeningTag())).toBeTrue();
      })
      .it(`Tag.prototype.getTag()`, () => {
        expect(tag.getTag()).toContain(`${opening}${name}${closing}`);
        expect(new Wrapper(opening, closing).textHasOpening(tag.getTag())).toBeTrue();
        expect(new Wrapper(opening, closing).textHasClosing(tag.getTag())).toBeTrue();
        expect(new Wrapper(opening, closing).wrapText(name).value).toEqual(tag.getTag());
      })
      .it(`Tag.prototype.getWrapper()`, () => {
        expect(tag.getWrapper()).toBeInstanceOf(Wrapper);
        expect(new Wrapper(opening, closing)).toEqual(tag.getWrapper());
        expect(tag.getWrapper().closing).toEqual(tag.getWrapper().closing);
        expect(tag.getWrapper().opening).toEqual(tag.getWrapper().opening);
      })
      .it(`Tag.prototype.hasAttribute()`, () => {
        expect(tag.hasAttribute('color')).toBeTrue();
        expect(tag.hasAttribute('border')).toBeTrue();
      })
      .it(`Tag.prototype.replaceClosingTag()`, () => {
        const text = tag.tagText(`This is my text`).value;
        expect(tag.replaceClosingTag(text, `ClosingTag`)).toContain(`ClosingTag`);
        expect(new Wrapper(opening, closing)).toEqual(tag.getWrapper());
      })
      .it(`Tag.prototype.replaceOpeningTag()`, () => {
        expect(tag.getWrapper()).toBeInstanceOf(Wrapper);
        expect(new Wrapper(opening, closing)).toEqual(tag.getWrapper());
      })
      .it(`Tag.prototype.replaceTag()`, () => {
        expect(tag.replaceTag(`[quote]no quote [quote] and the quote`, 'There is ')).toEqual('There is no quote There is  and the quote');
      })
      .it(`Tag.prototype.setAttribute()`, () => {
        tag.setAttribute('border', '2px solid blue');
        expect(tag.getAttribute('border')?.value).toEqual('2px solid blue');
        tag.setAttribute('border', border);
      })
      .it(`Tag.prototype.tagText()`, () => {
        const text = 'My test text';
        expect(tag.tagText(text).value).toContain(text);
        expect(tag.tagText(text)).toBeInstanceOf(Tagged);

        expect(tag.tagText(text).closingTag).toContain(closing);
        expect(tag.tagText(text).openingTag).toContain(opening);

        expect(tag.tagText(text).closingTag).toContain(tag.closingTag);
        expect(tag.tagText(text).openingTag).toContain(tag.openingTag);
      })
      .it(`Tag.prototype.textHasClosingTag()`, () => {
        const text = tag.tagText(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. `);
        expect(tag.textHasClosingTag(text.value)).toBeTrue();
      })
      .it(`Tag.prototype.textHasOpeningTag()`, () => {
        const text = tag.tagText(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. `);
        expect(tag.textHasOpeningTag(text.value)).toBeTrue();
      })
      .it(`Tag.prototype.untagText()`, () => {
        const text = tag.tagText(`Lorem Ipsum is simply[quote] dummy [/quote]text of the printing and typesetting industry. `);
        expect(tag.untagText(text.value)).toEqual(`Lorem Ipsum is simply[quote] dummy [/quote]text of the printing and typesetting industry. `);
      })
      .it(`Tag.prototype.valueOf()`, () => {
        expect(tag.valueOf()).toEqual(`${opening}${name}${closing}`);
      });
    });
});
