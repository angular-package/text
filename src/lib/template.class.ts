// Type.
import { isInstance } from '@angular-package/type';
// Class.
import { Tag } from '../tag/src/tag.class';
import { Tags } from '../tag/src/tags.class';
/**
 *
 */
export class Template<
  Tpl extends string,
  TagNames extends string = string
> extends String {
  //#region properties.
  //#region static properties.
  //#region static public properties.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'template'` for static `Template`. It can be read by the
   * `typeOf()` function of `@angular-package/type`.
   */
  static get [Symbol.toStringTag](): string {
    return 'template';
  }
  //#endregion static public properties.

  //#region instance properties.

  public get tag(): Record<TagNames, {}> {
    return this.#tags.tag;
  }

  public get tags(): Array<Tag<TagNames>> {
    return this.#tags.tags;
  }
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'template'` for an instance of `Template`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'template';
  }

  #tags: Tags<TagNames>;
  //#endregion instance properties.
  //#endregion properties.

  //#region static methods.

  public static isTemplate<Tpl extends string = string>(
    value: any
  ): value is Template<Tpl> {
    return isInstance(value, Template);
  }
  //#endregion static methods.

  //#region constructor.
  constructor(
    template: Tpl,
    ...tags: (TagNames | Tag<TagNames>)[]
  ) {
    super(template);
    this.#tags = new Tags<TagNames>(tags);
  }
  //#endregion constructor.

  //#region instance methods.
  public forEachTag(
    forEachTag: (tag: Tag<TagNames>, name: TagNames) => void
  ): this {
    this.#tags.forEach(forEachTag);
    return this;
  }

  public getTag<TagName extends TagNames>(name: TagName): Tag<TagName> {
    return this.#tags.get(name) as Tag<TagName>;
  }

  public getTags(): Array<Tag<TagNames>> {
    return this.tags;
  }

  public valueOf(): Tpl {
    return super.valueOf() as Tpl;
  }
  //#endregion instance methods.
}
