// @angular-package/type.
import { isInstance, isStringType } from '@angular-package/type';
/**
 * The `Attribute` string object represents the immutable attribute of name and value.
 */
export class Attribute<
  Name extends string = string,
  Value extends string = string
> extends String {
  /**
   * The `get` accessor returns the attribute, the primitive value of a specified object by using an **intuitive** name.
   * @returns The return value is the attribute of a generic type variables `Name` and `Value` on the template.
   * @angularpackage
   */
  public get attribute(): `${Name}="${Value}"` {
    return this.valueOf();
  }

  /**
   * The `get` accessor returns the attribute, the primitive value of a specified object.
   * @return The return value is the attribute of a generic type variables `Name` and `Value` on the template.
   * @angularpackage
   */
  public get get(): `${Name}="${Value}"` {
    return this.valueOf();
  }

  /**
   * The `get` accessor returns the name of the attribute.
   * @returns The return value is the attribute name of a generic type variable `Name`.
   * @angularpackage
   */
  public get name(): Name {
    return this.#name;
  }

  /**
   * The `get` accessor returns the attribute as an object where the key is the name.
   * @returns The return value is the attribute of an object type.
   * @angularpackage
   */
  public get object(): { [key in Name]: Value } {
    return this.toObject();
  }

  /**
   * The `get` accessor returns the attribute value of a specified object by using an intuitive name.
   * @returns The return value is the attribute value of a generic type variable `Value`.
   * @angularpackage
   */
  public get value(): Value {
    return this.#value;
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'attribute'` for an instance of `Attribute`. It can be read
   * by the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'attribute';
  }

  /**
   * The private property represents the attribute name of a generic type variable `Name`.
   */
  #name: Name;

  /**
   * The private property represents the attribute value of a generic type variable `Value`.
   */
  #value: Value;

  /**
   * Checks if the value is an instance of `Attribute` of any or given name, value.
   * @param value The value of any type to check against the `Attribute` instance.
   * @param name An optional attribute name of a generic type variable `Name` to check if the given `value` contains.
   * @param val An optional attribute value of a generic type variable `Value` to check if the given `value` contains.
   * @returns The return value is a `boolean` indicating whether the provided `value` is an instance of `Attribute`.
   */
  public static isAttribute<Name extends string, Value extends string>(
    value: any,
    name?: Name,
    val?: Value
  ): value is Attribute<Name, Value> {
    return isInstance(value, Attribute)
      ? (isStringType(name) ? value.name === name : true) &&
        (isStringType(val) ? value.value === val : true)
      : false;
  }

  /**
   * Creates a new instance of `Attribute` with the name and value.
   * @param name The attribute name of a generic type variable `Name`.
   * @param value The attribute value of a generic type variable `Value`.
   * @angularpackage
   */
  constructor(name: Name, value: Value) {
    super(`${name}="${value}"`);
    this.#name = name;
    this.#value = value;
  }

  /**
   * Returns converted the attribute primitive value to the array where the first element is the name, and the second is the `Value`.
   * @returns The return value is the attribute of an array.
   * @angularpackage
   */
  public toArray(): [Name, Value] {
    return [this.#name, this.#value];
  }

  /**
   * Returns converted the attribute primitive value to the object where the key is the name.
   * @returns The return value is the attribute of an object.
   * @angularpackage
   */
  public toObject(): { [key in Name]: Value } {
    return {
      [this.#name]: this.#value,
    } as { [key in Name]: Value };
  }

  /**
   * Returns attribute, the primitive value of a specified object.
   * @returns The return value is the attribute of a generic type variables `Name` and `Value` on the template.
   * @angularpackage
   */
  public valueOf(): `${Name}="${Value}"` {
    return super.valueOf() as any;
  }
}
