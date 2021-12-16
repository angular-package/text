// @angular-package/type.
import { isInstance, isDefined } from '@angular-package/type';
// Class.
import { Tag } from './tag.class';
/**
 * The `BBCodeTag` is an extension of `Tag` string object and represents any tag of BBCode, a lightweight markup language.
 */
export class BBCodeTag<
  Name extends string,
  AttributeName extends string = string
> extends Tag<Name, '[', `]`, AttributeName> {
  /**
   * The static method defines the BBCode tag of a specified name with optional attributes.
   * @param name The name of BBCode tag to define.
   * @param attributes A rest parameter of array of string attribute-value pair.
   * @returns The return value is a new instance of `BBCodeTag` of the given `name`.
   */
  public static define<Name extends string, AttributeName extends string>(
    name: Name,
    ...attributes: [AttributeName, string][]
  ): BBCodeTag<Name, AttributeName> {
    return new this(name, ...attributes);
  }

  /**
   * The static method checks if the value of any type is an instance of a `BBCodeTag`.
   * @param value The value of any type to check against the instance of `BBCodeTag`.
   * @param name Optional name of a generic type variable `Name`, as the tag name of a given value.
   * @returns The return value is a `boolean` type indicating whether the value is the `BBCodeTag` instance of any or a given name.
   */
  public static isBBCodeTag<Name extends string>(
    value: any,
    name?: Name
  ): value is BBCodeTag<Name> {
    return isInstance(value, BBCodeTag)
      ? isDefined(name) && value.name === name
      : false;
  }

  /**
   * Creates a new instance of `BBCodeTag` with a specified name and optional attributes.
   * @param name The BBCode tag name of a generic type variable `Name` to create.
   * @param attributes A rest parameter of array of string attribute-value pair.
   * @angularpackage
   */
  constructor(name: Name, ...attributes: [AttributeName, string][]) {
    super(name, '[', ']', ...attributes);
  }
}
