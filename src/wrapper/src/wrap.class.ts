// @angular-package/type.
import {
  isStringLength,
  isStringType,
  isInstance,
} from '@angular-package/type';
/**
 * The `Wrap` object represents the immutable text wrapped by the opening and closing chars. It is designed to preserve the names of the
 * opening, text and closing.
 */
export class Wrap<
  Opening extends string = string,
  Text extends string = ``,
  Closing extends string = string
> extends String {
  //#region instance public accessors.
  /**
   * The `get` accessor gets the closing of the wrap by returning the `#closing` property of a specified object.
   * @returns The return value is closing of the wrap of a generic type variable `Closing`.
   * @angularpackage
   */
  public get closing(): Closing {
    return this.#closing;
  }

  /**
   * The `get` accessor gets the opening of the wrap by returning the `#opening` property of a specified object.
   * @returns The return value is the opening of the wrap of a generic type variable `Opening`.
   * @angularpackage
   */
  public get opening(): Opening {
    return this.#opening;
  }

  /**
   * The `get` accessor gets the text of the `Wrap` by returning the `#text` property of a specified object.
   * @returns The return value is the text of a generic type variable `Text`.
   * @angularpackage
   */
  public get text(): Text {
    return this.#text;
  }

  /**
   * The `get` accessor, with the help of `toStringTag`, changes the default tag to `'wrap'` for an instance of `Wrap`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   * @returns The return value is the word 'wrap` of a `string`.
   * @angularpackage
   */
  public get [Symbol.toStringTag](): string {
    return 'wrap';
  }
  //#endregion instance public accessors.

  //#region instance private properties.
  /**
   * Private property of the closing chars of a generic type variable `Closing`.
   */
  #closing: Closing;

  /**
   * Private property of text of a generic type variable `Text`.
   */
  #text: Text;

  /**
   * Private property of the opening chars of a generic type variable `Opening`.
   */
  #opening: Opening;
  //#endregion instance private properties.

  //#region static public methods.
  /**
   * Checks whether the text has `closing` chars at the beginning.
   * @param text The text of `string` type, to check whether it contains given `closing` chars.
   * @param closing The closing chars of `string` type to check if a given `text` contains.
   * @returns The return value is a `boolean` indicating whether the `text` contains `closing` chars at the end.
   * @angularpackage
   */
  public static hasClosing(text: string, closing: string): boolean {
    return (
      isStringLength(text, { min: 1 }) &&
      isStringLength(closing, { min: 1 }) &&
      text.slice(-closing.length) === closing
    );
  }

  /**
   * Checks whether the text has `opening` chars at the beginning.
   * @param text The text of `string`, to check whether it contains given `opening` chars.
   * @param opening The opening chars of `string` to check if a given `text` contains.
   * @returns The return value is a `boolean` indicating whether the `text` contains `opening` chars at the beginning.
   * @angularpackage
   */
  public static hasOpening(text: string, opening: string): boolean {
    return (
      isStringLength(text, { min: 1 }) &&
      isStringLength(opening, { min: 1 }) &&
      text.slice(0, opening.length) === opening
    );
  }

  /**
   * The method checks whether the value of any type is the `Wrap` instance of any or given opening and closing chars.
   * @param value The value of any type to test against the `Wrap` instance of any or given opening and closing.
   * @param opening Optional opening chars of a generic type variable `Opening` to check if the given `value` contains.
   * @param closing Optional closing chars of a generic type variable `Closing` to check if the given `value` contains.
   * @param text An optional text of a generic type variable `Text` to check if the given `value` contains.
   * @returns The return value is a `boolean` type indicating whether the value is an instance of `Wrap` of any, or the given opening,
   * closing, and text.
   * @angularpackage
   */
  public static isWrap<
    Opening extends string = string,
    Closing extends string = string,
    Text extends string = ``
  >(
    value: any,
    opening?: Opening,
    closing?: Closing,
    text?: Text
  ): value is Wrap<Opening, Text, Closing> {
    return isInstance(value, this)
      ? (isStringType(opening) ? opening === value.opening : true) &&
          (isStringType(closing) ? closing === value.closing : true) &&
          (isStringType(text) ? text === value.text : true)
      : false;
  }
  //#endregion static public methods.

  //#region constructor.
  /**
   * Creates a new `Wrap` instance of the opening and closing chars and optional text to wrap.
   * @param opening Opening characters of the generic type variable `Opening` placed before the given `text`.
   * @param closing Closing characters of the generic type variable `Closing` placed after the given `text`.
   * @param text An optional text placed between the given `opening` and `closing` chars on the template `${Opening}${Text}${Closing}`.
   * @angularpackage
   */
  constructor(opening: Opening, closing: Closing, text: Text = '' as Text) {
    super(`${opening}${text}${closing}`);
    this.#closing = String(closing) as Closing;
    this.#text = String(text) as Text;
    this.#opening = String(opening) as Opening;
  }
  //#endregion constructor.

  //#region instance public methods.
  /**
   * Gets the closing chars of the wrap by returning the `#closing` property of a specified object.
   * @returns The return value is closing chars of a generic type variable `Closing`.
   * @angularpackage
   */
  public getClosing(): Closing {
    return this.#closing;
  }

  /**
   * Gets the opening chars of the wrap by returning the `#opening` property of a specified object.
   * @returns The return value is opening chars of a generic type variable `Opening`.
   * @angularpackage
   */
  public getOpening(): Opening {
    return this.#opening;
  }

  /**
   * Gets the text of the wrap by returning the `#text` property of a specified object, without the opening and closing chars of the `Wrap`.
   * @returns The return value is the text of a generic type variable `Text`.
   * @angularpackage
   */
  public getText(): Text {
    return this.#text;
  }

  /**
   * Checks whether the primitive value of a specified object has the closing chars or given closing chars. An empty `string` indicates
   * `undefined`.
   * @param closing Optional closing chars of a `string` type to check whether the primitive value contains them at the end.
   * @returns The return value is a `boolean` indicating whether the primitive value has the closing chars.
   * @angularpackage
   */
  public hasClosing(closing?: string): boolean {
    return (
      isStringLength(this.#closing, { min: 1 }) &&
      (isStringType(closing) ? this.#closing === closing : true)
    );
  }

  /**
   * Checks whether the primitive value of a specified object has the opening chars or given opening chars. An empty `string` indicates
   * `undefined`.
   * @param opening Optional opening chars of a `string` type to check if the primitive value contains them at the beginning.
   * @returns The return value is a `boolean` indicating whether the primitive value has the opening chars.
   * @angularpackage
   */
  public hasOpening(opening?: string): boolean {
    return (
      isStringLength(this.#opening, { min: 1 }) &&
      (isStringType(opening) ? this.#opening === opening : true)
    );
  }

  /**
   * The method checks whether the text of a specified `Wrap` object is defined, which means it's a `string` of at least one char and
   * optionally equal to the given `text`.
   * @param text Optional text of `string` type to check whether it's equal to the text of the `Wrap` object.
   * @returns The return value is a `boolean` indicating whether the text is defined and equal to the optionally given text.
   * @angularpackage
   */
  public hasText(text?: string): boolean {
    return (
      isStringLength(this.#text, { min: 1 }) &&
      (isStringType(text) ? this.#text === text : true)
    );
  }

  /**
   * The method checks whether the primitive value of the specified object is wrapped by the opening and closing chars of an instance or
   * given opening and closing chars.
   * @param opening Optional opening chars of a `string` type to check if the text contains them at the beginning.
   * @param closing Optional closing chars of a `string` type to check if the text contains them at the end.
   * @returns The return value is a `boolean` indicating whether the object has both opening and closing chars.
   * @angularpackage
   */
  public isWrapped(
    opening: string = this.opening,
    closing: string = this.closing
  ): boolean {
    return this.hasOpening(opening) && this.hasClosing(closing);
  }

  /**
   * Returns the primitive value with replaced closing chars.
   * @param closing The closing chars of a generic type variable `ReplaceClosing` to replace the closing chars in the primitive value.
   * @returns The return value is the primitive value with replaced closing chars of a generic type variables in order `Opening`, `Text` and
   * `ReplaceClosing` on the template `${Opening}${Text}${ReplaceClosing}`.
   * @angularpackage
   */
  public replaceClosing<ReplaceClosing extends string = ''>(
    closing: ReplaceClosing
  ): `${Opening}${Text}${ReplaceClosing}` {
    return `${this.#opening}${this.#text}${closing}`;
  }

  /**
   * Returns the primitive value with replaced opening chars.
   * @param opening The opening chars of a generic type variable `ReplaceOpening` to replace the opening chars in the primitive value.
   * @returns The return value is the primitive value with replaced opening chars of a generic type variables in order `ReplaceOpening`,
   * `Text` and `Closing` on the template `${ReplaceOpening}${Text}${Closing}`.
   * @angularpackage
   */
  public replaceOpening<ReplaceOpening extends string = ''>(
    opening: ReplaceOpening
  ): `${ReplaceOpening}${Text}${Closing}` {
    return `${opening}${this.#text}${this.#closing}`;
  }

  /**
   * Returns the primitive value with replaced text.
   * @param text The text of a generic type variable `ReplaceText` to replace the text in the primitive value.
   * @returns The return value is the primitive value with replaced text of a generic type variables in order `Opening`, `ReplaceText`
   * and `Closing` on the template `${Opening}${ReplaceText}${Closing}`.
   * @angularpackage
   */
  public replaceText<ReplaceText extends string>(
    text: ReplaceText
  ): `${Opening}${ReplaceText}${Closing}` {
    return `${this.#opening}${text}${this.#closing}`;
  }

  /**
   * Gets the wrap, the primitive value of a specified `Wrap` object.
   * @returns The return value is the wrap of generic type variables in order `Opening`, `Text`, and `Closing` on the template
   * `${Opening}${Text}${Closing}`.
   * @angularpackage
   */
  public toString(): `${Opening}${Text}${Closing}` {
    return super.toString() as `${Opening}${Text}${Closing}`;
  }

  /**
   * Returns the wrap, primitive value of a specified `Wrap` object.
   * @returns The return value is the wrap of generic type variables in order `Opening`, `Text`, and `Closing` on the template
   * `${Opening}${Text}${Closing}`.
   * @angularpackage
   */
  public valueOf(): `${Opening}${Text}${Closing}` {
    return super.valueOf() as `${Opening}${Text}${Closing}`;
  }
  //#endregion instance public methods.
}
