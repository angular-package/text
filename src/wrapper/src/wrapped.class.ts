// @angular-package/type.
import { isInstance, isStringType } from '@angular-package/type';
// Class.
import { Wrap } from './wrap.class';
// Type.
import { WrappedText } from '../type/wrapped-text.type';
/**
 * The `Wrapped` string object represents the immutable wrapped text.
 */
export class Wrapped<
  Text extends string = string,
  Opening extends string = string,
  Closing extends string = string
> extends String {
  //#region instance accessors.
  /**
   * The `get` accessor gets the closing of the wrap.
   * @returns The return value is the wrap closing of a generic type variable `Closing`.
   * @angularpackage
   */
  public get closing(): Closing {
    return this.#closing;
  }

  /**
   * The `get` accessor gets the opening of the wrap.
   * @returns The return value is the wrap opening of a generic type variable `Opening`.
   * @angularpackage
   */
  public get opening(): Opening {
    return this.#opening;
  }

  /**
   * The `get` accessor gets the text.
   * @returns The return value is the text of a generic type variable `Text`.
   * @angularpackage
   */
  public get text(): Text {
    return this.#text;
  }

  /**
   * The `get` accessor gets the wrapped text primitive value of a specified object by using a **universal** name.
   * @returns The return value is the text of a generic type variable in order  `Opening`, `Text`, `Closing` on the template.
   * @angularpackage
   */
  public get value(): `${Opening}${Text}${Closing}` {
    return this.valueOf();
  }

  /**
   * The `get` accessor, with the help of `toStringTag`, changes the default tag to `'wrapped'` for an instance of `Wrapped`. It can be read
   * by the `typeOf()` function of `@angular-package/type`.
   * @angularpackage
   */
  public get [Symbol.toStringTag](): string {
    return 'wrapped';
  }
  //#endregion instance accessors.

  //#region instance properties.
  //#region instance private properties.
  /**
   * Private property of the wrap closing.
   */
  #closing: Closing;

  /**
   * Private property of the wrap opening.
   */
  #opening: Opening;

  /**
   * Private property of the wrapped text.
   */
  #text: Text;
  //#endregion instance private properties.
  //#endregion instance properties.

  //#region static methods.
  /**
   * The static method checks whether the provided `value` of any type is an instance of `Wrapped`.
   * @param value The value of any type to test against the `Wrapped` instance.
   * @param wrap An optional opening of the `wrap` to check if the given `value` contains.
   * @returns The return value is a `boolean` indicating whether the value is the `Wrapped` instance of any or given chars.
   * @angularpackage
   */
  public static isWrapped<
    Text extends string,
    Opening extends string = string,
    Closing extends string = string
  >(
    value: any,
    opening?: Opening,
    closing?: Closing
  ): value is Wrapped<Text, Opening, Closing> {
    return isInstance(value, Wrapped)
      ? isStringType(opening) && isStringType(closing)
        ? closing === value.closing && opening === value.opening
        : isStringType(opening)
        ? opening === value.opening
        : isStringType(closing)
        ? closing === value.closing
        : true
      : false;
  }

  /**
   * The static "tag" method builds the wrapped text of a `string` type on the template. It consists of a text and an instance of `Wrap`.
   * @param template An array of `string` values where the first element is a text between opening and closing.
   * @param values A rest parameter of expressions, where the first element is the text and the second is an instance of `Wrap`.
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
      `${Wrap.isWrap(wrap) ? wrap.opening : ''}${template[0]}${text || ''}${
        Wrap.isWrap(wrap) ? wrap.closing : ''
      }`
    );
  }
  //#endregion static methods.

  //#region constructor.
  /**
   * Creates a new instance of `Wrapped` with the specified text and wrap.
   * @param text The value of a generic type variable `Text` to be wrapped with a given `wrap`.
   * @param wrap An instance of `Wrap` to wrap a given `text`.
   * @returns The return value is a new instance of `Wrapped` with the primitive value of the provided `text` if set properly, otherwise
   * with an empty `string`.
   * @angularpackage
   */
  constructor(text: Text, wrap: Wrap<Opening, Closing>) {
    super(Wrapped.template`${text}${wrap}`);
    this.#closing = wrap.closing;
    this.#opening = wrap.opening;
    this.#text = text;
  }
  //#endregion constructor.

  //#region instance methods.
  /**
   * Returns an unwrapped text, without the opening, and closing of the wrap.
   * @returns The return value is a text without the closing and opening.
   * @angularpackage
   */
  public unwrap(): Text {
    return this.#text;
  }

  /**
   * Gets wrapped text, the primitive value of a specified object.
   * @returns The return value is a generic type `WrappedText` if properly defined, or an empty `string`.
   * @angularpackage
   */
  public valueOf(): WrappedText<Text, Opening, Closing> {
    return super.valueOf() as WrappedText<Text, Opening, Closing>;
  }
  //#endregion instance methods.
}
