import { Wrapper } from '../../wrapper/src/wrapper.class';
import { Wrapped } from '../../wrapper/src/wrapped.class';
import { Wrap } from '../../wrapper/type/wrap.type';
import { ClosingChar } from '../../type/closing-char.type';
import { OpeningChar } from '../../type/opening-char.type';
import { OpeningTag } from '../type/opening-tag.type';
import { ClosingTag } from '../type/closing-tag.type';
import { TaggedText } from '../type/tagged-text.type';
import { Tagged } from './tagged.class';
// @angular-package/type.
import {
  ResultCallback,
  guardString,
  isDefined,
  isString,
  isStringLength,
  isInstance,
} from '@angular-package/type';
/**
 *
 */
export class Tag<
  Name extends string = string,
  Chars extends string = string
> extends String {
  //#region static properties.
  //#region static public properties.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'tag'` for static `Tag`. It can be read by the
   * `typeOf()` function of `@angular-package/type`.
   */
  static get [Symbol.toStringTag](): string {
    return this.#toStringTag;
  }
  //#endregion static public properties.

  //#region static private properties.
  /**
   * The static, private (independent) property stores an instance of `Tag`.
   */
  // static #tag: Tag<any>;

  /**
   * The name for the `toStringTag` of `Symbol`.
   */
  static #toStringTag = 'tag';

  /**
   *
   */
  static #defaultWrapper = new Wrapper<string>();
  //#endregion static private properties.
  //#endregion static properties.

  //#region instance properties.

  public get closingChar(): ClosingChar<Chars[1]> {
    return this.#wrapper.closingChar;
  }

  public get closingTag(): ClosingTag<Name, Chars> {
    return this.tag.replace(
      this.openingChar,
      `${this.openingChar}/`
    ) as ClosingTag<Name, Chars>;
  }

  public get name(): Name {
    return this.#name;
  }

  public get openingChar(): OpeningChar<Chars[0]> {
    return this.#wrapper.openingChar;
  }

  public get openingTag(): OpeningTag<Name, Chars> {
    return this.tag as OpeningTag<Name, Chars>;
  }

  public get tag(): string {
    return this.value;
  }

  public get wrap(): Wrap<Chars> {
    return this.#wrapper.wrap;
  }

  public get value(): string {
    return this.valueOf();
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'tag'` for an instance of `Tag`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return Tag.#toStringTag;
  }

  #name: Name;
  #wrapper: Wrapper<Chars> = Tag.#defaultWrapper as Wrapper<Chars>;
  //#endregion instance properties.

  //#region static methods.
  public static define<Name extends string, Chars extends string>(
    name: Name,
    wrap?: Wrap<Chars>,
    callback?: ResultCallback<Name>
  ): Tag<Name, Chars> {
    return new this(name, wrap, callback);
  }

  // public static get<Name extends string>(): Tag<Name> {
  //   return this.#tag;
  // }

  public static getWrap<Chars extends string>(): Wrap<Chars> {
    return this.#defaultWrapper.wrap as Wrap<Chars>;
  }

  public static getWrapper<Chars extends string>(): Wrapper<Chars> {
    return this.#defaultWrapper as Wrapper<Chars>;
  }

  public static isTag<Name extends string = string>(
    value: any,
    callback?: ResultCallback<any>
  ): value is Tag<Name> {
    return isInstance(value, Tag, callback);
  }

  // public static set<Name extends string, Chars extends string>(
  //   name: Name,
  //   wrap?: Wrap<Chars>,
  //   callback?: ResultCallback<Name>
  // ): typeof Tag {
  //   this.#tag = new Tag(name, wrap, callback);
  //   return this;
  // }

  public static setWrapper<Chars extends string>(
    wrap: Wrap<Chars>,
    callback?: ResultCallback<Chars>
  ): typeof Tag {
    this.#defaultWrapper = Wrapper.isWrapper(wrap, callback)
      ? this.#defaultWrapper
      : new Wrapper(wrap, undefined, callback);
    return this;
  }

  public static tagText<
    Text extends string,
    Name extends string,
    Chars extends string
  >(
    text: Text,
    name: Name,
    wrap: Wrap<Chars> = this.#defaultWrapper.wrap as Wrap<Chars>,
    callback?: ResultCallback<Text>
  ): Tagged<Text, Name, Chars> | undefined {
    return new Tag(name, wrap).tagText(text, callback);
  }

  static #define<Name extends string, Chars extends string>(
    name: Name,
    wrap: Wrap<Chars> = this.#defaultWrapper as any,
    callback?: ResultCallback<Name>
  ): Wrapped<Name, Chars> | undefined {
    return new Wrapper(wrap).wrapText(name, callback);
  }
  //#endregion static methods.

  //#region constructor.
  constructor(name: Name, wrap?: Wrap<Chars>, callback?: ResultCallback<Name>) {
    super(Tag.#define(name, wrap, callback));
    this.#name = name;
    this.#wrapper = new Wrapper(
      wrap || Tag.#defaultWrapper.wrap
    ) as Wrapper<Chars>;
  }
  //#endregion constructor.

  //#region instance methods.
  public getName(): Name {
    return this.#name;
  }

  public getClosingChar(): ClosingChar<Chars[1]> {
    return this.#wrapper.closingChar;
  }

  public getClosingTag(): ClosingTag<Name, Chars> {
    return this.tag.replace(
      this.openingChar,
      `${this.openingChar}/`
    ) as ClosingTag<Name, Chars>;
  }

  public getOpeningChar(): OpeningChar<Chars[0]> {
    return this.#wrapper.openingChar;
  }

  public getOpeningTag(): OpeningTag<Name, Chars> {
    return this.tag as OpeningTag<Name, Chars>;
  }

  public getWrap(): Wrap<Chars> {
    return this.#wrapper.wrap;
  }

  // TODO: let this method work with private below.
  public tagText<Text extends string>(
    text: Text,
    callback?: ResultCallback<Text>
  ): Tagged<Text, Name, Chars> | undefined {
    return guardString(text, callback)
      ? new Tagged(this.#tagText(text), this)
      : undefined;
  }

  public valueOf(): string {
    return super.valueOf();
  }

  //#region instance private methods.
  #tagText<Text extends string>(text: Text): Text {
    return `${this.openingTag}${text}${this.closingTag}` as Text;
  }
  //#endregion instance private methods.
  //#endregion instance methods.
}
