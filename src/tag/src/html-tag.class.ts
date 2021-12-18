// @angular-package/type.
import { isInstance, isDefined } from '@angular-package/type';
// Class.
import { TagExtension } from './tag-extension.class';
/**
 * The `HtmlTag` is an extension of `Tag` string object and represents any tag of Html.
 */
export class HtmlTag<
  Name extends string,
  AttributeName extends string = string
> extends TagExtension<Name, '<', '>', AttributeName> {
  //#region instance public accessors.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'htmlTag'` for an instance of `Tag`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'htmlTag';
  }
  //#endregion instance public accessors.

  //#region static public methods.
  /**
   * The static method defines the `HtmlTag` tag of a specified name with optional attributes.
   * @param name The name of `HtmlTag` tag to define.
   * @param attributes A rest parameter of array of string attribute-value pair.
   * @returns The return value is a new instance of `HtmlTag` with the given `name`.
   * @angularpackage
   */
  public static define<Name extends string, AttributeName extends string>(
    name: Name,
    ...attributes: [AttributeName, string][]
  ): HtmlTag<Name, AttributeName> {
    return new this(name, ...attributes);
  }

  /**
   * The static method checks if the value of any type is an instance of a `HtmlTag`.
   * @param value The value of any type to check against the instance of `HtmlTag`.
   * @param name Optional name of a generic type variable `Name`, as the tag name of a given value.
   * @returns The return value is a `boolean` type indicating whether the value is the `HtmlTag` instance of any or a given name.
   * @angularpackage
   */
  public static isHtmlTag<Name extends string>(
    value: any,
    name?: Name
  ): value is HtmlTag<Name> {
    return isInstance(value, HtmlTag)
      ? isDefined(name)
        ? value.name === name
        : true
      : false;
  }
  //#endregion static public methods.

  //#region constructor.
  /**
   * Creates a new instance of `HtmlTag` of given name and optional attributes.
   * ! Optional attributes aren't used to build immutable tag, but are used to build the opening tag.
   * @param name The html tag name of a generic type variable `Name`.
   * @param attributes A rest parameter of array of string attribute-value pair.
   * @angularpackage
   */
  constructor(name: Name, ...attributes: [AttributeName, string][]) {
    super(name, '<', '>', ...attributes);
  }
  //#endregion constructor.
}
