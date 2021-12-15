// @angular-package/type.
import {
  // Function.
  isInstance,
} from '@angular-package/type';
// Class.
import { Tag } from './tag.class';
// Type.
import { ClosingTag } from '../type/closing-tag.type';
import { OpeningTag } from '../type/opening-tag.type';
import { TaggedText } from '../type/tagged-text.type';
/**
 * The `Tagged` string object represents the immutable tagged text.
 */
export class Tagged<
  Text extends string = string,
  Name extends string = string,
  Opening extends string = string,
  Closing extends string = string,
  AttributeName extends string = string
> extends String {
  //#region instance accessors.
  /**
   * Gets the closing tag of tagged text.
   * @returns The return value is a closing tag of tagged text of a generic type `ClosingTag`.
   * @angularpackage
   */
  public get closingTag(): ClosingTag<Name, Opening, Closing> {
    return this.#closingTag;
  }

  /**
   * Gets the opening tag of tagged text.
   * @returns The return value is an opening tag of tagged text of a generic type `OpeningTag`.
   * @angularpackage
   */
  public get openingTag(): OpeningTag<Name, Opening, Closing> {
    return this.#openingTag;
  }

  /**
   * Gets the untagged text,
   * @returns The return value is the text of a generic type variable `Text`.
   * @angularpackage
   */
  public get text(): Text {
    return this.#text;
  }

  /**
   * Gets the tagged text.
   * @returns The return value is the tagged text of a generic type `TaggedText`.
   * @angularpackage
   */
  public get value(): TaggedText<Text, Name, Opening, Closing> {
    return this.valueOf();
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'tagged'` for an instance of `Tag`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'tagged';
  }
  //#endregion instance accessors.

  //#region private properties.
  /**
   * Private closing tag of a generic type `ClosingTag`.
   */
  #closingTag!: ClosingTag<Name, Opening, Closing>;

  /**
   * Private opening tag of a generic type `OpeningTag`.
   */
  #openingTag!: OpeningTag<Name, Opening, Closing>;

  /**
   * Private text of a generic type variable `Text` to be wrapped.
   */
  #text: Text;
  //#endregion private properties.

  //#region static methods.
  /**
   * Checks if the value of any type is an instance of `Tagged`.
   * @param value The value of any to test against the `Tagged` instance.
   * @returns The return value is a `boolean` indicating the value is an instance of `Tagged`.
   * @angularpackage
   */
  public static isTagged(value: any): value is Tagged {
    return isInstance(value, Tagged);
  }

  /**
   * The static "tag" method builds from the give parameters the tagged text of a string type on the template.
   * @param template An array of string values where the first element is a prefix before the text.
   * @param values A rest parameter of expressions, where the first element is text and the second an instance of `Tag`.
   * @returns The return value is tagged text of a `string` type.
   * @angularpackage
   */
  public static template(
    template: TemplateStringsArray,
    ...values: any[]
  ): string {
    let text, tag;
    return (
      ([text, tag] = values),
      `${Tag.isTag(tag) ? tag.openingTag : ''}${template[0]}${text}${
        Tag.isTag(tag) ? tag.closingTag : ''
      }`
    );
  }
  //#endregion static methods.

  //#region constructor.
  /**
   * Creates a new `Tagged` instance of given `text` tagged by the provided `tag`.
   * @param text The text of a generic type variable `Text` to tag.
   * @param tag The tag of instance of `Tag` to tag the given `text`.
   * @angularpackage
   */
  constructor(text: Text, tag: Tag<Name, Opening, Closing, AttributeName>) {
    super(Tagged.template`${text}${tag}`);
    Tag.isTag(tag) &&
      (this.#closingTag = tag.closingTag) &&
      (this.#openingTag = tag.openingTag);
    this.#text = text;
  }
  //#endregion constructor.

  //#region instance methods.
  /**
   * Gets the untagged text.
   * @returns The return value is untagged text of a generic type variable `Text`.
   * @angularpackage
   */
  public untag(): Text {
    return this.#text;
  }

  /**
   * Gets the tagged text.
   * @returns The return value is tagged text of a generic type `TaggedText`.
   * @angularpackage
   */
  public valueOf(): TaggedText<Text, Name, Opening, Closing> {
    return super.valueOf() as TaggedText<Text, Name, Opening, Closing>;
  }
  //#endregion instance methods.
}
