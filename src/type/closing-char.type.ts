import { StringOfLength } from '@angular-package/type';
/**
 * The type `ClosingChar` of a one char string type indicates the closing char of the wrap.
 */
export type ClosingChar<Char extends StringOfLength<1, 1, string>> = Char;
