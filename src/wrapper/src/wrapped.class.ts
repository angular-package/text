// @angular-package/type.
import {
  // Function.
  areDefined,
  guardString,
  isDefined,
  isInstance,
  isStringType,
  isTrue,
} from '@angular-package/type';
// Class.
import { Wrap } from './wrap.class';
// Type.
import { WrapClosingChar } from '../type/wrap-closing-char.type';
import { WrapOpeningChar } from '../type/wrap-opening-char.type';
/**
 * The `Wrapped` string object represents the immutable wrapped text.
 */
export class Wrapped<
  Text extends string = string,
  Chars extends string = string
> extends String {
  //#region instance properties.
  //#region instance public properties.
  /**
   * Gets the closing char of the wrap, or if the wrap was not provided, or it was provided but not found in the text returns undefined.
   */
  public get closingChar(): WrapClosingChar<Chars> | undefined {
    return this.#closingChar;
  }

  /**
   * Gets the opening char of the wrap, or if the wrap was not provided, or it was provided but not found in the text returns undefined.
   */
  public get openingChar(): WrapOpeningChar<Chars> | undefined {
    return this.#openingChar;
  }

  /**
   * Gets the text primitive value of a specified object by using an intuitive property name.
   */
  public get text(): Text {
    return this.valueOf();
  }

  /**
   * Gets the text primitive value of a specified object by using a universal property name.
   */
  public get value(): Text {
    return this.valueOf();
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'wrapped'` for an instance of `Wrapped`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): 'wrapped' {
    return 'wrapped';
  }
  //#endregion instance public properties.

  //#region instance private properties.
  /**
   * The closing char of the wrap or `undefined` if not set.
   */
  #closingChar?: WrapOpeningChar<Chars>;

  /**
   * The opening char of the wrap or `undefined` if not set.
   */
  #openingChar?: WrapOpeningChar<Chars>;
  //#endregion instance private properties.
  //#endregion instance properties.

  //#region static methods.
  /**
   * The static method checks whether the provided `value` of any type is an instance of `Wrapped`.
   * @param value The value of any type to test against the `Wrapped` instance.
   * @param chars An optional characters to check if the given `value` contains.
   * @returns The return value is a `boolean` indicating whether the value is the `Wrapped` instance of any or given chars.
   */
  public static isWrapped<Text extends string, Chars extends string = string>(
    value: any,
    chars?: Chars,
  ): value is Wrapped<Text, Chars> {
    return isInstance(value, Wrapped)
      ? isStringType(chars)
        ? chars === `${value.openingChar}${value.closingChar}`
        : true
      : false;
  }
  //#endregion static methods.

  //#region constructor.
  /**
   * Creates a new instance of `Wrapped` with the specified text and optional wrap.
   * @param text The value of a generic type variable `Text` to set with a new instance.
   * @param chars An optional characters of a generic type variable `Chars` or an object of `Wrap` to set with a new instance.
   * @returns The return value is a new instance of `Wrapped` with the primitive value of the provided `text` if set properly, otherwise
   * with an empty `string`.
   */
  constructor(text: Text, chars?: Chars | Wrap<Chars>) {
    super(guardString(text) ? text : '');
    isDefined(chars) && this.#checkWrapped(chars);
  }
  //#endregion constructor.

  //#region instance methods.
  /**
   * Returns an unwrapped text, without the opening, and closing character of the wrap.
   * @returns The return value is a text without the closing and opening char.
   */
public unwrap(): string {
  return this.#isWrapped()
    ? this.text.slice(1, this.text.length - 1)
    : this.text;
}

  /**
   * Gets the primitive value of a specified object.
   * @returns The return value is a generic type variable `Text` if properly defined, or an empty `string`.
   */
  public valueOf(): Text {
    return super.valueOf() as Text;
  }

  //#region instance private methods.
  /**
   * The private method sets the closing and opening char based on provided `chars`.
   * @param chars The value of a generic type variable `Chars` or an instance of `Wrap` to pick from it closing and opening char.
   */
  #checkWrapped(chars: Chars | Wrap<Chars>): void {
    const wrap = Wrap.isWrap(chars) ? chars : new Wrap(chars);
    this.#setClosingChar(wrap).#setOpeningChar(wrap);
  }

  /**
   * The private method sets the `closingChar` if the closing char from the wrapped text is equal to the closing char of the provided
   * `wrap`.
   * @param wrap An instance of `Wrap` to pick a closing char and set it if found in the text.
   * @returns The return value is an instance of `Wrapped`.
   */
  #setClosingChar(wrap: Wrap<Chars>): this {
    this.text.slice(-1) === wrap.closingChar &&
      (this.#closingChar = wrap.closingChar);
    return this;
  }

  /**
   * The private method sets the `openingChar` if the opening char from the wrapped text is equal to the opening char of the provided
   * `wrap`.
   * @param wrap An instance of `Wrap` to pick opening char and set it if found in the text.
   * @returns The return value is an instance of `Wrapped`.
   */
  #setOpeningChar(wrap: Wrap<Chars>): this {
    this.text.slice(0, 1) === wrap?.openingChar &&
      (this.#openingChar = wrap.openingChar);
    return this;
  }

  /**
   * The private method checks if the `closingChar` and `openingChar` properties of an instance are defined, which confirms the text is
   * wrapped.
   * @returns The return value is a `boolean` indicating whether the text is wrapped.
   */
  #isWrapped(): boolean {
    return isTrue(areDefined(this.closingChar, this.openingChar).every());
  }
  //#endregion instance private methods.
  //#endregion instance methods.
}
