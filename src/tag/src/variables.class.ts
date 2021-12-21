// Class.
import { Variable } from './variable.class';
/**
 * The `tags` object creates and stores multiple variables tags.
 */
export class Variables<Names extends string> {
  /**
   * Gets an `object` of set tags.
   * @angularpackage
   */
  public get tag(): Record<Names, {}> {
    return Object.fromEntries(this.#tags.entries()) as any;
  }

  /**
   * Gets an `array` of set tags.
   * @angularpackage
   */
  public get tags(): Variable<Names>[] {
    return Array.from(this.#tags.values());
  }

  /**
   * Gets an `object` of set tags.
   * @angularpackage
   */
  public get variable(): Record<Names, {}> {
    return Object.fromEntries(this.#tags.entries()) as any;
  }

  /**
   * Gets an `array` of set tags.
   * @angularpackage
   */
  public get variables(): Variable<Names>[] {
    return Array.from(this.#tags.values());
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'tags'` for an instance of `Tag`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   * @angularpackage
   */
  public get [Symbol.toStringTag](): string {
    return 'variables';
  }

  /**
   *
   */
  #tags: Map<Names, Variable<any>> = new Map();

  //#region constructor.
  /**
   * 
   * @param names 
   * @angularpackage
   */
  // REVIEW: 
  // constructor(...names: (Names | [Names, string])[]) {
  constructor(...names: Names[]) {
    names.forEach((name) => this.#tags.set(name, new Variable(name)));
  }
  //#endregion constructor.

  public delete(): this {

    return this;
  }

  /**
   * The method executes a provided `forEachTag` function once per each name-tag pair in the `Tags` object.
   * @param forEach Function to execute for each entry in the `Tags`.
   * @returns The return value is an instance of `Tags`.
   */
  public forEach(forEach: (variableTag: Variable<Names>) => void): this {
    this.#tags.forEach(forEach);
    return this;
  }

  /**
   *
   * @param name
   * @returns
   * @angularpackage
   */
  public get<Name extends Names>(name: Name): Variable<Name> {
    return this.#tags.get(name) as Variable<Name>;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public getAll(): Variable<Names>[] {
    return Array.from(this.#tags.values());
  }

  /**
   *
   * @param name
   * @returns
   * @angularpackage
   */
  public has<Name extends Names>(name: Name): boolean {
    return this.#tags.has(name);
  }

  /**
   *
   * @param name
   * @returns
   * @angularpackage
   */
  public set<Name extends Names>(name: Name): this {
    this.#tags.set(name, new Variable(name));
    return this;
  }
}
