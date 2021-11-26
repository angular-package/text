// @angular-package/type.
import { isInstance, isDefined } from '@angular-package/type';
// Class.
import { Tag } from './tag.class';
import { Wrap } from '../../wrapper/src/wrap.class';
/**
 * The string object represents any tag of BBCode, a lightweight markup language.
 */
export class BBCodeTag<Name extends string> extends Tag<Name, '[]'> {
  /**
   * The static method defines the BBCode tag of a specified name.
   * @param name The name of BBCode tag to define.
   * @returns The return value is a new instance of `BBCodeTag` of the given `name`.
   */
  public static define<Name extends string>(name: Name): BBCodeTag<Name> {
    return new this(name);
  }

  /**
   * The static method checks if the value of any type is an instance of a `BBCodeTag`.
   * @param value The value of any type to check against the instance of `BBCodeTag`.
   * @param name Optional name of a generic type variable `Name` as tag name of a given value.
   * @returns The return value is a `boolean` type indicating whether the value is the `BBCodeTag` instance of any or a given name.
   */
  public static isBBCode<Name extends string>(
    value: any,
    name?: Name
  ): value is BBCodeTag<Name> {
    return isInstance(value, BBCodeTag)
      ? isDefined(name) && value.name === name
      : false;
  }

  /**
   * Creates a new instance of `BBCodeTag` with a specified name.
   * @param name The name of BBCode tag to create.
   */
  constructor(name: Name) {
    super(name, new Wrap('[]'));
  }
}
