import { isInstance, isStringLength } from '@angular-package/type';
// Class.
import { AllowedChars } from '../../lib/allowed-chars.class';
import { Wrap } from './wrap.class';
import { Wrapped } from './wrapped.class';
/**
 * The `Wrapper` defines the wrap in a restricted chars range and uses it to wrap specific text.
 */
export class Wrapper {
  //#region properties.
  //#region static properties.
  //#region static public properties.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'wrapper'` for static `Wrapper`. It can be read by the
   * `typeOf()` function of `@angular-package/type`.
   */
  public static get [Symbol.toStringTag](): 'wrapper' {
    return 'wrapper';
  }
  //#endregion static public properties.

  //#region static private properties.
  /**
   * The private static property of the `AllowedChars` type denotes allowed characters of the wrap. The default allowed characters for the
   * wrap are [ ] ( ) < > { }. The pattern can be set by the static `setAllowedChars()` method and get by the static `getAllowedChars()`
   * method. The pattern is used by the static `defineWrap()`, `setWrap()`, and `wrapText()` methods.
   */
  private static allowedChars = new AllowedChars(/([\[\]\(\)<>{}])/g);

  /**
   * The private static property of the `Wrap` is the default instance of static `Wrapper`. It can be set by the static `setWrap()` method
   * and get by the static `getWrap()` method. By default, it is set to []. The property is the default value for the `wrap` parameter in
   * the `wrapText()` method of the instance.
   */
  private static wrap: Wrap<string> = Wrapper.defineWrap('[]');
  //#endregion static private properties.
  //#endregion static properties.

  //#region instance properties.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'wrapper'` in the `Wrapper` instance. It can be read by the
   * `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): 'wrapper' {
    return 'wrapper';
  }

  //#region instance private properties.
  /**
   * The private property of the `AllowedChars` type denotes the allowed chars for `defineWrap()` and `wrapText()` method.
   */
  #allowedChar: AllowedChars;
  //#endregion instance private properties.
  //#endregion instance properties.
  //#endregion properties.

  //#region static methods.
  /**
   * Defines a new `Wrap` instance of two allowed chars.
   * @param chars Two allowed chars of a generic type variable `Chars` to define a new `Wrap` instance.
   * @returns The return value is a new `Wrap` instance of given two allowed chars.
   */
  public static defineWrap<Chars extends string>(chars: Chars): Wrap<Chars> {
    return new this(this.allowedChars).defineWrap(chars);
  }

  /**
   * Gets the allowed characters of the `AllowedChars` type from the static `Wrapper`. By default it's set to `/([\[\]\(\)<>{}])/g`.
   * The method refers to a private static property `allowedChars` which is the default value for filtering the wrap in the static
   * `defineWrap()`, `setWrap()`, `wrapText()` methods.
   * @returns The return value is an `AllowedChars` pattern of allowed characters.
   */
  public static getAllowedChars(): AllowedChars {
    return this.allowedChars;
  }

  /**
   * Gets an instance of `Wrap` from the static `Wrapper`.
   * @returns The return value is an instance of `Wrap`.
   */
  public static getWrap<Chars extends string>(): Wrap<Chars> {
    return this.wrap as Wrap<Chars>;
  }

  /**
   * The method checks if the value of any type is an instance of the `Wrapper`.
   * @param value The value of any type to test against the instance of `Wrapper`.
   * @returns The return value is a `boolean` type indicating whether the value is an instance of `Wrapper`.
   */
  public static isWrapper(value: any): value is Wrapper {
    return isInstance(value, this);
  }

  /**
   * The method sets the default pattern of allowed characters for static `Wrapper`. The allowed characters refer to a private static
   * `allowedChars` property, which is the default value for filtering the wrap in the static `defineWrap()`, `setWrap()`, `wrapText()`
   * methods.
   * @param allowedChars The allowed characters of the `RegExp` to set.
   * @returns The return value is a static `Wrapper`.
   */
  public static setAllowedChars(allowedChars: RegExp): typeof Wrapper {
    this.allowedChars = new AllowedChars(allowedChars);
    return this;
  }

  /**
   * Sets a new instance of `Wrap` into the static `Wrapper`. The wrap set by this method is used to wrap the text by the static
   * `wrapText()` method and the `wrapText()` method of instance by the `wrap` parameter as the default value for wrapping the text.
   * @param chars The two allowed chars of a `string` type to set with a new instance of `Wrap`. The parameter is filtered by the allowed
   * chars of static `Wrapper` set by the static method `setAllowedChars()`.
   * @returns The return value is a static `Wrapper`.
   */
  public static setWrap(chars: string): typeof Wrapper {
    this.wrap = new this(this.allowedChars).defineWrap(chars);
    return this;
  }

  /**
   * The static method wraps the specified text with a stored `Wrap` instance in the static `Wrapper` or with a given allowed `chars`.
   * @param text The text of a generic type variable `Text` to wrap it with a stored `Wrap` in the static `Wrapper` or provided allowed
   * `chars`.
   * @param chars An optional two allowed chars of the `Wrap` to wrap a given text. If the value is not provided, then stored `Wrap` from
   * the static `Wrapper` is used. The parameter is filtered by the allowed chars of static `Wrapper` set by the static method
   * `setAllowedChars()`.
   * @returns The return value is a new `Wrapped` instance of given `text`.
   */
  public static wrapText<Text extends string, Chars extends string>(
    text: Text,
    chars?: Chars
  ): Wrapped<Text, Chars> {
    return isStringLength(chars, 2)
      ? this.defineWrap(chars).wrapText(text)
      : this.wrap.wrapText(text) as Wrapped<Text, Chars>;
  }
  //#endregion static methods.

  //#region constructor.
  /**
   * Creates a new instance of `Wrapper` with the pattern of allowed chars.
   * @param allowedChars An allowed chars of `RegExp` type to set with a new instance.
   * @returns The return value is a new `Wrapper` instance.
   */
  constructor(allowedChars: RegExp) {
    this.#allowedChar = new AllowedChars(allowedChars);
  }
  //#endregion constructor.

  //#region instance methods.
  /**
   * Defines a new instance of `Wrap` of given allowed chars.
   * @param chars An allowed chars of a generic type variable `Chars` to define a new instance of `Wrap`.
   * @returns The return value is a new instance of `Wrap`of given allowed chars.
   */
  public defineWrap<Chars extends string>(chars: Chars): Wrap<Chars> {
    return new Wrap(new AllowedChars(this.#allowedChar).filterText(chars));
  }

  /**
   * Wraps the specified text with a stored `Wrap` instance in the static `Wrapper` or with a given allowed `chars`.
   * @param text The text of a generic type variable `Text` to wrap.
   * @param chars An optional wrap of two chars to wrap a given `text`.
   * @returns The return value is a new `Wrapped` instance of given `text`.
   */
  public wrapText<Text extends string, Chars extends string>(
    text: Text,
    chars: Chars = Wrapper.wrap.value as Chars
  ): Wrapped<Text, Chars> {
    return this.defineWrap(chars).wrapText(text);
  }
  //#endregion instance methods.
}
