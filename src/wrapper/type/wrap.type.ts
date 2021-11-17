// @angular-package/type.
import { StringOfLength } from '@angular-package/type';
/**
 * The type `Wrap` of a two ch string type indicates the type of wrap.
 */
export type Wrap<Chars extends string> = StringOfLength<2, 2, Chars>;
