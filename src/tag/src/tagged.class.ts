// @angular-package/type.
import {
  ResultCallback,
  guardString,
  areDefined,
  isDefined,
  isString,
  isStringLength,
  isInstance,
  isTrue,
} from '@angular-package/type';
// Class.
import { Tag } from './tag.class';
// Type.
import { ClosingTag } from '../type/closing-tag.type';
import { OpeningTag } from '../type/opening-tag.type';
/**
 *
 */
export class Tagged<
  Text extends string = string,
  Name extends string = string,
  Chars extends string = string
> extends String {
  #closingTag!: ClosingTag<Name, Chars>;
  #openingTag!: OpeningTag<Name, Chars>;

  public get closingTag(): ClosingTag<Name, Chars> | undefined {
    return this.#closingTag;
  }

  public get openingTag(): OpeningTag<Name, Chars> | undefined {
    return this.#openingTag;
  }

  public get text(): Text {
    return super.valueOf() as Text;
  }

  public static isTagged<Text extends string, Chars extends string>(
    value: any,
    callback?: ResultCallback<any>
  ): value is Tagged<Text, Chars> {
    return isInstance(value, Tagged, callback);
  }

  constructor(
    text: Text,
    tag?: Tag<Name, Chars>,
    callback?: ResultCallback<Text>
  ) {
    super(guardString(text, callback) ? text : '');
    this.#checkTagged(tag);
  }

  public untag(): string {
    return this.#isTagged()
      ? this.text.slice(
          this.#openingTag.length,
          this.text.length - this.#closingTag.length
        )
      : this.text;
  }

  #checkTagged(tag?: Tag<Name, Chars>): this {
    Tag.isTag(tag) && this.#setClosingTag(tag).#setOpeningTag(tag);
    return this;
  }

  #setClosingTag(tag: Tag<Name, Chars>): this {
    this.text.substring(
      this.text.length - tag.closingTag.length,
      this.text.length
    ) === tag.closingTag && (this.#closingTag = tag.closingTag);
    return this;
  }

  #setOpeningTag(tag: Tag<Name, Chars>): this {
    this.text.substring(0, tag.openingTag.length) === tag.openingTag &&
      (this.#openingTag = tag.openingTag);
    return this;
  }

  #isTagged(): boolean {
    return isTrue(areDefined(this.#closingTag, this.#openingTag).every());
  }
}
