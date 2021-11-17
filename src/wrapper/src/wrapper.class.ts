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
import { WrapClosingChar } from '../type/wrap-closing-char.type';
import { WrapOpeningChar } from '../type/wrap-opening-char.type';
import { Wrap } from '../type/wrap.type';
import { typeOf } from '@angular-package/type';
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
  /**
   * The private static property of the `RegExp` type denotes allowed characters of the wrap. The default allowed characters for the wrap
   * are [ ] ( ) < > { }. The pattern can be set by the static `setAllowedChars()` method and get by the static `getAllowedChars()`
   * method. The pattern is used on creating a new instance of `Wrapper` to filter the wrap, so also by the static `define()`, `isWrap()`,
   * `set()`, and `wrapText()` methods.
   */
  static #allowedChars = /[^\[\]\(\)<>{}]/g;

  /**
   * The private static property of the `Wrapper` is the default instance of static `Wrapper`. It can be set by the static `set()` method
   * with the primitive value of `Wrap` type and get by the static `get()` method.
   */
  static #wrapper: Wrapper<string> = new Wrapper('[]');

  /**
   * The name for the `toStringTag` of `Symbol` gives the possibility to detect the `Wrapper` object by using the `typeOf()` function of
   * package type.
   */
  static readonly #toStringTag = 'wrapper';
  //#endregion static private properties.
  //#endregion static properties.

  //#region instance properties.
  /**
   * Gets the closing allowed char of the wrap.
   */
  public get closingChar(): WrapClosingChar<Chars> {
    return this.wrap.substr(-1, 1) as Chars;
  }

  /**
   * Gets the opening allowed char of the wrap.
   */
  public get openingChar(): WrapOpeningChar<Chars> {
    return this.wrap.substr(0, 1);
  }

  /**
   * Gets the wrap consists of two allowed characters by using the intuitive property name.
   */
  public get wrap(): Wrap<Chars> {
    return this.value;
  }

  /**
   * Gets the wrap consists of two allowed characters.
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
   * Defines a new instance of `Wrapper` with the primitive value. The provided `wrap` is filtered by the default allowed chars of the
   * static `#allowedChars`.
   * @param wrap The wrap of a generic type `Wrap` to define a new instance of `Wrapper`.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `wrap` is a string type of two allowed chars.
   * @returns The return value is a new `Wrapper` with the primitive value of the provided `wrap`.
   */
  public static define<Chars extends string>(
    wrap: Wrap<Chars>,
    callback?: ResultCallback<Wrap<Chars>>
  ): Wrapper<Chars> {
    return new this(wrap, this.#allowedChars, callback);
  }

  /**
   * Gets an instance of `Wrapper` that is set by static `set()` method. The method refers to a private static `#wrapper` property, which is
   * the default value on creating a new instance of `Wrapper` with a `new` operator, if parameter `wrap` is not provided and in static
   * `wrapText()` method to wrap the text.
   * @returns The return value is an instance of the `Wrapper`.
   */
  public static get<Chars extends string>(): Wrapper<Chars> {
    return this.#wrapper as Wrapper<Chars>;
  }

  /**
   * Gets the allowed characters of the `RegExp` set by the static `setAllowedChars()` method. By default it's set to `/[^[]()<>]/g`. The
   * method refers to a private static property `#allowedChars` which is the default value for filtering the wrap in the static `define()`,
   * `set()`, `wrapText()` methods, and on using the operator `new`.
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
   * The method sets a new instance of `Wrapper` into the static `Wrapper` and it is used as the default value in the static `define()`
   * and `wrapText()` methods and on creating the `Wrapper` with the `new` operator, if parameter `wrap` is not provided.
   * @param wrap The wrap of the generic type `Wrap` to set a new instance of `Wrapper`.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `wrap` is a two allowed characters `string` type.
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
   * The method sets the default pattern of allowed characters. The allowed characters refer to a private static `#allowedChars` property,
   * which is the default value for filtering the wrap in the static `define()`, `set()`, `wrapText()` methods, and on using the `new`
   * operator.
   * @param allowedChars The allowed characters of the `RegExp` to set.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `allowedChars` is `RegExp` type.
   * @returns The return value is a static `Wrapper`.
   */
  public static setAllowedChars(
    allowedChars: RegExp,
    callback?: ResultCallback<RegExp>
  ): typeof Wrapper {
    guardRegExp(allowedChars, callback) && (this.#allowedChars = allowedChars);
    return this;
  }

  /**
   * The `wrapText()` static method wraps the specified `text` with the wrap of two allowed characters. To wrap the text method creates a
   * new instance of `Wrapper`, which means if the wrap parameter isn't provided, given `text` is wrapped by the default `wrap` from an
   * instance of `Wrapper` set by the static `set()` method.
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
   * The private static method `#defineWrap()` defines wrap with a given `wrap` parameter by checking it against two allowed chars from the
   * `allowedChars` parameter. This method is used only by the `constructor()`.
   * @param wrap An optional wrap of a generic type Wrap, to be defined.
   * @param allowedChars Optional allowed characters of the `RegExp` type to filter given `wrap`. By default, it uses allowed characters of
   * the static `Wrapper`.
   * @param callback An optional callback function of the `ResultCallback` type to handle the check result, whether the provided `wrap` is a
   * two allowed character `string` type.
   * @returns The return value is a string of two allowed chars, or undefined.
   */
  static #defineWrap<Chars extends string>(
    wrap?: Wrap<Chars>,
    allowedChars?: RegExp,
    callback?: ResultCallback<Wrap<Chars>>
  ): Wrap<Chars> {
    return isUndefined(wrap)
      ? (this.#wrapper.wrap as Wrap<Chars>)
      : this.isWrap(wrap, allowedChars, callback)
      ? wrap
      : ('' as Wrap<Chars>);
  }

  /**
   * The private static `#filterWrap()` method replaces wrap with allowed chars. This method is used by the static `isWrap()` method.
   * @param wrap The wrap of a generic type `Wrap` to be filtered with a given `allowedChars` parameter.
   * @param allowedChars Optional allowed characters of the `RegExp` type to filter a given `wrap`. By default, it uses allowed characters
   * of the static `Wrapper`.
   * @returns The return value is the filtered wrap or if the provided `wrap` is not a `string` and provided `allowedChars` is not a regular
   * expression, an empty string.
   */
  static #filterWrap<Chars extends string>(
    wrap: Wrap<Chars>,
    allowedChars: RegExp = this.#allowedChars
  ): Wrap<Chars> {
    return (
      guardString(wrap) && guardRegExp(allowedChars)
        ? wrap.replace(allowedChars, '')
        : ''
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
   * Gets the closing char of the wrap by returning the `closingChar` property of the specified object.
   * @returns The return value is a string second character of the wrap.
   */
  public getClosingChar(): WrapClosingChar<Chars> {
    return this.closingChar;
  }

  /**
   * Gets the opening char of the wrap by returning the `openingChar` property of the specified object.
   * @returns The return value is a string first character of the wrap.
   */
  public getOpeningChar(): WrapOpeningChar<Chars> {
    return this.openingChar;
  }

  /**
   * Gets the wrap consists of two characters by using an intuitive method name.
   * @returns The return value is a generic type `Wrap` consisting of two characters.
   */
  public getWrap(): Wrap<Chars> {
    return this.valueOf();
  }

  /**
   * Wraps specified text with the wrap, the opening and closing characters of the specified object.
   * @param text The text of a generic type variable `Text` to be wrapped.
   * @param callback An optional callback function of the `ResultCallback` type to handle the check result, whether the provided
   * `text` is a string type.
   * @returns The return value is a new instance of the `Wrapped` type consisting of the wrapped text.
   */
  public wrapText<Text extends string>(
    text: Text,
    callback?: ResultCallback<Text>
  ): Wrapped<Text, Chars> | undefined {
    return guardString(text, callback)
      ? new Wrapped(
          `${this.openingChar}${text}${this.closingChar}` as Text,
          this,
          callback
        )
      : undefined;
  }

  /**
   * Returns the wrap, primitive value of the specified `Wrapper` object.
   * @returns The return value is a generic type `Wrap` consisting of two allowed chars.
   */
  public valueOf(): Wrap<Chars> {
    return super.valueOf() as Wrap<Chars>;
  }
  //#endregion instance methods.
}
