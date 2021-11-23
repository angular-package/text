import {
  guardString,
  isString,
  isInstance,
  isDefined,
  isUndefined,
} from '@angular-package/type';
// Class.
import { Tagged } from './tagged.class';
import { Wrap } from '../../wrapper/src/wrap.class';
import { Wrapper } from '../../wrapper/src/wrapper.class';
// Type.
import { ClosingTag } from '../type/closing-tag.type';
import { OpeningTag } from '../type/opening-tag.type';
/**
 *
 */
export class Tag<
  Name extends string,
  Chars extends string = string
> extends String {
  //#region properties.

  public static wrap = Wrapper.getWrap();

  //#region instance properties.
  public get closingTag(): ClosingTag<Name, Chars> {
    return this.tag.replace(
      this.#wrap.openingChar,
      `${this.#wrap.openingChar}/`
    ) as ClosingTag<Name, Chars>;
  }

  public get name(): Name {
    return this.#name;
  }

  public get openingTag(): OpeningTag<Name, Chars> {
    return this.tag as OpeningTag<Name, Chars>;
  }

  public get tag(): string {
    return this.value;
  }

  public get wrap(): Wrap<Chars> {
    return this.#wrap;
  }

  public get value(): string {
    return this.valueOf();
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'tag'` for an instance of `Tag`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'tag';
  }

  //#region instance private properties.
  #name: Name;
  #wrap: Wrap<Chars>;
  //#endregion instance private properties.
  //#endregion instance properties.

  //#region static methods.
  //#region static public methods.
  public static isTag<Name extends string, Chars extends string = string>(
    value: any,
    name?: Name,
    chars?: Chars
  ): value is Tag<Name, Chars> {
    return isInstance(value, Tag)
      ? isDefined(name) || isDefined(chars)
        ? isDefined(name) && isDefined(chars)
          ? value.wrap.value === chars && value.name === name
          : isDefined(name)
          ? value.name === name
          : value.wrap.value === chars
        : true
      : false;
  }
  //#endregion static public methods.
  //#endregion static methods.

  //#region constructor.
  constructor(name: Name, wrap?: Chars | Wrap<Chars>) {
    super(
      isUndefined(wrap)
        ? Tag.wrap ? Tag.wrap.wrapText(name) : Wrapper.wrapText(name)
        : Wrap.isWrap<Chars>(wrap)
        ? wrap.wrapText(name)
        : Wrapper.defineWrap(wrap).wrapText(name)
    );
    this.#wrap = isUndefined(wrap)
      ? Tag.wrap as Wrap<Chars> || Wrapper.getWrap()
      : Wrap.isWrap(wrap)
      ? wrap
      : Wrapper.defineWrap(wrap);
    this.#name = name;
  }
  //#endregion constructor.

  //#region instance methods.
  public getClosingTag(): ClosingTag<Name, Chars> {
    return this.closingTag;
  }

  public getName(): Name {
    return this.#name;
  }

  public getOpeningTag(): OpeningTag<Name, Chars> {
    return this.tag as OpeningTag<Name, Chars>;
  }

  public getWrap(): Wrap<Chars> {
    return this.#wrap;
  }

  public replaceTag<Text extends string>(
    text: Text,
    replaceValue?: string
  ): Text {
    return guardString(text)
      ? isString(replaceValue)
        ? (text.split(this.tag).join(replaceValue) as Text)
        : text
      : ('' as Text);
  }

  public tagText<Text extends string>(text: Text): Tagged<Text, Name, Chars> {
    return new Tagged(
      `${this.openingTag}${text}${this.closingTag}` as Text,
      this
    );
  }

  public valueOf(): Name {
    return super.valueOf() as Name;
  }
  //#endregion instance methods.
}
