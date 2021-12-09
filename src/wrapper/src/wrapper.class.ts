import { isInstance, isStringType } from '@angular-package/type';
// Class.
import { AllowedChars } from '../../lib/allowed-chars.class';
import { Wrap } from './wrap.class';
import { Wrapped } from './wrapped.class';
/**
 * The `Wrapper` is an extension of the `Wrap` object, which means it represents the immutable wrap of the opening and closing with the
 * additional main ability to use it to wrap string. It can also define the wrap in a restricted chars range.
 */
export class Wrapper<
  Opening extends string = string,
  Closing extends string = string
> extends Wrap<Opening, Closing> {
  //#region properties.
  //#region static properties.
  //#region static private properties.
  /**
   * The private static property of the `AllowedChars` type denotes allowed characters of the wrap. The default allowed characters for the
   * wrap are [ ] ( ) < > { }. The pattern can be set by the static `setAllowedChars()` method and get by the static `getAllowedChars()`
   * method. The pattern is used by the static `define()`, `setWrap()`, and `wrapText()` methods.
   */
  private static allowedChars = new AllowedChars(/([\[\]\(\)<>{}])/g);

  /**
   * The private static property of the `Wrap` is the default instance of static `Wrapper`. It can be set by the static `setWrap()` method
   * and get by the static `getWrap()` method. By default, it is set to []. The property is the default value for the `wrap` parameter in
   * the `wrapText()` method of the instance.
   */
  private static wrap: Wrap<string, string> = Wrapper.define('[', ']');
  //#endregion static private properties.
  //#endregion static properties.

  //#region instance properties.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'wrapper'` in the `Wrapper` instance. It can be read by the
   * `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'wrapper';
  }
  //#endregion instance properties.
  //#endregion properties.

  //#region static methods.
  /**
   * Defines a new `Wrapper` instance consisting of the allowed opening and closing.
   * @param opening The allowed opening of the wrap of a generic type variable `Opening`.
   * @param closing The allowed closing of the wrap of a generic type variable `Closing`.
   * @returns The return value is a new `Wrapper` instance of given opening and closing.
   * @angularpackage
   */
  public static define<Opening extends string, Closing extends string>(
    opening: Opening,
    closing: Closing
  ): Wrapper<Opening, Closing> {
    return new this(
      this.allowedChars.filterText(opening),
      this.allowedChars.filterText(closing)
    );
  }

  /**
   * Gets the allowed characters of the `AllowedChars` type from the static `Wrapper`. By default it's set to `/([\[\]\(\)<>{}])/g`.
   * The method refers to a private static property `allowedChars` which is the default value for filtering the wrap in the static
   * `define()`, `setWrap()` methods.
   * @returns The return value is an `AllowedChars` pattern of allowed characters.
   * @angularpackage
   */
  public static getAllowedChars(): AllowedChars {
    return this.allowedChars;
  }

  /**
   * Gets an instance of `Wrap` stored in the static `Wrapper`.
   * @returns The return value is an instance of `Wrap`.
   * @angularpackage
   */
  public static getWrap<Opening extends string, Closing extends string>(): Wrap<
    Opening,
    Closing
  > {
    return this.wrap as Wrap<Opening, Closing>;
  }

  /**
   * The method checks if the value of any type is an instance of the `Wrapper`.
   * @param value The value of any type to test against the instance of `Wrapper`.
   * @param opening An optional wrap opening to check if the given value contains.
   * @param closing An optional wrap closing to check if the given value contains.
   * @returns The return value is a `boolean` type indicating whether the value is an instance of `Wrapper`.
   * @angularpackage
   */
  public static isWrapper<Opening extends string, Closing extends string>(
    value: any,
    opening?: Opening,
    closing?: Closing
  ): value is Wrapper {
    return isInstance(value, this) && super.isWrap(value, opening, closing);
  }

  /**
   * The method sets the default pattern of allowed characters for static `Wrapper`. The allowed characters refer to a private static
   * `allowedChars` property, which is the default value for filtering the wrap in the static `define()`, `setWrap()` methods.
   * @param allowedChars The allowed characters of the `RegExp` to set.
   * @returns The return value is a static `Wrapper`.
   * @angularpackage
   */
  public static setAllowedChars(allowedChars: RegExp): typeof Wrapper {
    this.allowedChars = new AllowedChars(allowedChars);
    return this;
  }

  /**
   * Sets a new instance of `Wrap` into the static `Wrapper`. The wrap set by this method is used to wrap the text by the static
   * `wrapText()` method for wrapping the text.
   * @param opening The wrap opening of a generic type variable `Opening`.
   * @param closing The wrap closing of a generic type variable `Closing`.
   * @returns The return value is a static `Wrapper`.
   * @angularpackage
   */
  public static setWrap<Opening extends string, Closing extends string>(
    opening: Opening,
    closing: Closing
  ): typeof Wrapper {
    this.wrap = new Wrap(
      this.allowedChars.filterText(opening),
      this.allowedChars.filterText(closing)
    );
    return this;
  }

  /**
   * The static method wraps the specified text with a stored `Wrap` instance in the static `Wrapper` or with a given opening or closing.
   * @param text The text of a generic type variable `Text` to wrap.
   * @param opening An optional wrap opening of a generic type variable `Opening` to wrap the given `text`. If the `opening` is not
   * provided, then the opening from the `Wrap` instance of static `Wrapper` is used.
   * @param closing An optional wrap closing of a generic type variable `Closing` to wrap the given `text`. If the `closing` is not
   * provided, then the closing from the `Wrap` instance of static `Wrapper` is used.
   * @returns The return value is a new `Wrapped` instance of given `text`.
   * @angularpackage
   */
  public static wrapText<
    Text extends string,
    Opening extends string,
    Closing extends string
  >(
    text: Text,
    opening: Opening = this.wrap.opening as Opening,
    closing: Closing = this.wrap.closing as Closing
  ): Wrapped<Text, Opening, Closing> {
    return new this(opening, closing).wrapText(text);
  }
  //#endregion static methods.

  //#region constructor.
  /**
   * Creates a new instance of `Wrapper` with the opening and closing.
   * @param opening The wrap opening of a generic type variable `Opening`.
   * @param closing The wrap closing of a generic type variable `Closing`.
   * @returns The return value is a new `Wrapper` instance.
   * @angularpackage
   */
  constructor(opening: Opening, closing: Closing) {
    super(opening, closing);
  }
  //#endregion constructor.

  //#region instance methods.
  /**
   * The method checks if the provided `text` is wrapped with the wrap of the specified `Wrapper` object.
   * @param text The `text` of a generic type variable `Text` to check whether it is wrapped.
   * @returns The return value is a `boolean` indicating whether the provided `text` is wrapped.
   * @angularpackage
   */
  public isTextWrapped<Text extends string>(text: Text): text is Text {
    return this.textHasClosing(text) && this.textHasOpening(text);
  }

  /**
   * Checks if the provided `text` has closing of the specified `Wrapper` object.
   * @param text The text to test against the existence of the closing.
   * @returns The return value is a `boolean` indicating whether the given `text` has the closing of the wrap.
   * @angularpackage
   */
  public textHasClosing<Text extends string>(text: Text): text is Text {
    return (
      isStringType(text) && text.slice(-this.closing.length) === this.closing
    );
  }

  /**
   * Checks if the provided `text` has the opening of the specified `Wrapper` object.
   * @param text The text to test against the existence of the opening.
   * @returns The return value is a `boolean` indicating whether the given `text` has the opening of the wrap.
   * @angularpackage
   */
  public textHasOpening<Text extends string>(text: Text): text is Text {
    return (
      isStringType(text) && text.slice(0, this.opening.length) === this.opening
    );
  }

  /**
   * Returns the unwrapped, text from the opening and closing of the wrapper.
   * @param text The text to unwrap.
   * @returns The return value is the unwrapped text of a `string` if the opening or closing is found or the given text.
   * @angularpackage
   */
  public unwrapText(text: string): string {
    this.textHasClosing(text) &&
      (text = text.valueOf().slice(0, text.length - this.closing.length));
    this.textHasOpening(text) &&
      (text = text.valueOf().slice(this.opening.length));
    return text;
  }

  /**
   * Wraps specific text with the wrap, the opening, and closing of the `Wrapper` object.
   * @param text The text of a generic type variable `Text`, to be wrapped.
   * @returns The return value is a new instance of the `Wrapped` type consisting of the wrapped text.
   * @angularpackage
   */
  public wrapText<Text extends string>(
    text: Text
  ): Wrapped<Text, Opening, Closing> {
    return new Wrapped(text, this);
  }
  //#endregion instance methods.
}
