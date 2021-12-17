// @angular-package/type
import { guardString, isInstance } from '@angular-package/type';
/**
 * The `AllowedChars` the `RegExp` object represents the pattern of allowed chars.
 * The constructor creates a regular expression object for matching text with a pattern.
 */
export class AllowedChars extends RegExp {
  /**
   * Checks if the value is an instance of `AllowedChars`.
   * @param value The value of any type to test against the `AllowedChars` instance.
   * @returns The return value is a `boolean` indicating whether the value is an instance of `AllowedChars`.
   */
  public static isAllowedChars(value: any): value is AllowedChars {
    return isInstance(value, AllowedChars);
  }

  /**
   * Creates a new instance of `AllowedChars`.
   * @param pattern The regular expression of a string or `RegExp` type.
   * @param flags An optional flags of a `string` type to set.
   * @angularpackage
   */
  constructor(pattern: string | RegExp, flags?: string) {
    super(pattern, flags);
  }

  /**
   * Filters the text with a regular expression of a specified object.
   * @param text The text of a `string` type to filter.
   * @returns The return value is the filtered text if text is a string and matches was found, or an empty `string`.
   */
  public filterText(text: string): string {
    return guardString(text) ? text.match(this)?.join('') || '' : '';
  }

  /**
   * Checks if the text contains allowed characters.
   * @param text The text of a generic type variable `Text` on which perform the search.
   * @returns The return value is a `boolean` indicating whether the text contains allowed characters.
   */
  public textContains<Text extends string>(text: Text): text is Text {
    return guardString(text) ? this.test(text) : false;
  }
}
