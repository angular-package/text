// Type.
import { Wrap } from './wrap.type';
/**
 * The type `WrapClosingChar` of a one char `string` type indicates the closing char of the wrap. It takes the generic type variable `Chars`
 * constrained by the generic type variable `Wrap` and picks from it the second character.
 */
export type WrapClosingChar<Chars extends Wrap<string>> = Chars[1];
