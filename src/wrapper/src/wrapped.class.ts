// @angular-package/type.
import {
  ResultCallback,
  areDefined,
  isString,
  isInstance,
  isTrue,
} from '@angular-package/type';
// Type.
import { WrapClosingChar } from '../type/wrap-closing-char.type';
import { WrapOpeningChar } from '../type/wrap-opening-char.type';
import { Wrap } from '../type/wrap.type';
import { Wrapper } from './wrapper.class';
/**
 *
 */
export class Wrapped<
  Text extends string = string,
  Chars extends string = string
> extends String {
  //#region instance properties.
  //#region instance public properties.
  public get closingChar(): WrapClosingChar<Chars> | undefined {
    return this.#closingChar;
  }

  public get openingChar(): WrapOpeningChar<Chars> | undefined {
    return this.#openingChar;
  }

  public get text(): Text {
    return super.valueOf() as Text;
  }
  //#endregion instance public properties.

  //#region instance private properties.
  #closingChar?: WrapOpeningChar<Chars>;
  #openingChar?: WrapOpeningChar<Chars>;
  //#endregion instance private properties.
  //#endregion instance properties.

  //#region static methods.
  public static isWrapped<Text extends string, Chars extends string>(
    value: any,
    callback?: ResultCallback<any>
  ): value is Wrapped<Text, Chars> {
    return isInstance(value, Wrapped, callback);
  }
  //#endregion static methods.

  //#region constructor.
  constructor(
    text: Text,
    wrap?: Wrap<Chars> | Wrapper<Chars>,
    callback?: ResultCallback<Text>
  ) {
    super(isString(text, callback) ? text : '');
    this.#checkWrapped(wrap);
  }
  //#endregion constructor.

  //#region instance methods.
  public unwrap(): string {
    return this.#isWrapped()
      ? this.text.slice(1, this.text.length - 1)
      : this.text;
  }
  //#endregion instance methods.

  //#region instance private methods.
  #checkWrapped(wrap?: Wrap<Chars> | Wrapper<Chars>): void {
    const wrapper = Wrapper.isWrapper(wrap)
      ? wrap
      : Wrapper.isWrap(wrap)
      ? new Wrapper(wrap)
      : undefined;
    this.#setClosingChar(wrapper).#setOpeningChar(wrapper);
  }

  #setClosingChar(wrapper?: Wrapper<Chars>): this {
    this.text.slice(-1) === wrapper?.closingChar &&
      (this.#closingChar = wrapper.closingChar);
    return this;
  }

  #setOpeningChar(wrapper?: Wrapper<Chars>): this {
    this.text.slice(0, 1) === wrapper?.openingChar &&
      (this.#openingChar = wrapper.openingChar);
    return this;
  }

  #isWrapped(): boolean {
    return isTrue(areDefined(this.closingChar, this.openingChar).every());
  }
  //#endregion instance private methods.
}
