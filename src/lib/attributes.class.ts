// @angular-package/type.
import { isArray, isDefined, isFalse } from '@angular-package/type';
// Class.
import { Attribute } from './attribute.class';
/**
 * The `Attributes` object is a storage for the attribute.
 */
export class Attributes<Name extends string = string> extends String {
  /**
   *
   */
  public get attribute(): Readonly<{ [K in Name]: string }> {
    const attributes: any = {};
    isDefined(this.#attributes) &&
      this.#attributes.forEach((attr: Attribute) =>
        Object.assign(attributes, attr.toObject())
      );
    return Object.freeze(attributes);
  }

  /**
   * Private attributes of a Map.
   */
  #attributes: Map<Name, Attribute<any>> = new Map();

  /**
   *
   * @param template
   * @param values
   * @returns
   */
  public static template(
    template: TemplateStringsArray,
    ...values: any[]
  ): string {
    let attributes: [string, string][];
    const names = new Set();
    return (
      ([attributes] = values),
      attributes
        .map((attribute) =>
          isFalse(names.has(attribute[0]))
            ? (names.add(attribute[0]),
              new Attribute(attribute[0], attribute[1]))
            : undefined
        )
        .filter((element) => isDefined(element))
        .join(' ')
    );
  }

  /**
   *
   * @param attributes
   */
  constructor(...attributes: [Name, string][]) {
    super(Attributes.template`${attributes}`);
    // Add unique attributes.
    let name: Name, value: string;
    attributes.forEach(
      (attribute) => (
        ([name, value] = attribute),
        isFalse(this.#attributes.has(name)) &&
          this.#attributes.set(name, new Attribute(name, value))
      )
    );
  }

  /**
   * Get the attribute of a specified name.
   * @param name The name of attribute to get.
   * @returns The return value is the attribute of the `Attribute` instance.
   */
  public get<AttrName extends Name>(
    name: AttrName
  ): Attribute<AttrName> | undefined {
    return this.#attributes.get(name);
  }
}
