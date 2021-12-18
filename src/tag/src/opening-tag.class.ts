import { Tag } from './tag.class';
/**
 * The `OpeningTag` string object represents the immutable opening tag.
 */
export class OpeningTag<
  Name extends string,
  Opening extends string = string,
  Closing extends string = string,
  AttributeName extends string = string
> extends Tag<Name, Opening, Closing, AttributeName> {}
