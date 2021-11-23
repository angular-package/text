import {
  // Function.
  guardRegExp,
  isInstance,
  isRegExp,
} from '@angular-package/type';
// Class.
import { AllowedChars } from '../../lib/allowed-chars.class';
import { Wrap } from './wrap.class';
import { Wrapped } from './wrapped.class';
/**
 * The `Wrapper` object represents the immutable wrap consisting of two chars, the opening, and closing to wrap the text.
 */
export class Wrapper {
  //#region properties.
  //#region static properties.
  //#region static public properties.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'wrapper'` for static `Wrapper`. It can be read by the
   * `typeOf()` function of `@angular-package/type`.
   */
  public static get [Symbol.toStringTag](): string {
    return 'wrapper';
  }
  //#endregion static public properties.

  //#region static private properties.
  /**
   * The private static property of the `AllowedChars` type denotes allowed characters of the wrap. The default allowed characters for the
   * wrap are [ ] ( ) < > { }. The pattern can be set by the static `setAllowedChars()` method and get by the static `getAllowedChars()`
   * method. The pattern is used on creating a new instance of `Wrapper` to filter the wrap, so also by the static `define()`, `isWrap()`,
   * `set()`, and `wrapText()` methods.
   */
  private static allowedChars = new AllowedChars(/([\[\]\(\)<>{}])/g);

  private static wrap: Wrap<string> = new Wrapper().defineWrap('[]');
  //#endregion static private properties.

  #allowedChar = Wrapper.allowedChars;
  #wrap = Wrapper.wrap;

  //#region static methods.
  public static defineWrap<Chars extends string>(wrap: Chars): Wrap<Chars> {
    return new this().defineWrap(wrap);
  }

  /**
   * REVIEW: Description.
   * Gets the allowed characters of the `RegExp` set by the static `setAllowedChars()` method. By default it's set to `/[^[]()<>]/g`.
   * The method refers to a private static property `#allowedChars` which is the default value for filtering the wrap in the static
   * `define()`, `set()`, `wrapText()` methods, and on using the operator `new`.
   * @returns The return value is a `RegExp` pattern of allowed characters.
   */
  public static getAllowedChars(): AllowedChars {
    return this.allowedChars;
  }

  public static getWrap<Chars extends string>(): Wrap<Chars> {
    return this.wrap as Wrap<Chars>;
  }

  /**
   * The method checks if the value of any type is an instance of the `Wrapper`.
   * @param value The value of any type to test against the instance of `Wrapper`.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `value` is an instance of `Wrapper`.
   * @returns The return value is a `boolean` type indicating whether the value is an instance of `Wrapper`.
   */
  public static isWrapper(value: any): value is Wrapper {
    return isInstance(value, this);
  }

  /**
   * The method sets the default pattern of allowed characters. The allowed characters refer to a private static `#allowedChars` property,
   * which is the default value for filtering the wrap in the static `define()`, `set()`, `wrapText()` methods, and on using the `new`
   * operator.
   * TODO: AllowedChars .
   * @param allowedChars The allowed characters of the `RegExp` to set.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `allowedChars` is `AllowedChars` type.
   * @returns The return value is a static `Wrapper`.
   */
  public static setAllowedChars(allowedChars: RegExp): typeof Wrapper {
    guardRegExp(allowedChars) &&
      (this.allowedChars = new AllowedChars(allowedChars));
    return this;
  }

  public static setWrap<Chars extends string>(chars: Chars): typeof Wrapper {
    this.wrap = new this().defineWrap(chars);
    return this;
  }

  public static wrapText<Text extends string, Chars extends string>(
    text: Text,
  ): Wrapped<Text, Chars> {
    return this.wrap.wrapText(text) as Wrapped<Text, Chars>;
  }
  //#endregion static methods.

  //#region constructor.
  constructor(allowedChars?: RegExp) {
    isRegExp(allowedChars) &&
      (this.#allowedChar = new AllowedChars(allowedChars));
  }
  //#endregion constructor.

  public defineWrap<Chars extends string>(chars: Chars): Wrap<Chars> {
    return new Wrap(new AllowedChars(this.#allowedChar).filterText(chars));
  }

  public wrapText<Text extends string, Chars extends string>(
    text: Text,
    wrap: Chars = this.#wrap.wrap as Chars
  ): Wrapped<Text, Chars> {
    return this.defineWrap(wrap).wrapText(text);
  }
}
