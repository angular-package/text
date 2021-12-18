import {
  guardString,
  isArray,
  isInstance,
  isString,
  isStringIncludes,
  isStringType,
} from '@angular-package/type';
// Class.
import { Attribute } from '../../lib/attribute.class';
import { Attributes } from '../../lib/attributes.class';
import { Wrapper } from '../../wrapper/src/wrapper.class';
/**
 * The `Tag` string object represents the immutable tag with optional attributes.
 */
export class Tag<
  Name extends string,
  Opening extends string = string,
  Closing extends string = string,
  AttributeName extends string = string
> extends String {
  //#region instance public accessors.
  /**
   * The `get` accessor returns the tag attributes if set, otherwise `undefined`.
   * @returns The return value is the tag attributes of an `Attributes` if set, or `undefined`.
   * @angularpackage
   */
  public get attributes(): Attributes<AttributeName> | undefined {
    return this.#attributes;
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
   * The `get` accessor gets the tag without the attributes. It is just another accessor of a general name to get the primitive value
   * of a specified `Tag` object.
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
  //#endregion instance public accessors.

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
    let attributes, closing, name, opening;
    return (
      ([name, opening, closing, attributes] = values),
      new Wrapper(opening || '', closing || '').wrapText(
        `${template[0]}${name || ''}` +
          (attributes.length > 0 ? ` ${new Attributes(...attributes)}` : '')
      ).value
    );
  }
  //#endregion static public methods.

  //#region constructor.
  /**
   * Creates a new `Tag` instance of `name` wrapped by wrap opening and closing or wrap from the static default wrapper.
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
    opening: Opening,
    closing: Closing,
    ...attributes: [AttributeName, string][]
  ) {
    super(Tag.template`${name}${opening}${closing}${attributes}`);
    // Set attributes.
    isArray(attributes) &&
      attributes.length > 0 &&
      (this.#attributes = new Attributes(...attributes));
    // Set name.
    this.#name = name;
    // Set wrapper.
    this.#wrapper = new Wrapper(opening, closing);
  }
  //#endregion constructor.

  //#region instance public methods.
  /**
   * Gets the attribute value of the specified name.
   * @param name The name of a generic type variable `AttrName` to get attribute.
   * @returns The return value is an attribute of `Attribute` instance if set, or `undefined`.
   * @angularpackage
   */
  public getAttribute<AttrName extends AttributeName>(
    name: AttrName
  ): Attribute<AttrName> | undefined {
    return this.#attributes?.get(name);
  }

  /**
   * Gets the tag name without the wrap opening and closing.
   * @returns The return value is a tag name of a generic type variable `Name`.
   * @angularpackage
   */
  public getName(): Name {
    return this.#name;
  }

  /**
   * Gets the tag consists of the name and the opening and closing of the wrap.
   * @returns The return value is the tag of a `string` type.
   * @angularpackage
   */
  public getTag(): `${Opening}${Name}${Closing}` {
    return this.tag;
  }

  /**
   * Gets the `Wrapper` of a specified `Tag` object.
   * @returns The return value is the wrapper of the `Wrapper` instance.
   * @angularpackage
   */
  public getWrapper(): Wrapper<Opening, Closing> {
    return this.#wrapper;
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
        ? (text.split(this.value).join(replaceValue) as Text)
        : text
      : ('' as Text);
  }

  /**
   * Checks whether a text has a tag of a specified `Tag` object.
   * @param text The text of a generic type variable `Text` to check whether it contains the tag.
   * @returns The return value is a `boolean` indicating whether the text contains the tag.
   */
  public textHasTag<Text extends string>(text: Text): text is Text {
    return isStringIncludes(text, [this.tag]);
  }

  /**
   * Returns the tag, a primitive value of the specified `Tag` object.
   * @returns The return value is a tag name of a generic type variables in order `Opening`, `Name` and `Closing` on the template.
   * @angularpackage
   */
  public valueOf(): `${Opening}${Name}${Closing}` {
    return super.valueOf() as `${Opening}${Name}${Closing}`;
  }
  //#endregion instance public methods.
}
