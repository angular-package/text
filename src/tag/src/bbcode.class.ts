// @angular-package/type.
import { isInstance, isDefined } from '@angular-package/type';
// Class.
import { TagExtension } from './tag-extension.class';
/**
 * The `BBCode` is an extension of `Tag` string object and represents any tag of BBCode, a lightweight markup language.
 */
export class BBCode<
  Name extends string,
  AttributeName extends string = string
> extends TagExtension<Name, `[`, `]`, AttributeName> {
  //#region instance public accessors.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'bbcodeTag'` for an instance of `Tag`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'bbcode';
  }
  //#endregion instance public accessors.

  //#region static public methods.
  /**
   * The static method defines the `BBCode` of a specified name with optional attributes.
   * @param name The name of `BBCode` to define.
   * @param attributes A rest parameter of array of string attribute-value pair.
   * @returns The return value is a new instance of `BBCode` with the given `name`.
   * @angularpackage
   */
  public static define<Name extends string, AttributeName extends string>(
    name: Name,
    ...attributes: [AttributeName, string][]
  ): BBCode<Name, AttributeName> {
    return new this(name, ...attributes);
  }

  /**
   * The static method checks if the value of any type is an instance of a `BBCode`.
   * @param value The value of any type to check against the instance of `BBCode`.
   * @param name Optional name of a generic type variable `Name`, as the tag name of a given value.
   * @returns The return value is a `boolean` type indicating whether the value is the `BBCode` instance of any or a given name.
   * @angularpackage
   */
  public static isBBCode<Name extends string>(
    value: any,
    name?: Name
  ): value is BBCode<Name> {
    return isInstance(value, BBCode)
      ? isDefined(name) && value.name === name
      : false;
  }
  //#endregion static public methods.

  //#region constructor.
  /**
   * Creates a new instance of `BBCode` with a specified name and optional attributes.
   * @param name The BBCode tag name of a generic type variable `Name` to create.
   * @param attributes A rest parameter of array of string attribute-value pair.
   * @angularpackage
   */
  constructor(name: Name, ...attributes: [AttributeName, string][]) {
    super(name, '[', ']', ...attributes);
  }
  //#endregion constructor.
}

console.log(new BBCode(`url`, [``, 'http://onet.pl'], ['author', 'anonymous']));
