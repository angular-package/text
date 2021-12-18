import { guardString, isString } from '@angular-package/type';
// Class.
import { Attribute } from '../../lib/attribute.class';
import { Tag } from './tag.class';
// Type.
import { OpeningTag } from './opening-tag.class';
import { ClosingTag } from './closing-tag.class';
import { Tagged } from './tagged.class';
/**
 * The `TagExtension` string object represents the immutable tag of the opening and closing.
 */
export abstract class TagExtension<
  Name extends string,
  Opening extends string = string,
  Closing extends string = string,
  AttributeName extends string = string
> extends Tag<Name, Opening, Closing, AttributeName> {
  //#region instance public accessors.
  /**
   * The `get` accessor gets the closing tag.
   * @returns The return value is a tag closing of a generic type `ClosingTag`.
   * @angularpackage
   */
  public get closingTag(): ClosingTag<Name, Opening, Closing> {
    return this.#closingTag;
  }

  /**
   * The `get` accessor gets the opening tag with optional attributes.
   * @returns The return value is an opening tag of a generic type `OpeningTag`.
   * @angularpackage
   */
  public get openingTag(): OpeningTag<Name, Opening, Closing, AttributeName> {
    return this.#openingTag;
  }
  //#endregion instance public accessors.

  //#region instance private properties.
  #closingTag: ClosingTag<Name, Opening, Closing>;
  #openingTag: OpeningTag<Name, Opening, Closing, AttributeName>;
  //#endregion instance private properties.

  //#region constructor.
  constructor(
    name: Name,
    opening: Opening,
    closing: Closing,
    ...attributes: [AttributeName, string][]
  ) {
    super(name, opening, closing);
    // Set opening tag.
    this.#openingTag = new OpeningTag(name, opening, closing, ...attributes);
    // Set closing tag.
    this.#closingTag = new ClosingTag(name, opening, closing);
  }
  //#endregion constructor.

  //#region instance methods.
  /**
   *
   * @param name
   * @returns
   */
  public getAttribute<AttrName extends AttributeName>(
    name: AttrName
  ): Attribute<AttrName> | undefined {
    return this.#openingTag.getAttribute(name);
  }

  /**
   * Gets the closing tag of a specified `Tag` object.
   * @returns The return value is the closing tag of a generic type `ClosingTag`.
   * @angularpackage
   */
  public getClosingTag(): ClosingTag<Name, Opening, Closing> {
    return this.#closingTag;
  }

  /**
   * Gets the opening tag with optional attributes of the specified `Tag` object.
   * @returns The return value is the opening tag of a generic type `OpeningTag`.
   * @angularpackage
   */
  public getOpeningTag(): OpeningTag<Name, Opening, Closing> {
    return this.#openingTag;
  }

  /**
   * The method replaces the closing tag of a specified `Tag` object with the provided `replaceValue` in the given `text` if both values are
   * strings.
   * ! The return type of a generic type variable `Text` returns the text with not replaced tags.
   * @param text The text in which to replace the closing tag of a specified object with a given `replaceValue`.
   * @param replaceValue The value to replace the closing tag of a specified object in the given `text`.
   * @returns The return value is the given `text` of a generic type variable `Text` with a replaced tag if both the `text` and
   * `replaceValue` are strings. If `replaceValue` is not a `string` returns not replaced `text`, and if both the `text` and `replaceValue`
   * are not strings returns an empty `string`.
   * @angularpackage
   */
  public replaceClosingTag<Text extends string>(
    text: Text,
    replaceValue: string
  ): Text {
    return guardString(text)
      ? isString(replaceValue)
        ? // ? (text.split(this.closingTag.value).join(replaceValue) as Text)
          this.#closingTag.replaceTag(text, replaceValue)
        : text
      : ('' as Text);
  }

  /**
   * The method replaces the opening tag of a specified `Tag` object with the provided `replaceValue` in the given `text` if both values are
   * strings.
   * ! The return type of a generic type variable Text returns the text with not replaced tags.
   * @param text The text of a generic type variable `Text` in which to replace the opening tag of a specified object, with a given
   * `replaceValue`.
   * @param replaceValue The value of a `string` type to replace the opening tag of a specified object in the given `text`.
   * @returns The return value is the given `text` of a generic type variable `Text` with a replaced tag if both the `text` and
   * `replaceValue` are strings. If `replaceValue` is not a `string` returns not replaced `text`, and if both the `text` and `replaceValue`
   * are not strings returns an empty `string`.
   * @angularpackage
   */
  public replaceOpeningTag<Text extends string>(
    text: Text,
    replaceValue: string
  ): Text {
    return guardString(text)
      ? isString(replaceValue)
        ? // ? (text.split(this.openingTag.value).join(replaceValue) as Text)
          this.#openingTag.replaceTag(text, replaceValue)
        : text
      : ('' as Text);
  }

  /**
   * Returns the `Tagged` object of the provided text, tagged with the opening and closing tag.
   * @param text The text of a generic type variable `Text`, to tag with the opening and closing tag.
   * @returns The return value is a new `Tagged` instance with a tagged `text`.
   * @angularpackage
   */
  public tagText<Text extends string>(
    text: Text
  ): Tagged<Text, Name, Opening, Closing, AttributeName> {
    return new Tagged(text, this.#openingTag, this.#closingTag);
  }

  /**
   * Checks whether the text has a closing tag of a specified `Tag` object at the end of the text.
   * @param text The text of a generic type variable `Text` to check whether it contains a closing tag.
   * @returns The return value is a `boolean` indicating whether the given `text` has a closing tag.
   * @angularpackage
   */
  public textHasClosingTag<Text extends string>(text: Text): text is Text {
    return (
      this.#closingTag.textHasTag(text) &&
      text.slice(-this.closingTag.length) === this.closingTag.value
    );
  }

  /**
   * Checks whether a text has an opening tag of a specified `Tag` object at the beginning of the text.
   * @param text The text of a generic type variable `Text` to check whether it contains an opening tag.
   * @returns The return value is a `boolean` indicating whether the given `text` has an opening tag.
   * @angularpackage
   */
  public textHasOpeningTag<Text extends string>(text: Text): text is Text {
    return (
      this.#openingTag.textHasTag(text) &&
      text.slice(0, this.openingTag.length) === this.openingTag.value
    );
  }

  /**
   * Returns the untagged text, without the closing and opening tag of a specified `Tag` object.
   * @param text The text of a `string` type to untag.
   * @returns The return value is the text of a string type untagged from the opening and closing tag if tags are found, or the text.
   * @angularpackage
   */
  public untagText(text: string): string {
    this.textHasClosingTag(text) &&
      (text = text.valueOf().slice(0, text.length - this.closingTag.length));
    this.textHasOpeningTag(text) &&
      (text = text.valueOf().slice(this.openingTag.length));
    return text;
  }
  //#endregion methods.
}
