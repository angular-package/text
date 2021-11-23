import {
  // Function.
  guardStringLength,
  isInstance,
  isStringLength,
} from '@angular-package/type';
// Class.
import { Wrapped } from './wrapped.class';
// Type.
import { WrapClosingChar } from '../type/wrap-closing-char.type';
import { WrapOpeningChar } from '../type/wrap-opening-char.type';
/**
 * The `Wrap` object represents the immutable wrap consisting of two chars, the opening, and closing to wrap the text.
 */
export class Wrap<Chars extends string> extends String {
  //#region properties.
  //#region static properties.
  //#region static public properties.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'wrap'` for static `Wrap`. It can be read by the
   * `typeOf()` function of `@angular-package/type`.
   */
  public static get [Symbol.toStringTag](): 'wrap' {
    return 'wrap';
  }
  //#endregion static public properties.
  //#endregion static properties.

  //#region instance properties.
  /**
   * Gets the closing char of the wrap.
   */
  public get closingChar(): WrapClosingChar<Chars> {
    return this.wrap.substr(-1, 1) as Chars;
  }

  /**
   * Gets the opening char of the wrap.
   */
  public get openingChar(): WrapOpeningChar<Chars> {
    return this.wrap.substr(0, 1);
  }

  /**
   * Gets the wrap consists of two characters by using the intuitive property name.
   */
  public get wrap(): Chars {
    return this.value as Chars;
  }

  /**
   * Gets the wrap consists of two characters.
   */
  public get value(): Chars {
    return super.valueOf() as Chars;
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'wrap'` for an instance of `Wrap`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): 'wrap' {
    return 'wrap';
  }
  //#endregion instance properties.
  //#endregion properties.

  //#region static methods.
  /**
   * The method checks if the value of any type is the `Wrap` instance of the two characters.
   * @param value The value of any type to test against the `Wrap` instance of the two any or given `chars`.
   * @param chars An optional two characters to check if the given `value` contains.
   * @returns The return value is a `boolean` type indicating whether the value is an instance of `Wrap` of the two any or given characters.
   */
  public static isWrap<Chars extends string>(
    value: any,
    chars?: Chars
  ): value is Wrap<Chars> {
    return isInstance(value, Wrap) && isStringLength(value, 2)
      ? isStringLength(chars, 2)
        ? value.wrap === chars
        : true
      : false;
  }
  //#endregion static methods.

  //#region constructor.
  /**
   * Creates a new instance of the `Wrap` to wrap the specified text by using the wrap consisting of two chars.
   * @param chars The wrap of a generic type variable `Chars` to set.
   * @returns The return value is a new instance of `Wrap` with the primitive value of the provided `chars` if set properly, otherwise with
   * an empty string.
   */
  constructor(chars: Chars) {
    super(guardStringLength(chars, 2) ? chars : '');
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
   * @returns The return value is a generic type variable `Chars` consisting of two characters.
   */
  public getWrap(): Chars {
    return this.valueOf();
  }

  /**
   * Wraps specified text with the wrap, the opening and closing characters of the specified object.
   * @param text The text of a generic type variable `Text` to be wrapped.
   * @returns The return value is a new instance of the `Wrapped` type consisting of the wrapped text.
   */
  public wrapText<Text extends string>(text: Text): Wrapped<Text, Chars> {
    return new Wrapped(
      `${this.openingChar}${text}${this.closingChar}` as Text,
      this
    );
  }

  /**
   * Returns the wrap, primitive value of the specified `Wrap` object.
   * @returns The return value is a generic type variable `Chars` consisting of two chars.
   */
  public valueOf(): Chars {
    return super.valueOf() as Chars;
  }
  //#endregion instance methods.
}
