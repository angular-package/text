/**
 * The shape of an `object` for the error message that contains a possible solution to the described problem.
 * @param fix A possible solution to the described problem of a `string` type.
 * @param id An optional identifier of the described problem.
 * @param problem Description of validation problem of a `string` type.
 * @param template An optional message template of a `string` type.
 * @param value An optional value of any type affected by the validation error, which should be converted to `string`.
 */
export interface ErrorMessage {
  /**
   * A possible solution to the described problem of a `string` type.
   */
  fix: string;

  /**
   * An optional identifier of the described problem.
   */
  id?: number;

  /**
   * Description of validation problem of string type.
   */
  problem: string;

  /**
   * An optional message template of a string type.
   */
  template?: string;

  /**
   * An optional value of any type affected by the validation error, which should be converted to `string`.
   */
  value?: any;
}
