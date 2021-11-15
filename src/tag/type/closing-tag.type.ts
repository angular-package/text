import { StringOfLength } from '@angular-package/type';
import { Wrap } from '../../wrapper/type/wrap.type';
export type ClosingTag<
  Name extends string,
  Chars extends Wrap<string>
> = StringOfLength<0, typeof Infinity, `${Chars[0]}/${Name}${Chars[1]}`>;
