import { isInstance, isDefined } from '@angular-package/type';
// Class.
import { Tag } from './tag.class';
import { Wrap } from '../../wrapper/src/wrap.class';
/**
 * 
 */
export class BBCodeTag<Name extends string> extends Tag<Name, '[]'> {
  public static define<Name extends string>(name: Name): BBCodeTag<Name> {
    return new this(name);
  }

  public static isBBCode<Name extends string>(
    value: any,
    name?: Name
  ): value is BBCodeTag<Name> {
    return isInstance(value, BBCodeTag)
      ? isDefined(name) && value.name === name
      : false;
  }

  constructor(name: Name) {
    super(name, new Wrap('[]'));
  }
}
