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
  //#region instance accessors.
  /**
   * The `get` accessor gets the closing of the wrap by returning the `#closing` property of a specified object.
   * @returns The return value is the wrap closing of a generic type variable `Closing`.
   * @angularpackage
   */
  public get closing(): Closing {
    return this.#closing;
  }

  /**
   * The `get` accessor gets the opening of the wrap by returning the `#opening` property of a specified object.
   * @returns The return value is the wrap opening of a generic type variable `Opening`.
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
   * Returns the wrap, primitive value of a specified `Wrap` object.
   * @returns The return value is the wrap of generic type variables in order `Opening`, `Text`, and `Closing` on the template
   * `${Opening}${Text}${Closing}`.
   * @angularpackage
   */
  public get value(): `${Opening}${Text}${Closing}` {
    return this.valueOf();
  }

  /**
   * The `get` accessor, with the help of `toStringTag`, changes the default tag to `'wrap'` for an instance of `Wrap`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   * @returns The return value is word 'wrap` of a `string`.
   * @angularpackage
   */
  public get [Symbol.toStringTag](): string {
    return 'wrap';
  }
  //#endregion instance accessors.

  //#region instance private properties.
  /**
   * The private property of wrap closing of a generic type variable `Closing`.
   */
  #closing: Closing;

  /**
   * Private property of text of a generic type variable `Text`.
   */
  #text: Text;

  /**
   * The private property of wrap opening of a generic type variable `Opening`.
   */
  #opening: Opening;
  //#endregion instance private properties.

  //#region static methods.
  /**
   * The method checks if the value of any type is the `Wrap` instance of any or given opening and closing.
   * @param value The value of any type to test against the `Wrap` instance of any or given opening and closing.
   * @param opening An optional wrap opening of a generic type variable `Opening` to check if the given `value` contains.
   * @param closing An optional wrap closing of a generic type variable `Closing` to check if the given `value` contains.
   * @param text An optional text of a generic type variable `Text` to check if the given `value` contains.
   * @returns The return value is a `boolean` type indicating whether the value is an instance of `Wrap` of any, or the given opening,
   * closing, and text.
   * @angularpackage
   */
  public static isWrap<
    Opening extends string = string,
    Closing extends string = string,
    Content extends string = ``
  >(
    value: any,
    opening?: Opening,
    closing?: Closing,
    text?: Content
  ): value is Wrap<Opening, Content, Closing> {
    return isInstance(value, this)
      ? (isStringType(opening) ? opening === value.opening : true) &&
          (isStringType(closing) ? closing === value.closing : true) &&
          (isStringType(text) ? text === value.text : true)
      : false;
  }

  //#endregion static methods.

  //#region constructor.
  /**
   * Creates a new `Wrap` instance with the opening and closing chars, and optional text wrapped by them.
   * @param opening The wrap opening of a generic type variable `Opening`, placed before the `text`.
   * @param closing The wrap closing of a generic type variable `Closing`, placed after the `text`.
   * @param text An optional text placed between the `opening` and `closing` on the template `${Opening}${Text}${Closing}`.
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
   * Returns the wrap, primitive value of a specified `Wrap` object. It's an alias of `valueOf()` method.
   * @returns The return value is the wrap of generic type variables in order `Opening`, `Text`, and `Closing` on the template
   * `${Opening}${Text}${Closing}`.
   * @angularpackage
   */
  public get(): `${Opening}${Text}${Closing}` {
    return this.valueOf();
  }

  /**
   * Gets the closing of the wrap by returning the `#closing` property of a specified object.
   * @returns The return value is the wrap closing of a generic type variable `Closing`.
   * @angularpackage
   */
  public getClosing(): Closing {
    return this.#closing;
  }

  /**
   * Gets the opening of the wrap by returning the `#opening` property of a specified object.
   * @returns The return value is the wrap opening of a generic type variable `Opening`.
   * @angularpackage
   */
  public getOpening(): Opening {
    return this.#opening;
  }

  /**
   * Gets the text of the wrap by returning the `#text` property of a specified object, without the opening and closing of the `Wrap`.
   * @returns The return value is the text of a generic type variable `Text`.
   * @angularpackage
   */
  public getText(): Text {
    return this.#text;
  }

  /**
   * Checks whether the primitive value of a specified object has the closing chars or given closing chars.
   * @param closing Optional closing chars of a `string` type to check if the primitive value contains at the end.
   * @returns The return value is a `boolean` indicating whether the primitive value has the closing chars.
   * @angularpackage
   */
  public hasClosing(closing?: string): boolean {
    return isStringType(this.text)
      ? isStringType(closing)
        ? isStringLength(closing, { min: 1 }) &&
          this.toString().slice(-closing.length) === closing
        : isStringLength(this.closing, { min: 1 }) &&
          this.toString().slice(-this.closing.length) === this.closing
      : false;
  }

  /**
   * Checks whether the primitive value of a specified object has the opening chars or given opening chars.
   * @param opening Optional opening chars of a `string` type to check if the primitive value contains at the beginning.
   * @returns The return value is a `boolean` indicating whether the primitive value has the opening chars.
   * @angularpackage
   */
  public hasOpening(opening?: string): boolean {
    return isStringType(this.text)
      ? isStringType(opening)
        ? isStringLength(opening, { min: 1 }) &&
          this.toString().slice(0, opening.length) === opening
        : isStringLength(this.opening, { min: 1 }) &&
          this.toString().slice(0, this.opening.length) === this.opening
      : false;
  }

  /**
   * The method checks whether the text of a specified `Wrap` object is defined, which means it's a string of at least one char.
   * @returns The return value is a `boolean` indicating whether the text is defined.
   * @angularpackage
   */
  public hasText(): boolean {
    return isStringLength(this.text, { min: 1 });
  }

  /**
   * Checks whether the primitive value of a specified object is wrapped, it has text, opening, and closing chars.
   * @param opening Optional opening chars of a `string` type to check if the text is wrapped.
   * @param closing Optional opening chars of a `string` type to check if the text is wrapped.
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
   * `ReplaceClosing` on the template `${Opening}${Text}${ReplaceClosing}`;
   * @angularpackage
   */
  public replaceClosing<ReplaceClosing extends string = ''>(
    closing: ReplaceClosing
  ): `${Opening}${Text}${ReplaceClosing}` {
    return `${this.#opening}${this.#text}${String(closing) as ReplaceClosing}`;
  }

  /**
   * Returns the primitive value with replaced opening chars.
   * @param opening The opening chars of a generic type variable `ReplaceOpening` to replace the opening chars in the primitive value.
   * @returns The return value is the primitive value with replaced opening chars of a generic type variables in order `ReplaceOpening`,
   * `Text` and `Closing` on the template `${ReplaceOpening}${Text}${Closing}`;
   * @angularpackage
   */
  public replaceOpening<ReplaceOpening extends string = ''>(
    opening: ReplaceOpening
  ): `${ReplaceOpening}${Text}${Closing}` {
    return `${String(opening) as ReplaceOpening}${this.#text}${this.#closing}`;
  }

  /**
   * Returns the primitive value with replaced text.
   * @param text The text of a generic type variable `ReplaceText` to replace the text in the primitive value.
   * @returns The return value is the primitive value with replaced text of a generic type variables in order `Opening`, `ReplaceText`
   * and `Closing` on the template `${Opening}${ReplaceText}${Closing}`;
   * @angularpackage
   */
  public replaceText<ReplaceText extends string>(
    text: ReplaceText
  ): `${Opening}${ReplaceText}${Closing}` {
    return `${this.#opening}${String(text) as ReplaceText}${this.#closing}`;
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
