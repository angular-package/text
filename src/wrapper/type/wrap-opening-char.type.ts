// Type.
import { Wrap } from './wrap.type';
/**
 * The type `WrapOpeningChar` of a one char `string` type indicates the closing char of the wrap. It takes the generic type variable `Chars`
 * constrained by the generic type variable `Wrap` and picks from it the first character.
 */
export type WrapOpeningChar<Chars extends Wrap<string>> = Chars[0];
