// @angular-package/type.
import { isStringType, isInstance } from '@angular-package/type';
/**
 * The `Wrap` object represents the immutable content wrapped by the opening and closing chars. It is designed to preserve the names of the
 * opening, content and closing.
 */
export class Wrap<
  Opening extends string = string,
  Content extends string = ``,
  Closing extends string = string
> extends String {
  //#region instance accessors.
  /**
   * The `get` accessor gets the closing of the wrap by returning the `#closing` property of a specified object.
   * @returns The return value is the wrap closing of a generic type variable `Closing`.
   * @angularpackage
   */
  public get closing(): Closing {
    return this.#closing;
  }

  /**
   * The `get` accessor gets the content of the `Wrap` by returning the `#content` property of a specified object.
   * @returns The return value is the content of a generic type variable `Content`.
   * @angularpackage
   */
  public get content(): Content {
    return this.#content;
  }

  /**
   * The `get` accessor gets the opening of the wrap by returning the `#opening` property of a specified object.
   * @returns The return value is the wrap opening of a generic type variable `Opening`.
   * @angularpackage
   */
  public get opening(): Opening {
    return this.#opening;
  }

  /**
   * The `get` accessor, with the help of `toStringTag`, changes the default tag to `'wrap'` for an instance of `Wrap`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   * @returns The return value is word 'wrap` of a `string`.
   * @angularpackage
   */
  public get [Symbol.toStringTag](): string {
    return 'wrap';
  }
  //#endregion instance accessors.

  //#region instance private properties.
  /**
   * The private property of wrap closing of a generic type variable `Closing`.
   */
  #closing: Closing;

  /**
   * Private property of content of a generic type variable `Content`.
   */
  #content: Content;

  /**
   * The private property of wrap opening of a generic type variable `Opening`.
   */
  #opening: Opening;
  //#endregion instance private properties.

  //#region static methods.
  /**
   * The method checks if the value of any type is the `Wrap` instance of any or given opening and closing.
   * @param value The value of any type to test against the `Wrap` instance of any or given opening and closing.
   * @param opening An optional wrap opening of a generic type variable `Opening` to check if the given `value` contains.
   * @param closing An optional wrap closing of a generic type variable `Closing` to check if the given `value` contains.
   * @param content An optional content of a generic type variable `Content` to check if the given `value` contains.
   * @returns The return value is a `boolean` type indicating whether the value is an instance of `Wrap` of any, or the given opening,
   * closing, and content.
   * @angularpackage
   */
  public static isWrap<
    Opening extends string = string,
    Closing extends string = string,
    Content extends string = ``
  >(
    value: any,
    opening?: Opening,
    closing?: Closing,
    content?: Content
  ): value is Wrap<Opening, Content, Closing> {
    return isInstance(value, this)
      ? (isStringType(opening) ? opening === value.opening : true) &&
          (isStringType(closing) ? closing === value.closing : true) &&
          (isStringType(content) ? content === value.content : true)
      : false;
  }

  //#endregion static methods.

  //#region constructor.
  /**
   * Creates a new `Wrap` instance with the opening and closing chars, and optional content wrapped by them.
   * @param opening The wrap opening of a generic type variable `Opening`, placed before the `content`.
   * @param closing The wrap closing of a generic type variable `Closing`, placed after the `content`.
   * @param content An optional content placed between the `opening` and `closing` on the template `${Opening}${Content}${Closing}`.
   * @angularpackage
   */
  constructor(
    opening: Opening,
    closing: Closing,
    content: Content = `` as Content
  ) {
    super(`${opening}${content}${closing}`);
    this.#closing = closing;
    this.#content = content;
    this.#opening = opening;
  }
  //#endregion constructor.

  //#region instance public methods.
  /**
   * Gets the closing of the wrap by returning the `#closing` property of a specified object.
   * @returns The return value is the wrap closing of a generic type variable `Closing`.
   * @angularpackage
   */
  public getClosing(): Closing {
    return this.#closing;
  }

  /**
   * Gets the content of the wrap by returning the `#content` property of a specified object, without the opening and closing of the `Wrap`.
   * @returns The return value is the content of a generic type variable `Content`.
   * @angularpackage
   */
  public getContent(): Content {
    return this.#content;
  }

  /**
   * Gets the opening of the wrap by returning the `#opening` property of a specified object.
   * @returns The return value is the wrap opening of a generic type variable `Opening`.
   * @angularpackage
   */
  public getOpening(): Opening {
    return this.#opening;
  }

  /**
   * Gets the wrap, primitive value of a specified `Wrap` object.
   * @returns The return value is the wrap of generic type variables in order `Opening`, `Content`, and `Closing` on the template
   * `${Opening}${Content}${Closing}`.
   * @angularpackage
   */
  public getWrap(): `${Opening}${Content}${Closing}` {
    return this.valueOf();
  }

  /**
   * Gets the wrap, the primitive value of a specified `Wrap` object.
   * @returns The return value is the wrap of generic type variables in order `Opening`, `Content`, and `Closing` on the template
   * `${Opening}${Content}${Closing}`.
   * @angularpackage
   */
  public toString(): `${Opening}${Content}${Closing}` {
    return this.valueOf();
  }

  /**
   * Returns the wrap, primitive value of a specified `Wrap` object.
   * @returns The return value is the wrap of generic type variables in order `Opening`, `Content`, and `Closing` on the template
   * `${Opening}${Content}${Closing}`.
   * @angularpackage
   */
  public valueOf(): `${Opening}${Content}${Closing}` {
    return super.valueOf() as `${Opening}${Content}${Closing}`;
  }
  //#endregion instance public methods.
}
