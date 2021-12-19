// @angular-package/type.
import {
  isArray,
  isDefined,
  isStringType,
  isInstance,
} from '@angular-package/type';
// Interface.
import { Tag } from './tag.class';
// Type.
import { ForEachTag } from '../type/foreach-type';
/**
 * The `tags` object creates and stores multiple tags of the same opening and closing wrap.
 */
export class Tags<
  Names extends string,
  Opening extends string,
  Closing extends string,
  AttributeName extends string
> {
  /**
   * Gets an `object` of set tags.
   */
  public get tag(): Record<Names, {}> {
    return Object.fromEntries(this.#tags.entries()) as any;
  }

  /**
   * Gets an `array` of set tags.
   */
  public get tags(): Tag<Names, Opening, Closing, AttributeName>[] {
    return Array.from(this.#tags.values());
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'tags'` for an instance of `Tag`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'tags';
  }

  /**
   * A private property holds name-tag pairs in the original insertion order of the names.
   */
  #closing: Closing;

  /**
   * 
   */
  #opening: Opening;

  /**
   * 
   */
  #tags: Map<Names, Tag<any, any, any, any>> = new Map();

  /**
   * The method checks if the value of any type is an instance of `Tags`.
   * @param value The value of any type to test against the `Tags` instance.
   * @returns The return value is a `boolean` indicating whether the value is an instance of `Tags`.
   */
  // public static isTags<Names extends string, Chars extends string = string>(
  //   value: any
  // ): value is Tags<Names, Chars> {
  //   return isInstance(value, Tags);
  // }

  //#region constructor.
  constructor(
    names: Names[],
    opening: Opening,
    closing: Closing,
    ...attributes: [AttributeName, string][]
  ) {
    names.forEach((name) =>
      this.#tags.set(name, new Tag(name, opening, closing, ...attributes))
    );
    this.#closing = closing;
    this.#opening = opening;
  }
  //#endregion constructor.

  /**
   * The method executes a provided `forEachTag` function once per each name-tag pair in the `Tags` object.
   * @param forEachTag Function to execute for each entry in the `Tags`.
   * @returns The return value is an instance of `Tags`.
   */
  public forEach(forEachTag: ForEachTag<Names, Opening, Closing>): this {
    this.#tags.forEach(forEachTag);
    return this;
  }

  /**
   * 
   * @param name 
   * @returns 
   */
  public get<Name extends Names>(name: Name): Tag<Name, Opening, Closing, AttributeName> {
    return this.#tags.get(name) as Tag<Name, Opening, Closing, AttributeName>;
  }

  /**
   * 
   * @returns 
   */
  public getTags(): Tag<Names, Opening, Closing, AttributeName>[] {
    return Array.from(this.#tags.values());
  }

  /**
   * 
   * @param name 
   * @returns 
   */
  public has<Name extends Names>(name: Name): boolean {
    return this.#tags.has(name);
  }

  /**
   * 
   * @param name 
   * @param attributes 
   * @returns 
   */
  public set<Name extends Names, AttrName extends AttributeName>(
    name: Name,
    ...attributes: [AttrName, string][]
  ): this {
    this.#tags.set(
      name,
      new Tag(name, this.#opening, this.#closing, ...attributes)
    );
    return this;
  }
}
