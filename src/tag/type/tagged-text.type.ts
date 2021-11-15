import { Wrap } from '../../wrapper/type/wrap.type';
import { ClosingTag } from './closing-tag.type';
import { OpeningTag } from './opening-tag.type';


export type TaggedText<Text extends string, Name extends string, Chars extends string> =
  `${OpeningTag<Name, Chars>}${Text}${ClosingTag<Name, Wrap<Chars>>}`;
