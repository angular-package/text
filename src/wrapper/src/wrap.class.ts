import {
  // Function.
  areString,
  isStringType,
  isInstance,
} from '@angular-package/type';
// Class.
/**
 * The `Wrap` object represents the immutable wrap consisting of the opening, and closing.
 */
export class Wrap<
  Opening extends string = string,
  Closing extends string = string
> extends String {
  //#region accessors.
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
   * The `get` accessor gets the wrap consists of the opening and closing by using the **intuitive** name.
   * @returns The return value is the wrap of a generic type variable `Opening` and `Closing` on the template.
   * @angularpackage
   */
  public get wrap(): `${Opening}${Closing}` {
    return this.value;
  }

  /**
   * The `get` accessor gets the wrap consists of the opening and closing by using a **universal** name.
   * @returns The return value is the wrap of a generic type variable `Opening` and `Closing` on the template.
   * @angularpackage
   */
  public get value(): `${Opening}${Closing}` {
    return this.valueOf();
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
  //#endregion instance private properties.
  //#endregion instance properties.

  //#region static methods.
  /**
   * The method checks if the value of any type is the `Wrap` instance of any or given opening and closing.
   * @param value The value of any type to test against the `Wrap` instance of any or given opening and closing.
   * @param opening An optional wrap opening to check if the given `value` contains.
   * @param closing An optional wrap closing to check if the given `value` contains.
   * @returns The return value is a `boolean` type indicating whether the value is an instance of `Wrap` of any or given opening and
   * closing.
   * @angularpackage
   */
  public static isWrap<Opening extends string, Closing extends string>(
    value: any,
    opening?: Opening,
    closing?: Closing
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
   * @param values A rest parameter of expressions, where the first element is the opening and the second is the closing of the wrap.
   * @returns The return value is a `string` the wrap, or an empty `string` if elements of the provided `values` are not `string`.
   * @angularpackage
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
   * @angularpackage
   */
  constructor(opening: Opening, closing: Closing) {
    super(Wrap.template`${opening}${closing}`);
    this.#closing = closing;
    this.#opening = opening;
  }
  //#endregion constructor.

  //#region instance public methods.
  /**
   * Gets the closing of the wrap by returning the `#closing` property of the specified object.
   * @returns The return value is the wrap closing of a generic type variable `Closing`.
   * @angularpackage
   */
  public getClosing(): Closing {
    return this.#closing;
  }

  /**
   * Gets the opening of the wrap by returning the `#opening` property of the specified object.
   * @returns The return value is the wrap opening of a generic type variable `Opening`.
   * @angularpackage
   */
  public getOpening(): Opening {
    return this.#opening;
  }

  /**
   * Gets the wrap, primitive value consists of the opening and closing by using an **intuitive** method name.
   * @returns The return value is the wrap consists of the opening and closing of a generic type variable `Opening` and `Closing` on
   * the template.
   * @angularpackage
   */
   public getWrap(): `${Opening}${Closing}` {
    return this.valueOf();
  }

  /**
   * Returns the wrap, primitive value of the specified `Wrap` object.
   * @returns The return value is a generic type variable `Opening` and `Closing` on the template, if properly defined, or an empty
   * `string`.
   * @angularpackage
   */
  public valueOf(): `${Opening}${Closing}` {
    return super.valueOf() as `${Opening}${Closing}`;
  }
  //#endregion instance public methods.
}
