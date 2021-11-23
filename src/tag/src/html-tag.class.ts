// Class.
import { Tag } from './tag.class';
import { Wrap } from '../../wrapper/src/wrap.class';
// Type.
import { isInstance, isDefined } from '@angular-package/type';
/**
 *
 */
export class HtmlTag<Name extends string> extends Tag<Name, '<>'> {

  public static define<Name extends string>(name: Name): HtmlTag<Name> {
    return new this(name);
  }

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

  constructor(name: Name) {
    super(name, new Wrap('<>'));
  }
}
