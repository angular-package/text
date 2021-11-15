import { StringOfLength } from '@angular-package/type';
/**
 * The type `OpeningChar` of a one char string type indicates the opening char of the wrap.
 */
export type OpeningChar<Char extends StringOfLength<1, 1, string>> = Char;
