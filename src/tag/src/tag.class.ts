import {
  guardString,
  isArray,
  isString,
  isInstance,
  isStringType,
} from '@angular-package/type';
// Class.
import { Attribute } from '../../lib/attribute.class';
import { Attributes } from '../../lib/attributes.class';
import { Tagged } from './tagged.class';
import { Wrapper } from '../../wrapper/src/wrapper.class';
// Type.
import { ClosingTag } from '../type/closing-tag.type';
import { OpeningTag } from '../type/opening-tag.type';
/**
 * The `Tag` string object represents the immutable tag of the opening and closing.
 */
export class Tag<
  Name extends string,
  Opening extends string = string,
  Closing extends string = string,
  AttributeName extends string = string
> extends String {
  //#region properties.
  //#region static accessors.
  /**
   * The public static `set` accessor sets an instance of `Wrapper` into the static private property `defaultWrapper`.
   */
  public static set wrapper(wrapper: Wrapper<any, any>) {
    Wrapper.isWrapper(wrapper) && (this.defaultWrapper = wrapper);
  }
  /**
   * The public static `get` accessor gets an instance of `Wrapper` from the static private property `defaultWrapper`.
   */
  public static get wrapper(): Wrapper<any, any> {
    return this.defaultWrapper;
  }
  //#endregion static accessors.

  //#region static properties.
  /**
   * The private static property of `Wrapper` is the default value for the `opening` and `closing` parameters of the constructor.
   * It can be set directly by the static accessor wrapper.
   */
  private static defaultWrapper: Wrapper<any, any> = new Wrapper(`[`, `]`);
  //#endregion static properties.

  //#region instance properties.
  /**
   * The `get` accessor returns the tag attributes if set, otherwise `undefined`.
   * @returns The return value is the tag attributes of an `Attributes` if set, or `undefined`.
   * @angularpackage
   */
  public get attributes(): Attributes<AttributeName> | undefined {
    return this.#attributes;
  }

  /**
   * The `get` accessor gets the closing tag of a generic type `ClosingTag`.
   * @returns The return value is a tag closing of a generic type `ClosingTag`.
   * @angularpackage
   */
  public get closingTag(): ClosingTag<Name, Opening, Closing> {
    return `${this.#wrapper.opening}/${this.#name}${this.#wrapper.closing}`;
  }

  /**
   * The `get` accessor gets the tag name without the wrap from the private property `#name`.
   * @returns The return value is a tag name of a generic type variables `Name`.
   * @angularpackage
   */
  public get name(): Name {
    return this.#name;
  }

  /**
   * The `get` accessor gets the opening tag with optional attributes.
   * ! The generic type `OpeningTag` does not include attributes, which means if the attributes were added, the return value includes
   * ! attributes e.g. `<span color="red">` but the return type indicates `<span>`.
   * @returns The return value is an opening tag of a generic type `OpeningTag`.
   * @angularpackage
   */
  public get openingTag(): OpeningTag<Name, Opening, Closing> {
    return Tag.template`${this.name}${this.wrapper.opening}${
      this.wrapper.closing
    }${this.attributes?.toArray()}` as OpeningTag<Name, Opening, Closing>;
  }

  /**
   * The `get` accessor gets the tag consists of the name, opening, and closing of the wrap.
   * @returns The return value is a tag of a generic type variables in order `Opening`, `Name` and `Closing` on the template.
   * @angularpackage
   */
  public get tag(): `${Opening}${Name}${Closing}` {
    return `${this.#wrapper.opening}${this.#name}${this.#wrapper.closing}`;
  }

  /**
   * The `get` accessor gets the wrapper.
   * @returns The return value is the `Wrapper` instance.
   * @angularpackage
   */
  public get wrapper(): Wrapper<Opening, Closing> {
    return this.#wrapper;
  }

  /**
   * The `get` accessor gets the tag without the attributes.
   * @returns The return value is the tag of a generic type variables in order `Opening`, `Name` and `Closing` on the template.
   * @angularpackage
   */
  public get value(): `${Opening}${Name}${Closing}` {
    return this.valueOf();
  }

  /**
   * The `get` accessor, with the help of `toStringTag`, changes the default tag to `'tag'` for an instance of `Tag`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'tag';
  }

  //#region instance private properties.
  /**
   * An optional private property of `Attributes` indicates tag attributes.
   */
  #attributes?: Attributes<AttributeName>;

  /**
   * Private property of a generic type variable `Name` as the tag name.
   */
  #name: Name;

  /**
   * The private property holds an instance of `Wrapper` to wrap the given name.
   */
  #wrapper: Wrapper<Opening, Closing>;
  //#endregion instance private properties.
  //#endregion instance properties.
  //#endregion properties.

  //#region static methods.
  //#region static public methods.
  /**
   * The static method checks whether the value of any type is the `Tag` instance of any or given tag name, the opening, and closing. It has
   * an optional ability to check tag name, opening, and closing.
   * @param value The value of any type to test against the `Tag` instance.
   * @param name An optional tag name of a generic type variable `Name` to test against existence in the given `value`.
   * @param opening An optional wrap opening of a generic type variable `Opening` to check if the given `value` contains.
   * @param closing An optional wrap closing of a generic type variable `Closing` to check if the given `value` contains.
   * @returns The return value is a `boolean` indicating whether the value is the `Tag` instance of any or given tag name, opening, and
   * closing.
   * @angularpackage
   */
  public static isTag<
    Name extends string,
    Opening extends string = string,
    Closing extends string = string
  >(
    value: any,
    name?: Name,
    opening?: Opening,
    closing?: Closing
  ): value is Tag<Name, Opening, Closing> {
    return isInstance(value, Tag)
      ? (isStringType(name) ? value.name === name : true) &&
        (isStringType(opening) ? value.wrapper.opening === opening : true) &&
        (isStringType(closing) ? value.wrapper.closing === closing : true)
      : false;
  }

  /**
   * The static "tag" method builds from the give parameters the tag of a string type on the template. With the added string before the
   * expressions, it returns a tag with a prefix before the name.
   * @param template An array of string values where the first element is a name between opening and closing.
   * @param values A rest parameter of expressions, where the first element is the name, the second opening, and the third is the closing of
   * the wrap.
   * @returns The return value is the tag of a `string` type, or an empty `string` if elements of the provided `values` are not `string`.
   * @angularpackage
   */
  public static template(
    template: TemplateStringsArray,
    ...values: any[]
  ): string {
    let attributes, name, opening, closing;
    return (
      ([name, opening, closing, attributes] = values),
      new Wrapper(opening || '', closing || '').wrapText(
        `${template[0]}${name || ''}` + Attributes.template` ${attributes}`
      ).value
    );
  }
  //#endregion static public methods.
  //#endregion static methods.

  //#region constructor.
  /**
   * Creates a new `Tag` instance of `name` wrapped by wrap opening and closing or wrap from the static default wrapper.
   * ! Optional attributes aren't used to build immutable tag, but are used to build the opening tag.
   * @param name The name of a generic type variable `Name` to define a new tag with a given opening and closing or the opening and closing
   * from default static `wrapper`.
   * @param opening An optional opening of the tag of a generic type variable `Opening`. By default, its value is picked from the `wrapper`
   * accessor of static `Tag`.
   * @param closing An optional closing of the tag of a generic type variable `Closing`. By default, its value is picked from the `wrapper`
   * accessor of static `Tag`.
   * @param attributes A rest parameter of an array of attribute-value pairs to set tag attributes in the opening tag.
   * @angularpackage
   */
  constructor(
    name: Name,
    opening: Opening = Tag.wrapper.opening,
    closing: Closing = Tag.wrapper.closing,
    ...attributes: [AttributeName, string][]
  ) {
    super(Tag.template`${name}${opening}${closing}`);
    // Set attributes.
    isArray(attributes) && (this.#attributes = new Attributes(...attributes));
    // Set name.
    this.#name = name;
    // Set wrapper.
    this.#wrapper = new Wrapper(opening, closing);
  }
  //#endregion constructor.

  //#region instance methods.
  /**
   * Gets the attribute of the specified name.
   * @param name The name of a generic type variable `AttrName` to get attribute.
   * @returns The return value is an attribute of `Attribute` instance if set, or `undefined`.
   * @angularpackage
   */
  public getAttribute<AttrName extends AttributeName>(
    name: AttrName
  ): Attribute<AttrName> | undefined {
    return this.attributes?.get(name) as Attribute<AttrName>;
  }

  /**
   * Gets the closing tag of a specified `Tag` object.
   * @returns The return value is the closing tag of a generic type `ClosingTag`.
   * @angularpackage
   */
  public getClosingTag(): ClosingTag<Name, Opening, Closing> {
    return this.closingTag;
  }

  /**
   * Gets the tag name without the opening and closing wrap.
   * @returns The return value is a tag name of a generic type variable `Name`.
   * @angularpackage
   */
  public getName(): Name {
    return this.#name;
  }

  /**
   * Gets the opening tag with optional attributes of the specified `Tag` object.
   * @returns The return value is the opening tag of a generic type `OpeningTag`.
   * @angularpackage
   */
  public getOpeningTag(): OpeningTag<Name, Opening, Closing> {
    return this.openingTag;
  }

  /**
   * Gets the tag consists of the name and the opening and closing of the wrap.
   * @returns The return value is the tag of a `string` type.
   * @angularpackage
   */
  public getTag(): `${Opening}${Name}${Closing}` {
    return this.valueOf();
  }

  /**
   * Gets the wrapper of a specified `Tag` object.
   * @returns The return value is the wrapper of the `Wrapper` instance.
   * @angularpackage
   */
  public getWrapper(): Wrapper<Opening, Closing> {
    return this.#wrapper;
  }

  /**
   * Checks if the `Tag` object has the attribute of a specified name.
   * * Attributes refers to the `openingTag` accessor, cause tag is immutable.
   * @param attrName The attribute name of a generic type variable `AttrName` to check whether `Tag` object has.
   * @returns The return value is a `boolean` indicating whether the `Tag` object has an attribute of a specified name.
   * @angularpackage
   */
  public hasAttribute<AttrName extends AttributeName>(
    attrName: AttrName
  ): boolean | undefined {
    return this.#attributes?.has(attrName);
  }

  /**
   * The method replaces the closing tag of a specified `Tag` object with the provided `replaceValue` in the given `text` if both values are
   * strings.
   * ! The return type of a generic type variable `Text` returns the text with not replaced tags.
   * @param text The text in which to replace the closing tag of a specified object with a given `replaceValue`.
   * @param replaceValue The value to replace the closing tag of a specified object in the given `text`.
   * @returns The return value is the given `text` of a generic type variable `Text` with a replaced tag if both the `text` and
   * `replaceValue` are strings. If `replaceValue` is not a `string` returns not replaced `text`, and if both the `text` and `replaceValue`
   * are not strings returns an empty `string`.
   * @angularpackage
   */
  public replaceClosingTag<Text extends string>(
    text: Text,
    replaceValue: string
  ): Text {
    return guardString(text)
      ? isString(replaceValue)
        ? (text.split(this.closingTag).join(replaceValue) as Text)
        : text
      : ('' as Text);
  }

  /**
   * The method replaces the opening tag of a specified `Tag` object with the provided `replaceValue` in the given `text` if both values are
   * strings.
   * ! The return type of a generic type variable Text returns the text with not replaced tags.
   * @param text The text of a generic type variable `Text` in which to replace the opening tag of a specified object, with a given
   * `replaceValue`.
   * @param replaceValue The value of a `string` type to replace the opening tag of a specified object in the given `text`.
   * @returns The return value is the given `text` of a generic type variable `Text` with a replaced tag if both the `text` and
   * `replaceValue` are strings. If `replaceValue` is not a `string` returns not replaced `text`, and if both the `text` and `replaceValue`
   * are not strings returns an empty `string`.
   * @angularpackage
   */
  public replaceOpeningTag<Text extends string>(
    text: Text,
    replaceValue: string
  ): Text {
    return guardString(text)
      ? isString(replaceValue)
        ? (text.split(this.openingTag).join(replaceValue) as Text)
        : text
      : ('' as Text);
  }

  /**
   * The method replaces the tag of a specified `Tag` object with the provided `replaceValue` in the given `text` if both values are
   * strings.
   * ! The return type of a generic type variable `Text` returns the text with not replaced tags.
   * @param text The text of a generic type variable `Text` in which to replace a tag of a specified object with a given `replaceValue`.
   * @param replaceValue The value of a `string` type to replace a tag of a specified object in the given `text`.
   * @returns The return value is the given `text` of a generic type variable `Text` with a replaced tag if both the `text` and
   * `replaceValue` are strings. If `replaceValue` is not a `string` returns not replaced `text`, and if both the `text` and `replaceValue`
   * are not strings returns an empty `string`.
   * @angularpackage
   */
  public replaceTag<Text extends string>(
    text: Text,
    replaceValue: string
  ): Text {
    return guardString(text)
      ? isString(replaceValue)
        ? (text.split(this.tag).join(replaceValue) as Text)
        : text
      : ('' as Text);
  }

  /**
   * Sets the tag attribute value of the specified name.
   * @param name The attribute name of a generic type variable `AttributeName` to set in the `Tag` object.
   * @param value The attribute value of a `string` type to set under the given `name`.
   * @returns The return value is an instance of `Tag`.
   * @angularpackage
   */
  public setAttribute(name: AttributeName, value: string): this {
    this.#attributes?.set(name, value);
    return this;
  }

  /**
   * Returns the provided text, tagged with the opening and closing tag.
   * @param text The text of a generic type variable `Text`, to tag with the opening and closing tag.
   * @returns The return value is a new `Tagged` instance with a tagged `text`.
   * @angularpackage
   */
  public tagText<Text extends string>(
    text: Text
  ): Tagged<Text, Name, Opening, Closing, AttributeName> {
    return new Tagged(text, this);
  }

  /**
   * Checks whether the text has a closing tag of a specified `Tag` object.
   * @param text The text of a generic type variable `Text` to test against the existence of a closing tag.
   * @returns The return value is a `boolean` indicating whether the given `text` has a closing tag.
   * @angularpackage
   */
  public textHasClosingTag<Text extends string>(text: Text): text is Text {
    return (
      isStringType(text) &&
      text.slice(-this.closingTag.length) === this.closingTag
    );
  }

  /**
   * Checks whether a text has an opening tag of a specified `Tag` object.
   * @param text The text of a generic type variable `Text` to test against the existence of an opening tag.
   * @returns The return value is a `boolean` indicating whether the given `text` has an opening tag.
   * @angularpackage
   */
  public textHasOpeningTag<Text extends string>(text: Text): text is Text {
    return (
      isStringType(text) &&
      text.slice(0, this.openingTag.length) === this.openingTag
    );
  }

  /**
   * Returns the untagged text, without the closing and opening tag of a specified `Tag` object.
   * @param text The text of a `string` type to untag.
   * @returns The return value is the text of a string type untagged from the opening and closing tag if tags are found, or the text.
   * @angularpackage
   */
  public untagText(text: string): string {
    this.textHasClosingTag(text) &&
      (text = text.valueOf().slice(0, text.length - this.closingTag.length));
    this.textHasOpeningTag(text) &&
      (text = text.valueOf().slice(this.openingTag.length));
    return text;
  }

  /**
   * Returns the tag, a primitive value of the specified `Tag` object.
   * @returns The return value is a tag name of a generic type variables in order `Opening`, `Name` and `Closing` on the template.
   * @angularpackage
   */
  public valueOf(): `${Opening}${Name}${Closing}` {
    return super.valueOf() as `${Opening}${Name}${Closing}`;
  }
  //#endregion methods.
}
