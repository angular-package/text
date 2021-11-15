import {
  // Type.
  ResultCallback,
  StringOfLength,
  // Function.
  guardFunction,
  guardRegExp,
  guardString,
  guardStringLength,
  isInstance,
  isString,
  isStringLength,
  isUndefined,
} from '@angular-package/type';
// Class.
import { Wrapped } from './wrapped.class';
// Type.
import { ClosingChar } from '../../type/closing-char.type';
import { OpeningChar } from '../../type/opening-char.type';
import { Wrap } from '../type/wrap.type';
/**
 * The `Wrapper` object represents the immutable wrap consisting of two chars, the opening, and closing to wrap the text.
 */
export class Wrapper<Chars extends string> extends String {
  //#region properties.
  //#region static properties.
  //#region static public properties.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'wrapper'` for static `Wrapper`. It can be read by the
   * `typeOf()` function of `@angular-package/type`.
   */
  public static get [Symbol.toStringTag](): string {
    return this.#toStringTag;
  }
  //#endregion static public properties.

  //#region static private properties.
  static #allowedChars = /[^\[\]\(\)<>]/g;
  static #wrapper: Wrapper<string> = new Wrapper('[]');

  /**
   * The name for the `toStringTag` of `Symbol`.
   */
  static #toStringTag = 'wrapper';
  //#endregion static private properties.
  //#endregion static properties.

  //#region instance properties.
  /**
   * Gets the closing allowed char of the wrap.
   */
  public get closingChar(): ClosingChar<Chars[1]> {
    return this.wrap.substr(-1, 1);
  }

  /**
   * Gets the opening allowed char of the wrap.
   */
  public get openingChar(): OpeningChar<Chars[0]> {
    return this.wrap.substr(0, 1);
  }

  /**
   * Gets the wrap consists of two allowed chars by using the intuitive property name.
   */
  public get wrap(): Wrap<Chars> {
    return this.value;
  }

  /**
   * Gets the wrap consists of two allowed chars.
   */
  public get value(): Wrap<Chars> {
    return super.valueOf() as Wrap<Chars>;
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'wrapper'` for an instance of `Wrapper`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return Wrapper.#toStringTag;
  }
  //#endregion instance properties.

  //#endregion properties.

  //#region static methods.
  //#region static public methods.
  /**
   * Defines the new instance of `Wrapper` with the primitive value.
   * @param wrap The value of the generic type `Wrap` to set.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `wrap` is a string type of two chars after filtering by allowed chars.
   * @returns The return value is a new `Wrapper` with the primitive value of the provided `wrap`.
   */
  public static define<Chars extends string>(
    wrap: Wrap<Chars>,
    callback?: ResultCallback<Wrap<Chars>>
  ): Wrapper<Chars> {
    return new this(wrap, this.#allowedChars, callback);
  }

  /**
   * Gets the instance of the `Wrapper` that is set by the static `set()` method from the static `Wrapper`. The wrapper got by this method
   * is used as the default value on creating the `Wrapper` with the `new` operator, if parameter `wrap` is not provided.
   * @returns The return value is an instance of the `Wrapper`.
   */
  public static get<Chars extends string>(): Wrapper<Chars> {
    return this.#wrapper as Wrapper<Chars>;
  }

  /**
   * Gets the allowed characters of the `RegExp` set by the static `setAllowedChars()` method. By default it's set to `/[^[]()<>]/g`. The
   * allowed characters are used as the default value for filtering the wrap in the static `define()`, `set()`, `wrapText()` methods and on
   * using the operator `new`.
   * @returns The return value is a `RegExp` pattern of allowed characters.
   */
  public static getAllowedChars(): RegExp {
    return this.#allowedChars;
  }

  /**
   * The `isWrap()` method checks if the value of any type is a `string` of the two allowed characters. The allowed characters by default
   * are those set by the static `setAllowedChars()` method.
   * @param value The value of any type to test against a `string` type of the two allowed characters.
   * @param allowedChars Optional allowed characters of the `RegExp` type to filter the provided `value`. By default, it uses allowed
   * characters from the static `Wrapper`.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `value` is a `string` type of the two allowed characters.
   * @returns The return value is a `boolean` type indicating whether the value is a `string` type of the two allowed characters.
   */
  public static isWrap<Chars extends string>(
    value: any,
    allowedChars?: RegExp,
    callback?: ResultCallback<any>
  ): value is Wrap<Chars> {
    return isStringLength(this.#filterWrap(value, allowedChars), 2, callback);
  }

  /**
   * The method checks if the value of any type is an instance of the `Wrapper`.
   * @param value The value of any type to test against the instance of `Wrapper`.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `value` is an instance of `Wrapper`.
   * @returns The return value is a `boolean` type indicating whether the value is an instance of `Wrapper`.
   */
  public static isWrapper<Chars extends string>(
    value: any,
    callback?: ResultCallback<any>
  ): value is Wrapper<Chars> {
    return isInstance(value, this, callback);
  }

  /**
   * The method sets a new instance of `Wrapper` into the static `Wrapper` string object and it is used as the default value in the static
   * `define()` and `wrapText()` methods and on creating the `Wrapper` with the `new` operator, if parameter `wrap` is not provided.
   * @param wrap The value of the two character string type to set a new instance of `Wrapper`.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `wrap` is a two-character string type.
   * @returns The return value is a static `Wrapper`.
   */
  public static set<Chars extends string>(
    wrap: Wrap<Chars>,
    callback?: ResultCallback<Wrap<Chars>>
  ): typeof Wrapper {
    this.#wrapper = new this(wrap, this.#allowedChars, callback);
    return this;
  }

  /**
   * The method sets the default pattern of allowed characters that are used to filter the wrap. The allowed characters are used as the
   * default value for filtering the wrap in the static `define()`, `set()`, `wrapText()` methods and on using the operator `new`.
   * @param allowedChars The allowed characters of a generic type variable `AllowedChars` to set as the default filter of the wrap.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `allowedChars` is `RegExp` type.
   * @returns The return value is a static `Wrapper`.
   */
  public static setAllowedChars<AllowedChars extends RegExp>(
    allowedChars: AllowedChars,
    callback?: ResultCallback<AllowedChars>
  ): typeof Wrapper {
    guardRegExp(allowedChars, callback) && (this.#allowedChars = allowedChars);
    return this;
  }

  /**
   * The `wrapText()` static method wraps the specified `text` with the wrap of two allowed characters. By default the text is wrapped by
   * the instance of `Wrapper` set by the static `set()` method.
   * @param text The text of a generic type variable `Text` to wrap it with the provided `wrap`.
   * @param wrap An optional wrap of the `Wrap` type to wrap a given `text`.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `text` is a `string` type.
   * @returns The return value is a new instance of `Wrapped` if the given text is a `string`, otherwise `undefined`.
   */
  public static wrapText<Text extends string, Chars extends string>(
    text: Text,
    wrap?: Wrap<Chars>,
    callback?: ResultCallback<Text>
  ): Wrapped<Text> | undefined {
    return new this(wrap).wrapText(text, callback);
  }
  //#endregion static public methods.

  //#region static private methods.
  /**
   *
   * @param wrap
   * @param allowedChars
   * @param callback
   * @returns
   */
  static #defineWrap<Chars extends string, AllowedChars extends RegExp>(
    wrap?: Wrap<Chars>,
    allowedChars?: AllowedChars,
    callback?: ResultCallback<Wrap<Chars>>
  ): Wrap<Chars> {
    return this.isWrap(wrap, allowedChars, callback)
      ? wrap
      : (this.#wrapper.wrap as Wrap<Chars>);
  }

  /**
   *
   * @param wrap
   * @param allowedChars
   * @returns
   */
  static #filterWrap<Chars extends string, AllowedChars extends RegExp>(
    wrap: Wrap<Chars>,
    allowedChars: AllowedChars = this.#allowedChars as AllowedChars
  ): Wrap<Chars> {
    return (
      isString(wrap) ? wrap.replace(allowedChars, '') : ''
    ) as Wrap<Chars>;
  }
  //#endregion static private methods.
  //#endregion static methods.

  //#region constructor.
  /**
   * Creates a new instance of the `Wrapper` to wrap the specified text by using the wrap consisting of two allowed chars.
   * @param wrap The value of a two char `Wrap` type as text wrap.
   * @param allowedChars The allowed chars of the `RegExp` type of the given wrap.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `wrap` is a string of two allowed chars.
   */
  constructor(
    wrap?: Wrap<Chars>,
    allowedChars?: RegExp,
    callback?: ResultCallback<Wrap<Chars>>
  ) {
    super(Wrapper.#defineWrap(wrap, allowedChars, callback));
  }
  //#endregion constructor.

  //#region instance public methods.

  /**
   * Gets the closing char of the wrap.
   * @returns The return value is a string second character of the wrap.
   */
  public getClosingChar(): ClosingChar<Chars[1]> {
    return this.closingChar;
  }

  /**
   * Gets the opening char of the wrap.
   * @returns The return value is a string first character of the wrap.
   */
  public getOpeningChar(): OpeningChar<Chars[0]> {
    return this.openingChar;
  }

  /**
   * Gets the wrap consists of two chars.
   * @returns The return value is a string consists of two allowed chars.
   */
  public get(): Wrap<Chars> {
    return this.valueOf();
  }

  /**
   * Wraps the specified text with the wrap.
   * @param text The text of a generic type variable `Text` to be wrapped.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `text` is a string type.
   * @returns The return value is a new instance of the `Wrapped` type consisting of provided wrapped text.
   */
  public wrapText<Text extends string>(
    text: Text,
    callback?: ResultCallback<Text>
  ): Wrapped<Text, Chars> | undefined {
    return guardString(text, callback)
      ? new Wrapped(this.#wrapText(text), this, callback)
      : undefined;
  }

  /**
   * Returns the wrap, primitive value of the specified `Wrapper` object.
   * @returns The return value is a string type consists of two allowed chars.
   */
  public valueOf(): Wrap<Chars> {
    return super.valueOf() as Wrap<Chars>;
  }

  //#region instance private methods.
  #wrapText<Text extends string>(text: Text): Text {
    return `${this.openingChar}${text}${this.closingChar}` as Text;
  }
  //#endregion instance private methods.
  //#endregion instance methods.
}

// Set the wrapper.
Wrapper.set('<>', (result, value) => {
  console.log(result, value);
  return result;
});

// Returns Wrapped {'<Lorem Ipsum is simply dummy text of the printing and typesetting industry. >'}
Wrapper.wrapText(
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
);
