// @angular-package/type.
import { isInstance, isDefined } from '@angular-package/type';
// Class.
import { TagExtension } from './tag-extension.class';
/**
 * The `BBCodeTag` is an extension of `Tag` string object and represents any tag of BBCode, a lightweight markup language.
 */
export class BBCodeTag<
  Name extends string,
  AttributeName extends string = string
> extends TagExtension<Name, `[`, `]`, AttributeName> {
  //#region instance public accessors.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'bbcodeTag'` for an instance of `Tag`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'bbcodeTag';
  }
  //#endregion instance public accessors.

  //#region static public methods.
  /**
   * The static method defines the `BBCodeTag` of a specified name with optional attributes.
   * @param name The name of `BBCodeTag` to define.
   * @param attributes A rest parameter of array of string attribute-value pair.
   * @returns The return value is a new instance of `BBCodeTag` with the given `name`.
   * @angularpackage
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
   * @angularpackage
   */
  public static isBBCodeTag<Name extends string>(
    value: any,
    name?: Name
  ): value is BBCodeTag<Name> {
    return isInstance(value, BBCodeTag)
      ? isDefined(name) && value.name === name
      : false;
  }
  //#endregion static public methods.

  //#region constructor.
  /**
   * Creates a new instance of `BBCodeTag` with a specified name and optional attributes.
   * @param name The BBCode tag name of a generic type variable `Name` to create.
   * @param attributes A rest parameter of array of string attribute-value pair.
   * @angularpackage
   */
  constructor(name: Name, ...attributes: [AttributeName, string][]) {
    super(name, '[', ']', ...attributes);
  }
  //#endregion constructor.
}
