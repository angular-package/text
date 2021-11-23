import {
  // Function.
  guardStringLength,
  isInstance,
  isStringType,
} from '@angular-package/type';
// Class.
import { Wrapped } from './wrapped.class';
// Type.
import { WrapClosingChar } from '../type/wrap-closing-char.type';
import { WrapOpeningChar } from '../type/wrap-opening-char.type';
/**
 * The `Wrapper` object represents the immutable wrap consisting of two chars, the opening, and closing to wrap the text.
 */
export class Wrap<Chars extends string> extends String {
  //#region properties.
  //#region static properties.
  //#region static public properties.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'wrapper'` for static `Wrapper`. It can be read by the
   * `typeOf()` function of `@angular-package/type`.
   */
  public static get [Symbol.toStringTag](): string {
    return 'wrap';
  }
  //#endregion static public properties.

  //#region static private properties.
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
  public get wrap(): Chars {
    return this.value as Chars;
  }

  /**
   * Gets the wrap consists of two allowed characters.
   */
  public get value(): Chars {
    return super.valueOf() as Chars;
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'wrapper'` for an instance of `Wrapper`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'wrap';
  }
  //#endregion instance properties.
  //#endregion properties.

  //#region static methods.
  public static isWrap<Chars extends string>(
    value: any,
    chars?: Chars
  ): value is Wrap<Chars> {
    return isInstance(value, Wrap)
      ? isStringType(chars)
        ? value.wrap === chars
        : true
      : false;
  }
  //#region static private methods.
  //#endregion static private methods.
  //#endregion static methods.

  //#region constructor.
  /**
   * Creates a new instance of the `Wrapper` to wrap the specified text by using the wrap consisting of two allowed chars.
   * @param wrap The wrap of a generic type `Wrap` to set.
   * @param allowedChars The allowed characters of the `RegExp` type of given `wrap`.
   * @param callback An optional callback function of the `ResultCallback` type to handle the result of the check whether the provided
   * `wrap` is a string of two allowed chars.
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
   * @returns The return value is a generic type `Wrap` consisting of two characters.
   */
  public getWrap(): Chars {
    return this.valueOf();
  }

  /**
   * Wraps specified text with the wrap, the opening and closing characters of the specified object.
   * @param text The text of a generic type variable `Text` to be wrapped.
   * @param callback An optional callback function of the `ResultCallback` type to handle the check result, whether the provided
   * `text` is a string type.
   * @returns The return value is a new instance of the `Wrapped` type consisting of the wrapped text.
   */
  public wrapText<Text extends string>(text: Text): Wrapped<Text, Chars> {
    return new Wrapped(
      `${this.openingChar}${text}${this.closingChar}` as Text,
      this
    );
  }

  /**
   * Returns the wrap, primitive value of the specified `Wrapper` object.
   * @returns The return value is a generic type `Wrap` consisting of two allowed chars.
   */
  public valueOf(): Chars {
    return super.valueOf() as Chars;
  }
  //#endregion instance methods.
}
