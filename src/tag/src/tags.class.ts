// @angular-package/type.
import { isArray, isStringType, isInstance } from '@angular-package/type';
// Interface.
import { Tag } from './tag.class';
import { Wrap } from '../../wrapper/src/wrap.class';
import { Wrapper } from '../../wrapper/src/wrapper.class';
/**
 * Template for error message.
 */
export class Tags<Names extends string, Chars extends string = string> {
  //#region properties.
  //#region static properties.
  //#region static private properties.
  //#endregion static private properties.
  //#endregion static properties.

  //#region public properties.
  public get tag(): Record<Names, {}> {
    return Object.fromEntries(this.#tags.entries()) as any;
  }

  public get tags(): Array<Tag<Names, Chars>> {
    return Array.from(this.#tags.values());
  }
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'tags'` for an instance of `Tag`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'tags';
  }
  //#endregion public properties.

  //#region private properties.
  #tags: Map<Names, Tag<Names, Chars>> = new Map();
  #wrap = Wrapper.getWrap();
  //#endregion private properties.
  //#endregion properties.

  //#region static methods.
  //#region static public methods.
  public static isTags<Names extends string, Chars extends string = string>(
    value: any
  ): value is Tags<Names, Chars> {
    return isInstance(value, Tags);
  }
  //#endregion static public methods.
  //#endregion static methods.

  //#region constructor.
  constructor(
    namesOrTags: (Names | Tag<Names>)[],
    charsOrWrap?: Chars | Wrap<Chars>
  ) {
    isArray(namesOrTags) &&
      namesOrTags.forEach((tag) => this.set(tag, charsOrWrap));
  }
  //#endregion constructor.

  //#region methods.
  //#region public methods.
  public forEach(
    forEachTag: (value: Tag<Names, Chars>, name: Names) => void
  ): this {
    this.#tags.forEach(forEachTag);
    return this;
  }

  public get<Name extends Names>(name: Name): Tag<Name, Chars> | undefined {
    return this.#tags.get(name) as Tag<Name, Chars>;
  }

  public getTags(): Array<Tag<Names, Chars>> {
    return Array.from(this.#tags.values());
  }

  public has<Name extends Names>(name: Name): boolean {
    return this.#tags.has(name);
  }

  private set<Name extends Names>(
    nameOrTag: Name | Tag<Name>,
    wrap?: Chars | Wrap<Chars>
  ): this {
    isStringType(nameOrTag)
      ? this.#tags.set(
          nameOrTag,
          new Tag(nameOrTag, wrap || (this.#wrap as Wrap<Chars>))
        )
      : Tag.isTag(nameOrTag) &&
        this.#tags.set(nameOrTag.name, nameOrTag as Tag<Name, Chars>);
    return this;
  }
  //#endregion public methods.
  //#endregion methods.
}
