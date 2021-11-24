// Type.
import { StringOfLength } from '@angular-package/type';
/**
 * The type `WrapClosingChar` of a one char `string` type indicates the closing char of the wrap. It takes the generic type variable `Chars`
 * constrained by the generic type `StringOfLength` and picks from it the second character.
 */
export type WrapClosingChar<Chars extends StringOfLength<2, 2, string>> = Chars[1];
