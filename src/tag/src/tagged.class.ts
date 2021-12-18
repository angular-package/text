// @angular-package/type.
import {
  // Function.
  isInstance,
} from '@angular-package/type';
// Class.
import { Tag } from './tag.class';
// Type.
import { TaggedText } from '../type/tagged-text.type';
import { OpeningTag } from './opening-tag.class';
import { ClosingTag } from './closing-tag.class';
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
   * The `get` accessor returns a closing tag of tagged text.
   * @returns The return value is a closing tag of the tagged text of a generic type `ClosingTag`.
   * @angularpackage
   */
  public get closingTag(): ClosingTag<Name, Opening, Closing> {
    return this.#closingTag;
  }

  /**
   * The `get` accessor returns an opening tag of tagged text.
   * @returns The return value is an opening tag of the tagged text of a generic type `OpeningTag`.
   * @angularpackage
   */
  public get openingTag(): OpeningTag<Name, Opening, Closing> {
    return this.#openingTag;
  }

  /**
   * The `get` accessor returns the untagged text.
   * @returns The return value is the text of a generic type variable `Text`.
   * @angularpackage
   */
  public get text(): Text {
    return this.#text;
  }

  /**
   * The `get` accessor returns the tagged text.
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
  #closingTag: ClosingTag<Name, Opening, Closing>;

  /**
   * Private opening tag of a generic type `OpeningTag`.
   */
  #openingTag: OpeningTag<Name, Opening, Closing>;

  /**
   * Private text of a generic type variable `Text` to be tagged.
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
  // public static isTagged(value: any): value is Tagged {
  //   return isInstance(value, Tagged);
  // }

  /**
   * The static "tag" method builds from the give parameters the tagged text of a `string` type on the template.
   * @param template An array of string values where the first element is a prefix before the text.
   * @param values A rest parameter of expressions, where the first element is text and the second an instance of `Tag`.
   * @returns The return value is tagged text of a `string` type.
   * @angularpackage
   */
  public static template(
    template: TemplateStringsArray,
    ...values: any[]
  ): string {
    let closingTag, openingTag, text;
    return (
      ([text, openingTag, closingTag] = values),
      `${Tag.isTag(openingTag) ? openingTag : ''}${template[0]}${text}${
        Tag.isTag(closingTag) ? closingTag : ''
      }`
    );
  }
  //#endregion static methods.

  //#region constructor.
  /**
   * Creates a new `Tagged` instance of given `text` tagged by the provided `Tag`.
   * @param text The text of a generic type variable `Text` to tag.
   * @param openingTag The tag of instance of `Tag` to tag the given `text`.
   * @angularpackage
   */
  constructor(
    text: Text,
    openingTag: OpeningTag<Name, Opening, Closing, AttributeName>,
    closingTag: ClosingTag<Name, Opening, Closing>
  ) {
    super(Tagged.template`${text}${openingTag}${closingTag}`);
    this.#closingTag = closingTag;
    this.#openingTag = openingTag;
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
