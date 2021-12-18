import { Tag } from './tag.class';
/**
 * The `ClosingTag` string object represents the immutable closing tag.
 */
export class ClosingTag<
  Name extends string,
  Opening extends string = string,
  Closing extends string = string
> extends Tag<Name, `${Opening}/`, Closing> {
  constructor(name: Name, opening: Opening, closing: Closing) {
    super(name, `${opening}/`, closing);
  }
}
