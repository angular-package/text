// Type.
import { StringOfLength } from '@angular-package/type';
/**
 *
 */
export type ClosingTag<
  Name extends string,
  Chars extends StringOfLength<2, 2, string>
> = StringOfLength<0, typeof Infinity, `${Chars[0]}/${Name}${Chars[1]}`>;
