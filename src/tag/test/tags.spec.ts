import { Testing, TestingToBeMatchers } from '@angular-package/testing';

import { Tag } from '../src/tag.class';
import { Tags } from '../src/tags.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Tag`, () => {

  const opening = `[`;
  const closing = `]`;

  const color = 'color';
  const colorValue = 'red';

  const border = 'border';
  const borderValue = '1px solid #000';

  const tags = new Tags(
    [`quote`, `fix`, `value`, `problem`],
    opening,
    closing,
    [color, colorValue], [border, borderValue]
  );

  testing
    .describe(`accessors`, () => {
      testing
        .it(`Tags.prototype.closing`, () => {
          expect(tags.closing).toEqual(closing);
        })
        .it(`Tags.prototype.opening`, () => {
          expect(tags.opening).toEqual(opening);
        })
        .it(`Tags.prototype.tags`, () => {
          expect(tags.tags.length).toEqual(4);
        });
    })

    .describe(`methods`, () => {
      testing
        .it(`Tags.prototype.forEach()`, () => {
          tags.forEach(tag => {
            expect(tag).toBeInstanceOf(Tag);
            toBe.instance(tag, Tag);
          });
        })
        .it(`Tags.prototype.get()`, () => {
          expect(tags.get('fix')).toBeInstanceOf(Tag);
          expect(tags.get('fix').name).toEqual('fix');
          toBe.instance(tags.get('fix'), Tag);
        })
        .it(`Tags.prototype.getTags()`, () => {
          expect(tags.getTags().length).toEqual(4);
          tags.getTags().forEach(tag => {
            expect(tag).toBeInstanceOf(Tag);
            toBe.instance(tag, Tag);
          });
        })
        .it(`Tags.prototype.has()`, () => {
          expect(tags.has('fix')).toBeTrue();
          toBe.true(tags.has('value'));
          toBe.false(tags.has('no tag' as any));
        })
        .it(`Tags.prototype.set()`, () => {
          // expect(tags.has('fix')).toBeTrue();
          // toBe.true(tags.has('value'));
          // toBe.false(tags.has('value'));
        });
    });
});

// //
// tags.forEach((tag) => {});
// tags.get('fix', );
// tags.getTags();
// tags.has('quote');
// tags.set('problem', ['color', 'red'], ['font-weight', 'bold']);
// tags.tags;

// // const cc = tags.tag.fix

// // console.log(tags.get('fix', 'color', 'font-weight'));

// // Add tags with attributes.
// const attributedTags = new Tags(
//   [`quote`, `fix`, `value`, `problem`],
//   `[`,
//   `]`,
//   ['color', 'red'], ['font-weight', '400']
// );

// //
// attributedTags.forEach((tag) => {});
// attributedTags.get('fix');
// attributedTags.getTags();
// attributedTags.has('quote');
// attributedTags.set('problem', ['color', 'red'], ['font-weight', 'bold']);
// const a = attributedTags.tags[0];

// // console.log(a.valueOf());

// const attributedTagsOneByOne = new Tags(
//   [`span`, ['quote', ['font-weight', '400'], ['name', 'a']]],
//   `[`,
//   `]`,
//   ['color', 'red']
// );

// console.log(attributedTagsOneByOne);
