// Type.
import { isInstance } from '@angular-package/type';
// Class.
import { Variable } from '../tag/src/variable.class';
import { Variables } from '../tag/src/variables.class';
/**
 * The `Template` string object is an immutable template with immutable replaceable variables.
 */
export class Template<
  Tpl extends string = string,
  VariableNames extends string = string
> extends String {
  //#region instance public accessors.
  /**
   * The `get` accessor gets the template, the primitive value of a specified `Template` object.
   * @returns The return value is the template of a generic type variable `Tpl`.
   * @angularpackage
   */
  public get template(): Tpl {
    return this.valueOf();
  }

  /**
   * Gets the variables in a form of an object where the key is the variable name.
   * @returns The return value is an object of attributes.
   * @angularpackage
   */
  public get variable(): Record<VariableNames, Variable<VariableNames>> {
    return this.#variables.variable as any;
  }

  /**
   * The `get` accessor returns variables of a specified `Template` object.
   * @returns The return value is an array of variables.
   * @angularpackage
   */
  public get variables(): readonly Variable<VariableNames>[] {
    return this.#variables.variables;
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'template'` for an instance of `Template`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'template';
  }
  //#endregion instance public accessors.

  //#region instance private properties.
  /**
   * Private property of variables of a `Variables` type.
   */
  #variables: Variables<VariableNames>;
  //#endregion instance private properties.

  //#region static public methods.
  /**
   * Checks whether the value is an instance of `Template`.
   * @param value Any value to check.
   * @returns The return value is a `boolean` indicating whether the value is an instance of `Template`.
   * @angularpackage
   */
  public static isTemplate<VariableNames extends string>(
    value: any,
    ...variablesNames: VariableNames[]
  ): value is Template<string, VariableNames> {
    return isInstance(value, Template);
  }
  //#endregion static public methods.

  //#region constructor.
  /**
   * Creates a new `Template` instance of immutable template with a replaceable variables.
   * @param template The template of a generic type variable `Tpl` where given variables names should exists.
   * @param variables A rest parameter of string variable names or an array of name-value pairs that should exist in the template
   * in a form {name}.
   * @angularpackage
   */
  constructor(
    template: Tpl,
    ...variables: (VariableNames | [VariableNames, string])[]
  ) {
    super(template);
    this.#variables = new Variables(...variables);
  }
  //#endregion constructor.

  //#region instance public methods.
  /**
   * The method executes a provided `forEach` function once per each `Variable` in the `Template` object.
   * @param forEach Function to execute for each variable in the `Template`.
   * @returns The return value is an instance of `Template`.
   * @angularpackage
   */
  public forEachVariable(
    forEach: (variable: Variable<VariableNames>) => void
  ): this {
    this.#variables.forEach(forEach);
    return this;
  }

  /**
   * Gets the template, the primitive value of a specified `Template` object.
   * @returns The return value is the template of a generic type variable `Tpl`.
   * @angularpackage
   */
  public getTemplate(): Tpl {
    return this.valueOf();
  }

  /**
   * Gets the variable of a specified name.
   * @param name The name under which `Variable` instance is retrieved from the storage.
   * @returns The return value is the variable of a `Variable` type.
   * @angularpackage
   */
  public getVariable<Name extends VariableNames>(
    name: Name
  ): Variable<Name> | undefined {
    return this.#variables.get(name);
  }

  /**
   * Gets an array of the variables.
   * @returns The return value is an array of the `Variable` instances.
   * @angularpackage
   */
  public getVariables(): readonly Variable<VariableNames>[] {
    return this.variables;
  }

  /**
   * Checks whether the variable under specified name exists in the storage.
   * @param name The name under which variable is searched in the storage.
   * @returns The return value is a `boolean` indicating whether an instance of `Variable` under the given name exists in the storage.
   * @angularpackage
   */
  public hasVariable<Name extends VariableNames>(name: Name): boolean {
    return this.#variables.has(name);
  }

  /**
   * Defines a new variable under the given name, with an optional value.
   * @param name The name of a generic type variable `Name` to define a new instance of `Variable` with a given optional value.
   * @param value An optional value of a `string` type to define with a new instance of `Variable` with a given name.
   * @returns The return value is an instance of `Template`.
   * @angularpackage
   */
  public setVariable<Name extends VariableNames>(
    name: Name,
    value?: string
  ): this {
    this.#variables.set(name, value);
    return this;
  }

  /**
   * Gets the template, the primitive value of a specified `Template` object.
   * @returns The return value is the template of a generic type variable `Tpl`.
   * @angularpackage
   */
  public valueOf(): Tpl {
    return super.valueOf() as Tpl;
  }
  //#endregion instance public methods.
}
