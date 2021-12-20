import { isInstance, isStringType } from '@angular-package/type';
// Class.
import { Wrap } from './wrap.class';
/**
 * The `Wrapper` is an extension of the `Wrap` object, which means it represents the immutable wrap of the opening and closing with the
 * additional main ability to use it to wrap strings.
 */
export class Wrapper<
  Opening extends string = string,
  Closing extends string = string
> extends Wrap<Opening, Closing> {
  //#region instance accessors.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'wrapper'` in the `Wrapper` instance. It can be read by the
   * `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'wrapper';
  }
  //#endregion instance accessors.

  //#region static public methods.
  /**
   * Defines a new `Wrapper` instance.
   * @param opening The opening chars of a generic type variable `Opening`.
   * @param closing The closing chars of a generic type variable `Closing`.
   * @returns The return value is a new `Wrapper` instance of given opening and closing chars.
   * @angularpackage
   */
  public static define<Opening extends string, Closing extends string>(
    opening: Opening,
    closing: Closing
  ): Wrapper<Opening, Closing> {
    return new this(opening, closing);
  }

  /**
   * The method checks if the value of any type is an instance of the `Wrapper` of any, or given opening and closing chars.
   * @param value The value of any type to test against the instance of `Wrapper`.
   * @param opening Optional opening chars to check if the given value contains.
   * @param closing Optional closing chars to check if the given value contains.
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
  //#endregion static public methods.

  //#region constructor.
  /**
   * Creates a new `Wrapper` instance with the opening and closing chars.
   * @param opening The opening chars of a generic type variable `Opening`.
   * @param closing The closing chars of a generic type variable `Closing`.
   * @returns The return value is a new `Wrapper` instance.
   * @angularpackage
   */
  constructor(opening: Opening, closing: Closing) {
    super(opening, closing);
  }
  //#endregion constructor.

  //#region instance public methods.
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
   * Checks if the provided `text` has the closing of specified `Wrapper` object at the end of the text.
   * @param text The text of a generic type variable `Text` to test against the existence of the closing chars.
   * @returns The return value is a `boolean` indicating whether the given `text` has the closing of the wrap.
   * @angularpackage
   */
  public textHasClosing<Text extends string>(text: Text): text is Text {
    return (
      isStringType(text) && text.slice(-this.closing.length) === this.closing
    );
  }

  /**
   * Checks if the provided `text` has the opening of the specified `Wrapper` object at the beginning of the text.
   * @param text The text of a generic type variable `Text` to test against the existence of the opening chars.
   * @returns The return value is a `boolean` indicating whether the given `text` has the opening of the wrap.
   * @angularpackage
   */
  public textHasOpening<Text extends string>(text: Text): text is Text {
    return (
      isStringType(text) && text.slice(0, this.opening.length) === this.opening
    );
  }

  /**
   * Returns the unwrapped, text without the opening and closing of the wrapper.
   * @param text The text of a `string` type to unwrap.
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
   * @returns The return value is the wrapped text of a generic type variables in order `Opening`, `Text` and `Closing` on the template
   * `${Opening}${Text}${Closing}`.
   * @angularpackage
   */
  public wrap<Text extends string = ``>(
    text: Text
  ): `${Opening}${Text}${Closing}` {
    return new Wrap(this.opening, this.closing, text).valueOf();
  }
  //#endregion instance public methods.
}
