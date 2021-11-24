// Type.
import { StringOfLength } from '@angular-package/type';
/**
 * The type `WrapOpeningChar` of a one char `string` type indicates the opening char of the wrap. It takes the generic type variable `Chars`
 * constrained by the generic type `StringOfLength` and picks from it the first character.
 */
export type WrapOpeningChar<Chars extends StringOfLength<2, 2, string>> = Chars[0];
