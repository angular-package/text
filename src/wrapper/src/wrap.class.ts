import {
  // Function.
  isStringType,
  isInstance,
} from '@angular-package/type';
/**
 * The `Wrap` object represents the immutable wrap of the opening and closing. It is designed to preserve the names of the opening and
 * closing.
 */
export class Wrap<
  Text extends string = ``,
  Opening extends string = string,
  Closing extends string = string,
> extends String {
  //#region accessors.
  //#region instance accessors.
  /**
   * The `get` accessor gets the closing of the wrap by returning the `#closing` property of the specified object.
   * @returns The return value is the wrap closing of a generic type variable `Closing`.
   * @angularpackage
   */
  public get closing(): Closing {
    return this.#closing;
  }

  /**
   * The `get` accessor gets the opening of the wrap by returning the `#opening` property of the specified object.
   * @returns The return value is the wrap opening of a generic type variable `Opening`.
   * @angularpackage
   */
  public get opening(): Opening {
    return this.#opening;
  }

  /**
   * The `get` accessor gets the wrap consists of the opening and closing.
   * @returns The return value is the wrap of a generic type variable in order `Opening` and `Closing` on the template.
   * @angularpackage
   */
  // public get wrap(): `${Opening}${Text}${Closing}` {
  //   return this.valueOf();
  // }

  /**
   * The `get` accessor gets the wrap consists of the opening and closing.
   * @returns The return value is the wrap of a generic type variable in order `Opening` and `Closing` on the template.
   * @angularpackage
   */
  // public get value(): `${Opening}${Text}${Closing}` {
  //   return this.valueOf();
  // }

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
   * The private property indicates the wrap closing of a generic type variable `Closing`.
   */
  #closing: Closing;

  /**
   * The private property indicates the wrap opening of a generic type variable `Opening`.
   */
  #opening: Opening;

  /**
   *
   */
  #text: Text;
  //#endregion instance private properties.
  //#endregion instance properties.

  //#region static methods.
  /**
   * The method checks if the value of any type is the `Wrap` instance of any or given opening and closing.
   * @param value The value of any type to test against the `Wrap` instance of any or given opening and closing.
   * @param opening An optional wrap opening of a generic type variable `Opening` to check if the given `value` contains.
   * @param closing An optional wrap closing of a generic type variable `Closing` to check if the given `value` contains.
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
  constructor(text: Text = `` as Text, opening: Opening, closing: Closing) {
    super(`${opening}${text}${closing}`);
    this.#closing = closing;
    this.#opening = opening;
    this.#text = text;
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
   * 
   * @returns 
   */
  public getText(): Text {
    return this.#text;
  }

  /**
   * Gets the wrap, primitive value consists of the opening and closing.
   * @returns The return value is the wrap consists of the opening and closing of a generic type variable `Opening` and `Closing` on
   * the template.
   * @angularpackage
   */
  public getWrap(): `${Opening}${Text}${Closing}` {
    return this.valueOf();
  }

  /**
   * Returns the wrap, primitive value of the specified `Wrap` object.
   * @returns The return value is a generic type variable `Opening` and `Closing` on the template, if properly defined, or an empty
   * `string`.
   * @angularpackage
   */
  public valueOf(): `${Opening}${Text}${Closing}` {
    return super.valueOf() as `${Opening}${Text}${Closing}`;
  }
  //#endregion instance public methods.
}
