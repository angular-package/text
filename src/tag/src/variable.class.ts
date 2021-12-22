// @angular-package/type.
import { isInstance, isDefined } from '@angular-package/type';
// Class.
import { Tag } from './tag.class';
/**
 * The `Variable` is an extension of the `Tag` string object and represents an immutable variable in the form {variable name}.
 */
export class Variable<
  Name extends string,
  Value extends string = string
> extends Tag<Name, `{`, `}`> {
  //#region instance public accessors.
  /**
   * The `get` accessor returns the value of a specified `Variable` object.
   * @returns The return value is the value of a `string` type if set, otherwise `undefined`.
   * @angularpackage
   */
  public get value(): Value | undefined {
    return this.#value;
  }

  /**
   * The `get` accessor returns the variable in form {variable name}, a primitive value of the specified `Variable` object.
   * @returns The return value is the variable of a generic type variable `Name` on the template `{${Name}}`.
   * @angularpackage
   */
  public get variable(): `{${Name}}` {
    return super.valueOf();
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'variable'` for an instance of `Variable`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'variable';
  }
  //#endregion instance public accessors.

  //#region instance private properties.
  /**
   * Private value of a generic type variable `Value`.
   */
  #value?: Value;
  //#endregion instance private properties.

  //#region static public methods.
  /**
   * The static method defines the `Variable` of a specified name with an optional value.
   * @param name The name of `Variable` to define.
   * @param value An optional value of the variable.
   * @returns The return value is a new instance of `Variable` with the given `name` and an optional value.
   * @angularpackage
   */
  public static define<Name extends string, Value extends string>(
    name: Name,
    value?: Value
  ): Variable<Name, Value> {
    return new this(name, value);
  }

  /**
   * The static method checks if the value of any type is an instance of a `Variable`.
   * @param value The value of any type to check against the instance of `Variable`.
   * @param name Optional name of a generic type variable `Name`, as the variable name of a given value.
   * @returns The return value is a `boolean` type indicating whether the value is the `Variable` instance of any or a given name.
   * @angularpackage
   */
  public static isVariable<Name extends string>(
    value: any,
    name?: Name
  ): value is Variable<Name> {
    return isInstance(value, Variable)
      ? isDefined(name) && value.name === name
      : false;
  }
  //#endregion static public methods.

  //#region constructor.
  /**
   * Creates a new instance of `Variable` with a specified name and optional value.
   * @param name The name of the variable in form {name} of a generic type variable `Name` to create.
   * @param value An optional value of a variable.
   * @angularpackage
   */
  constructor(name: Name, value?: Value) {
    super(name, '{', '}');
    this.#value = value;
  }
  //#endregion constructor.

  //#region instance public methods.
  /**
   * Gets the value of the variable.
   * @returns The return value is the value of a generic type variable `Value` if set, otherwise `undefined`.
   * @angularpackage
   */
  public getValue(): Value | undefined {
    return this.#value;
  }

  /**
   * Sets the value for the variable.
   * @param value The value of a generic type variable `Value` to set.
   * @returns The return value is an instance of `Variable`.
   * @angularpackage
   */
  public setValue(value: Value): this {
    this.#value = value;
    return this;
  }

  /**
   * Replaces variable in format {variable name} with the value of a specified `Variable` object in the given text.
   * @param text The text of a `string` type in which replace the variable with the value.
   * @returns The return value is the text of a `string` type with a replaced variable by value.
   * @angularpackage
   */
  public replaceVariable(text: string): string {
    return this.replaceTag(text, this.#value || ``);
  }

  /**
   * Returns converted variable to array where the first element is the name, and the second is the value.
   * @returns The return value is an array of attributes.
   * @angularpackage
   */
  public toArray(): [Name, Value | undefined] {
    return [this.name, this.#value];
  }

  /**
   * Returns converted variable to object where the key is the variable name.
   * @returns The return value is an object where the property name is variable name equal to variable value.
   * @angularpackage
   */
  public toObject(): Readonly<{ [K in Name]: Value }> {
    return { [this.name]: this.#value } as { [K in Name]: Value };
  }

  /**
   * Returns the variable in form {name}, a primitive value of the specified `Variable` object.
   * @returns The return value is the variable of a generic type variable `Name` on the template `{${Name}}`.
   * @angularpackage
   */
  public toString(): `{${Name}}` {
    return this.valueOf();
  }

  /**
   * Returns the variable in form {name}, a primitive value of the specified `Variable` object.
   * @returns The return value is the variable of a generic type variable `Name` on the template `{${Name}}`.
   * @angularpackage
   */
  public valueOf(): `{${Name}}` {
    return super.valueOf();
  }
  //#endregion instance public methods.
}
