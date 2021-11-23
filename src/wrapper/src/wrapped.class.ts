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
 * The `Wrapped` object consists of wrapped text and optional wrap.
 */
export class Wrapped<
  Text extends string = string,
  Chars extends string = string
> extends String {
  //#region instance properties.
  //#region instance public properties.
  /**
   *
   */
  public get closingChar(): WrapClosingChar<Chars> | undefined {
    return this.#closingChar;
  }

  /**
   *
   */
  public get openingChar(): WrapOpeningChar<Chars> | undefined {
    return this.#openingChar;
  }

  /**
   *
   */
  public get text(): Text {
    return super.valueOf() as Text;
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'wrapped'` for an instance of `Wrapped`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'wrapped';
  }
  //#endregion instance public properties.

  //#region instance private properties.
  /**
   *
   */
  #closingChar?: WrapOpeningChar<Chars>;

  /**
   *
   */
  #openingChar?: WrapOpeningChar<Chars>;
  //#endregion instance private properties.
  //#endregion instance properties.

  //#region static methods.
  public static isWrapped<Text extends string, Chars extends string>(
    value: any,
    chars?: Chars
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
   *
   * @param text
   * @param chars
   */
  constructor(text: Text, chars?: Chars | Wrap<Chars>) {
    super(guardString(text) ? text : '');
    isDefined(chars) && this.#checkWrapped(chars);
  }
  //#endregion constructor.

  //#region instance methods.
  /**
   *
   * @returns
   */
  public unwrap(): string {
    return this.#isWrapped()
      ? this.text.slice(1, this.text.length - 1)
      : this.text;
  }
  //#endregion instance methods.

  //#region instance private methods.
  #checkWrapped(chars: Chars | Wrap<Chars>): void {
    const wrap = Wrap.isWrap(chars) ? chars : new Wrap(chars);
    this.#setClosingChar(wrap).#setOpeningChar(wrap);
  }

  #setClosingChar(wrap?: Wrap<Chars>): this {
    this.text.slice(-1) === wrap?.closingChar &&
      (this.#closingChar = wrap.closingChar);
    return this;
  }

  #setOpeningChar(wrap?: Wrap<Chars>): this {
    this.text.slice(0, 1) === wrap?.openingChar &&
      (this.#openingChar = wrap.openingChar);
    return this;
  }

  #isWrapped(): boolean {
    return isTrue(areDefined(this.closingChar, this.openingChar).every());
  }
  //#endregion instance private methods.
}
