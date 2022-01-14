// @angular-package/type.
import { isInstance } from '@angular-package/type';
// Class.
import { Wrap } from './wrap.class';
/**
 * The `Wrapper` is an extension of the `Wrap` object, which means it represents the immutable wrap of the opening and closing with the
 * additional ability to use it to wrap.
 */
export class Wrapper<
  Opening extends string = string,
  Text extends string = '',
  Closing extends string = string
> extends Wrap<Opening, Text, Closing> {
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
   * Defines a new `Wrapper` instance consisting of the opening and closing chars.
   * @param opening The opening chars of a generic type variable `Opening`.
   * @param closing The closing chars of a generic type variable `Closing`.
   * @param text Optional text of a generic type variable `Text`.
   * @returns The return value is a new `Wrapper` instance of given `opening`, `closing` chars, and optional `text`.
   * @angularpackage
   */
  public static define<Opening extends string, Closing extends string, Text extends string = ''>(
    opening: Opening,
    closing: Closing,
    text?: Text
  ): Wrapper<Opening, Text, Closing> {
    return new this(opening, closing, text);
  }

  /**
   * The method checks if the value of any type is an instance of the `Wrapper` of any, or given opening and closing chars.
   * @param value The value of any type to test against the instance of `Wrapper`.
   * @param opening Optional opening chars of a generic type variable `Opening` to check if the given `value` contains.
   * @param closing Optional closing chars of a generic type variable `Closing` to check if the given `value` contains.
   * @returns The return value is a `boolean` type indicating whether the value is an instance of `Wrapper` of any, or the given opening
   * and closing chars.
   * @angularpackage
   */
  public static isWrapper<Opening extends string, Closing extends string>(
    value: any,
    opening?: Opening,
    closing?: Closing
  ): value is Wrapper<Opening, Closing> {
    return isInstance(value, this) && super.isWrap(value, opening, closing);
  }

  /**
   * Replaces the closing chars in a given text with a given replacement value at the end of the text.
   * @param text The text of `string` type in which the given `closing` chars are replaced by a given replacement value.
   * @param closing The value of the `string` as a replacement for the closing chars searched in the given `text`.
   * @param replaceValue Replacement value for the closing chars in the given text.
   * @returns The return value is the text of `string` type with a replaced closing chars by a given replacement value.
   * @angularpackage
   */
  public static replaceClosing(
    text: string,
    closing: string,
    replaceValue: string
  ): string {
    return this.hasClosing(text, closing)
      ? text.slice(0, -closing.length) + String(replaceValue)
      : text;
  }

  /**
   * Replaces the opening chars in a given text with a given replacement value at the end of the text.
   * @param text The text of `string` type in which the given `opening` chars are replaced by a given replacement value.
   * @param opening The value of the `string` as a replacement for the opening chars searched in the given `text`.
   * @param replaceValue Replacement value for the opening chars in the given text.
   * @returns The return value is the text of `string` type with a replaced opening chars by a given replacement value.
   * @angularpackage
   */
  public static replaceOpening(
    text: string,
    opening: string,
    replaceValue: string
  ): string {
    return this.hasOpening(text, opening)
      ? text.replace(opening, String(replaceValue))
      : text;
  }

  /**
   * The method returns the text without the given opening and closing chars.
   * @param text The text of the `string` from which given opening and closing chars are removed.
   * @param opening The opening chars of the `string` to be removed in the given `text`.
   * @param closing The closing chars of the `string` to be removed in the given `text`.
   * @returns The return value is the text without the given opening and closing chars.
   * @angularpackage
   */
  public static unwrap(text: string, opening = '', closing = ''): string {
    return (
      (text = this.replaceClosing(text, closing, '')),
      (text = this.replaceOpening(text, opening, '')),
      text
    );
  }
  //#endregion static public methods.

  //#region constructor.
  /**
   * Creates a new `Wrapper` instance with the opening and closing chars.
   * @param opening The opening chars of a generic type variable `Opening`.
   * @param closing The closing chars of a generic type variable `Closing`.
   * @param text Optional text of a generic type variable `Text` to wrap by given `opening` and `closing` chars.
   * @returns The return value is a new `Wrapper` instance.
   * @angularpackage
   */
  constructor(opening: Opening, closing: Closing, text: Text = '' as Text) {
    super(opening, closing, text);
  }
  //#endregion constructor.

  //#region instance public methods.
  /**
   * Checks if the provided `text` has the closing of specified `Wrapper` object at the end of the text.
   * @param text The text of a `string` to test against the existence of the closing chars.
   * @returns The return value is a `boolean` indicating whether the given `text` has the closing of the wrap.
   * @angularpackage
   */
  public isClosingIn(text: string): boolean {
    return Wrapper.hasClosing(text, this.closing);
  }

  /**
   * Checks if the provided `text` has the opening of the specified `Wrapper` object at the beginning of the text.
   * @param text The text of a `string` to test against the existence of the opening chars.
   * @returns The return value is a `boolean` indicating whether the given `text` has the opening of the wrap.
   * @angularpackage
   */
  public isOpeningIn(text: string): boolean {
    return Wrapper.hasOpening(text, this.opening);
  }

  /**
   * Replaces the closing chars of the `Wrapper` object in the text with a given replacement value.
   * @param replaceValue The value of string as replacement for the closing chars.
   * @returns The return value is the text of string with a replaced closing chars.
   * @angularpackage
   */
  public replaceClosingIn(text: string, replaceValue: string): string {
    return Wrapper.replaceClosing(text, this.closing, replaceValue);
  }

  /**
   * Replaces the opening chars of the `Wrapper` object in the text with a given replacement value.
   * @param replaceValue The value of string as replacement for the opening chars.
   * @returns The return value is the text of string with a replaced opening chars.
   * @angularpackage
   */
  public replaceOpeningIn(text: string, replaceValue: string): string {
    return Wrapper.replaceOpening(text, this.opening, replaceValue);
  }

  /**
   * Returns the text without the opening and closing of the wrapper.
   * @param text The text of a `string` type to unwrap.
   * @returns The return value is the unwrapped text of a `string` if the opening or closing is found or the given `text`.
   * @angularpackage
   */
  public removeWrapIn(text: string): string {
    return (
      (text = this.replaceClosingIn(text, '')),
      (text = this.replaceOpeningIn(text, '')),
      text
    );
  }

  /**
   * The method returns the `Wrap` consisting of the text of the `Wrapper` object and the given opening and closing chars.
   * @param opening The opening chars of a generic type variable `CustomOpening` to wrap the text of the `Wrapper` instance.
   * @param closing The closing chars of a generic type variable `CustomClosing` to wrap the text of the `Wrapper` instance.
   * @returns The return value is the wrapped text of generic type variables in order `CustomOpening`, `Text`, `CustomClosing` on the
   * template `${CustomOpening}${Text}${CustomClosing}`.
   * @angularpackage
   */
  public textWrap<CustomOpening extends string, CustomClosing extends string>(
    opening: CustomOpening,
    closing: CustomClosing
  ): `${CustomOpening}${Text}${CustomClosing}` {
    return new Wrap(opening, closing, this.text).valueOf();
  }

  /**
   * Replaces the closing chars of the `Wrapper` object in the text by the given closing chars.
   * @param closing The closing chars of `string` to replace in the text, part of the primitive value.
   * @returns The return value is the text with a replaced closing chars.
   * @angularpackage
   */
  public textReplaceClosing(closing: string): string {
    return Wrapper.replaceClosing(this.text, this.closing, closing);
  }

  /**
   * Replaces the opening chars of the `Wrapper` object in the text by the given opening chars.
   * @param opening The opening chars of `string` to replace in the text, part of the primitive value.
   * @returns The return value is the text with a replaced opening chars.
   * @angularpackage
   */
  public textReplaceOpening(opening: string): string {
    return Wrapper.replaceOpening(this.text, this.opening, opening);
  }

  /**
   * The method returns the text of the `Wrapper` object without the opening and closing chars.
   * @returns The return value is the text without the opening and closing chars.
   * @angularpackage
   */
  public textUnwrap(): string {
    return Wrapper.unwrap(this.text, this.opening, this.closing);
  }

  /**
   * Returns an `array` consisting of the opening chars, text, and closing chars.
   * @returns The return value is a read-only `array` consisting of the opening chars, text, and closing chars.
   * @angularpackage
   */
  public toArray(): readonly [ Opening, Text, Closing ] {
    return [this.opening, this.text, this.closing];
  }

  /**
   * Returns the `Wrap` instance consists of the text, opening and closing chars of the `Wrapper` object.
   * @returns The return value is an instance of `Wrap` consisting of the text, opening, and closing chars of the `Wrapper` object.
   * @angularpackage
   */
  public toWrap(): Wrap<Opening, Text, Closing> {
    return new Wrap(this.opening, this.closing, this.text);
  }

  /**
   * Returns the text without the opening and closing chars.
   * @returns The return value is the text of a generic type variable `Text`.
   * @angularpackage
   */
  public unwrap(): Text {
    return this.text;
  }

  /**
   * The method wraps the primitive value of a specified `Wrapper` object.
   * @returns The return value is a new instance of `Wrap` with the wrapped primitive value by the given opening and closing chars or the
   * `Wrapper` instance.
   * @angularpackage
   */
  public wrap<
    CustomOpening extends string = Opening,
    CustomClosing extends string = Closing
  >(
    opening: CustomOpening = this.opening as any,
    closing: CustomClosing = this.closing as any
  ): `${CustomOpening}${Opening}${Text}${Closing}${CustomClosing}` {
    return new Wrap(opening, closing, this.valueOf()).valueOf();
  }

  /**
   * Wraps the specific text with the wrap, the opening, and closing of the `Wrapper` object.
   * @param text The text of a generic type variable `Text` to wrap with the opening and closing chars from the `Wrapper` instance.
   * @returns The return value is the wrapped text of generic type variables in order `Opening`, `Text` and `Closing` on the template
   * `${Opening}${Text}${Closing}`.
   * @angularpackage
   */
  public wrapOn<Txt extends string = ''>(
    text: Txt
  ): `${Opening}${Txt}${Closing}` {
    return new Wrap(this.opening, this.closing, text).valueOf();
  }
  //#endregion instance public methods.
}
