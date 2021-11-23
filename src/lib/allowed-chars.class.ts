import { guardString, isInstance } from '@angular-package/type';

export class AllowedChars extends RegExp {
  static #defaultPattern = /([\[\]\(\)<>{}])/g;

  public static define(
    pattern?: string | RegExp,
    flags?: string | undefined
  ): AllowedChars {
    return new AllowedChars(pattern, flags);
  }

  public static isAllowedChars(value: any): value is AllowedChars {
    return isInstance(value, AllowedChars);
  }

  constructor(pattern?: string | RegExp, flags?: string | undefined) {
    super(pattern || AllowedChars.#defaultPattern, flags);
  }

  public filterText<Text extends string>(text: Text): Text {
    return (guardString(text) ? text.match(this)?.join('') : '') as Text;
  }

  public textContains<Text extends string>(text: Text): boolean {
    return guardString(text) ? this.test(text) : false;
  }
}
