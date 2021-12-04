import {
  // Function.
  areString,
  isStringType,
  isInstance,
} from '@angular-package/type';
// Class.
import { Wrapped } from './wrapped.class';
/**
 * The `Wrap` object represents the immutable wrap consisting of the opening, and closing to wrap the text.
 */
export class Wrap<
  Opening extends string = string,
  Closing extends string = string
> extends String {
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
   * Gets the closing of the wrap.
   */
  public get closing(): Closing {
    return this.#closing;
  }

  /**
   * Gets the opening of the wrap.
   */
  public get opening(): Opening {
    return this.#opening;
  }

  /**
   * Gets the wrap consists of the opening and closing by using the **intuitive** property name.
   */
  public get wrap(): `${Opening}${Closing}` {
    return this.value;
  }

  /**
   * Gets the wrap consists of the opening and closing by using a **universal** property name.
   */
  public get value(): `${Opening}${Closing}` {
    return this.valueOf();
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'wrap'` for an instance of `Wrap`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): 'wrap' {
    return 'wrap';
  }
  //#endregion instance properties.
  /**
   * A private property the closing of the wrap.
   */
  #closing: Closing;

  /**
   * A private property the opening of the wrap.
   */
  #opening: Opening;
  //#endregion properties.

  //#region static methods.
  /**
   * The method checks if the value of any type is the `Wrap` instance of any or given opening and closing.
   * @param value The value of any type to test against the `Wrap` instance of any or given opening and closing.
   * @param opening The wrap opening to check if the given `value` contains.
   * @param closing The wrap closing to check if the given `value` contains.
   * @returns The return value is a `boolean` type indicating whether the value is an instance of `Wrap` of any or given opening and
   * closing.
   */
  public static isWrap<Opening extends string, Closing extends string>(
    value: any,
    opening?: Opening,
    closing?: Closing,
  ): value is Wrap<Opening, Closing> {
    return isInstance(value, Wrap)
      ? isStringType(opening) && isStringType(closing)
        ? opening === value.opening && closing === value.closing
        : isStringType(opening)
        ? opening === value.opening
        : isStringType(closing)
        ? closing === value.closing
        : true
      : false;
  }

  /**
   * The static "tag" method builds the wrap of a string type on the template.
   * @param template An array of string values where the first element is a text between opening and closing.
   * @param values A rest parameter, where the first element is the opening and the second is the closing of the wrap.
   * @returns The return value is a `string` the wrap, or an empty `string` if elements of the provided `values` are not `string`.
   */
  public static template(
    template: TemplateStringsArray,
    ...values: string[]
  ): string {
    let opening, closing;
    if (areString(...values).every()) {
      return (
        ([opening, closing] = values), `${opening}${template[0]}${closing}`
      );
    }
    return ``;
  }
  //#endregion static methods.

  //#region constructor.
  /**
   * Creates a new instance of the `Wrap` with the opening and closing.
   * @param opening The wrap opening of a generic type variable `Opening`.
   * @param closing The wrap closing of a generic type variable `Closing`.
   * @returns The return value is a new instance of `Wrap` with the primitive value of the provided `opening` and `closing` if set properly,
   * otherwise with an empty `string`.
   */
  constructor(opening: Opening, closing: Closing) {
    super(Wrap.template`${opening}${closing}`);
    this.#closing = closing;
    this.#opening = opening;
  }
  //#endregion constructor.

  //#region instance public methods.
  /**
   * Gets the wrap, primitive value consists of the opening and closing by using an intuitive method name.
   * @returns The return value is the wrap consists of the opening and closing of a generic type variable `Opening` and `Closing`.
   */
  public get(): `${Opening}${Closing}` {
    return this.valueOf();
  }

  /**
   * Gets the closing of the wrap by returning the `closing` property of the specified object.
   * @returns The return value is the wrap closing of a generic type variable `Closing`.
   */
  public getClosing(): Closing {
    return this.closing;
  }

  /**
   * Gets the opening of the wrap by returning the `opening` property of the specified object.
   * @returns The return value is the wrap opening of a generic type variable `Opening`.
   */
  public getOpening(): Opening {
    return this.opening;
  }

  /**
   * The method checks if any value is an instance of `Wrapped`.
   * @param value Any value to check against the `Wrapped`.
   * @returns The return value is a `boolean` indicating whether the provided `value` is an instance of `Wrapped`.
   */
  public isWrapped(value: any): value is Wrapped<string, Opening, Closing> {
    return Wrapped.isWrapped(value, this);
  }

  /**
   * Wraps specific text with the wrap, the opening, and closing of the specified object.
   * @param text The text of a generic type variable `Text`, to be wrapped.
   * @returns The return value is a new instance of the `Wrapped` type consisting of the wrapped text.
   */
  public wrapText<Text extends string>(
    text: Text
  ): Wrapped<Text, Opening, Closing> {
    return new Wrapped(text, this);
  }

  /**
   * Returns the unwrapped text.
   * @param wrapped The text or an instance of `Wrapped` to unwrap the text.
   * @returns The return value is the unwrapped text of a string.
   */
  public unwrapText(wrapped: string | Wrapped): string {
    return new Wrapped(wrapped.valueOf()).unwrap(this);
  }

  /**
   * Returns the wrap, primitive value of the specified `Wrap` object.
   * @returns The return value is a generic type variable `Opening` and `Closing`, if properly defined, or an empty `string`.
   */
  public valueOf(): `${Opening}${Closing}` {
    return super.valueOf() as `${Opening}${Closing}`;
  }
  //#endregion instance methods.
}
