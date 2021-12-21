// @angular-package/type.
import { isInstance, isDefined } from '@angular-package/type';
// Class.
import { Tag } from './tag.class';
/**
 * The `VariableTag` is an extension of `Tag` string object and represents any tag of variable in the template.
 */
export class Variable<
  Name extends string,
  Value extends string = string
> extends Tag<Name, `{`, `}`> {
  //#region instance public accessors.
  /**
   *
   */
  public get value(): string | undefined {
    return this.#value;
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'bbcodeTag'` for an instance of `Tag`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'variable';
  }
  //#endregion instance public accessors.

  /**
   *
   */
  #value?: Value;

  //#region static public methods.
  /**
   * The static method defines the `VariableTag` of a specified name with optional attributes.
   * @param name The name of `VariableTag` to define.
   * @param attributes A rest parameter of array of string attribute-value pair.
   * @returns The return value is a new instance of `VariableTag` with the given `name`.
   * @angularpackage
   */
  public static define<Name extends string, AttributeName extends string>(
    name: Name
  ): Variable<Name> {
    return new this(name);
  }

  /**
   * The static method checks if the value of any type is an instance of a `VariableTag`.
   * @param value The value of any type to check against the instance of `VariableTag`.
   * @param name Optional name of a generic type variable `Name`, as the tag name of a given value.
   * @returns The return value is a `boolean` type indicating whether the value is the `VariableTag` instance of any or a given name.
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
   * Creates a new instance of `VariableTag` with a specified name and optional attributes.
   * @param name The VariableTag tag name of a generic type variable `Name` to create.
   * @angularpackage
   */
  constructor(name: Name, value?: Value) {
    super(name, '{', '}');
    this.#value = value;
  }
  //#endregion constructor.
  /**
   *
   * @returns
   */
  public getValue(): Value | undefined {
    return this.#value;
  }

  /**
   *
   * @param value
   * @returns
   */
  public setValue(value: Value): this {
    this.#value = value;
    return this;
  }

  /**
   *
   * @param text
   * @returns
   */
  public replaceVariable(text: string): string {
    return this.replaceTag(text, this.#value || ``);
  }
}
