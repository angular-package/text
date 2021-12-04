// @angular-package/type.
import {
  // Function.
  isDefined,
  isInstance,
} from '@angular-package/type';
// Class.
import { Wrap } from './wrap.class';
/**
 * The `Wrapped` string object represents the immutable wrapped text.
 */
export class Wrapped<
  Text extends string = string,
  Opening extends string = string,
  Closing extends string = string
> extends String {
  //#region instance properties.
  //#region instance public properties.
  /**
   * Gets the closing of the wrap, or if the wrap was not provided, or it was provided but not found in the text returns undefined.
   * @returns The return value is the wrap closing of a generic type variable `Closing`.
   * @angularpackage
   */
  public get closing(): Closing | undefined {
    return this.#closing;
  }

  /**
   * Gets the opening of the wrap, or if the wrap was not provided, or it was provided but not found in the text returns undefined.
   * @returns The return value is the wrap opening of a generic type variable `Opening`.
   * @angularpackage
   */
  public get opening(): Opening | undefined {
    return this.#opening;
  }

  /**
   * Gets the text primitive value of a specified object by using an **intuitive** property name.
   * @returns The return value is the text of a generic type variable `Text`.
   * @angularpackage
   */
  public get text(): Text {
    return this.valueOf();
  }

  /**
   * Gets the text primitive value of a specified object by using a **universal** property name.
   * @returns The return value is the text of a generic type variable `Text`.
   * @angularpackage
   */
  public get value(): Text {
    return this.valueOf();
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'wrapped'` for an instance of `Wrapped`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   * @angularpackage
   */
  public get [Symbol.toStringTag](): 'wrapped' {
    return 'wrapped';
  }
  //#endregion instance public properties.

  //#region instance private properties.
  /**
   * The closing of the wrap or `undefined` if not set.
   */
  #closing?: Closing;

  /**
   * The opening of the wrap or `undefined` if not set.
   */
  #opening?: Opening;
  //#endregion instance private properties.
  //#endregion instance properties.

  //#region static methods.
  /**
   * The static method checks whether the provided `value` of any type is an instance of `Wrapped`.
   * @param value The value of any type to test against the `Wrapped` instance.
   * @param wrap An optional characters to check if the given `value` contains.
   * @returns The return value is a `boolean` indicating whether the value is the `Wrapped` instance of any or given chars.
   * @angularpackage
   */
  public static isWrapped<
    Text extends string,
    Opening extends string = string,
    Closing extends string = string
  >(
    value: any,
    wrap?: Wrap<Opening, Closing>
  ): value is Wrapped<Text, Opening, Closing> {
    return isInstance(value, Wrapped)
      ? Wrap.isWrap(wrap) &&
          wrap.closing === value.closing &&
          wrap.opening === value.opening
      : false;
  }

  /**
   * The static "tag" method builds the wrapped text of a string type on the template.
   * @param template An array of string values where the first element is a text between opening and closing.
   * @param values A rest parameter, where the first element is the text and the second is an instance of `Wrap`.
   * @returns The return value is a `string` the wrapped text, or an empty `string` if elements of the provided `values` are not `string`.
   * @angularpackage
   */
  public static template(
    template: TemplateStringsArray,
    ...values: any[]
  ): string {
    let text, wrap;
    return (
      ([text, wrap] = values),
      `${
        Wrap.isWrap(wrap)
          ? text.slice(0, wrap.opening.length) === wrap.opening
            ? ''
            : wrap?.opening
          : ''
      }${template[0]}${text || ''}${
        Wrap.isWrap(wrap)
          ? text.slice(-wrap.closing.length) === wrap.closing
            ? ''
            : wrap?.closing
          : ''
      }`
    );
  }
  //#endregion static methods.

  //#region constructor.
  /**
   * Creates a new instance of `Wrapped` with the specified text and optional wrap.
   * @param text The value of a generic type variable `Text` to set with a new instance.
   * @param wrap An optional object of `Wrap` to set with a new instance.
   * @returns The return value is a new instance of `Wrapped` with the primitive value of the provided `text` if set properly, otherwise
   * with an empty `string`.
   * @angularpackage
   */
  constructor(text: Text, wrap?: Wrap<Opening, Closing>) {
    super(Wrapped.template`${text}${wrap}`);
    this.#setWrapped(wrap);
  }
  //#endregion constructor.

  //#region instance methods.
  /**
   * Returns an unwrapped text, without the opening, and closing character of the wrap.
   * @returns The return value is a text without the closing and opening.
   * @angularpackage
   */
  public unwrap(wrap?: Wrap<Opening, Closing>): string {
    isDefined(wrap) && this.#setWrapped(wrap);
    return isDefined(this.#closing) && isDefined(this.#opening)
      ? this.text.slice(
          this.#opening.length,
          this.text.length - this.#closing.length
        )
      : this.text;
  }

  /**
   * Gets the primitive value of a specified object.
   * @returns The return value is a generic type variable `Text` if properly defined, or an empty `string`.
   * @angularpackage
   */
  public valueOf(): Text {
    return super.valueOf() as Text;
  }

  //#region instance private methods.
  /**
   * The private method sets the `closing` if the closing from the wrapped text is equal to the closing of the provided
   * `wrap`.
   * @param wrap An instance of `Wrap` to pick a closing and set it if found in the text.
   * @returns The return value is an instance of `Wrapped`.
   * @angularpackage
   */
  #setClosing(wrap: Wrap<Opening, Closing>): this {
    this.text.slice(-wrap.closing.length) === wrap.closing &&
      (this.#closing = wrap.closing);
    return this;
  }

  /**
   * The private method sets the `opening` if the opening from the wrapped text is equal to the opening of the provided
   * `wrap`.
   * @param wrap An instance of `Wrap` to pick opening and set it if found in the text.
   * @returns The return value is an instance of `Wrapped`.
   * @angularpackage
   */
  #setOpening(wrap: Wrap<Opening, Closing>): this {
    this.text.slice(0, wrap.opening.length) === wrap.opening &&
      (this.#opening = wrap.opening);
    return this;
  }

  /**
   * The private method sets the closing and opening based on provided `wrap`.
   * @param wrap The value of an instance of `Wrap` to pick from it closing and opening.
   * @angularpackage
   */
  #setWrapped(wrap?: Wrap<Opening, Closing>): void {
    Wrap.isWrap(wrap) && this.#setClosing(wrap).#setOpening(wrap);
  }
  //#endregion instance private methods.
  //#endregion instance methods.
}
