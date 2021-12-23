// Class.
import { Template } from './template.class';
/**
 *
 */
export class Text<Tpl extends string, Variables extends string> {
  /**
   * The `get` accessor returns the template of a specified `Text` object.
   * @returns The return value is the template of a `Template` type.
   * @angularpackage
   */
  public get template(): Template<Tpl, Variables> {
    return this.#template;
  }

  /**
   * The `get` accessor gets the text with replaced variables. If a variable does not have a value set it's replaced with an empty string.
   * @returns The return value is the text of a `string` type.
   * @angularpackage
   */
  public get text(): string {
    this.#resetText().#replaceVariables();
    return this.#text;
  }

  /**
   * Private property of an array of variable names.
   */
  #names: Variables[];

  /**
   * Private property of the template of `Template` type.
   */
  #template: Template<Tpl, Variables>;

  /**
   * Private property of the text of a `string` type, by default an empty string.
   */
  #text = '';

  /**
   * Creates the `Text` instance with the template and replaceable variables.
   * @param template The template of a generic type variable `Tpl` to set.
   * @param names A rest parameter of variable names to replace in the given template.
   * @angularpackage
   */
  constructor(template: Tpl, ...names: Variables[]) {
    this.#template = new Template(template, ...names);
    this.#names = names;
  }

  /**
   * Gets replacement value of a specified variable name.
   * @param variable The variable name of a generic type variable `Variable` to get a replacement value.
   * @returns The return value is a `string` type replacement value if set, otherwise `undefined`.
   * @angularpackage
   */
  public getReplacement<Variable extends Variables>(
    variable: Variable
  ): string | undefined {
    return this.#template.getVariable(variable).value;
  }

  /**
   * Gets the template of a specified `Text` object.
   * @returns The return value is the template of the `Template` type.
   * @angularpackage
   */
  public getTemplate(): Template<Tpl, Variables> {
    return this.#template;
  }

  /**
   * Gets the text with replaced variables. If a variable does not have a value set it's replaced with an empty string.
   * @returns The return value is the text of a `string` type.
   * @angularpackage
   */
  public getText(): string {
    return this.text;
  }

  /**
   * Replaces the variable of a given name with the replacement value in the template.
   * @param variable The name of a generic type variable `Variable` to replace with the given replacement value in the template.
   * @param replaceValue The replacement value of a `string` type for the given variable name in the template.
   * @returns The return value is an instance of `Text`.
   * @angularpackage
   */
  public replace<Variable extends Variables>(
    variable: Variable,
    replaceValue: string
  ): this {
    this.#template.setVariable(variable, replaceValue);
    return this;
  }

  /**
   * Sets the template with initial or provided variables.
   * @param template The template of the `Template` type to set.
   * @param names A rest parameter of variable names to set with a given template. If not provided then initial variables are used.
   * @returns The return value is an instance of `Text`.
   * @angularpackage
   */
  public setTemplate(template: Tpl, ...names: Variables[]): this {
    this.#template = new Template(template, ...names.length > 0 ? names : this.#names);
    return this;
  }

  /**
   * Replaces all instance variables in the template.
   * @returns The return value is an instance of `Text`.
   * @angularpackage
   */
  #replaceVariables(): this {
    // Use tags from the template to replace text.
    this.#template.forEachVariable(
      (variable) => (this.#text = variable.replaceVariable(this.#text ))
    );
    return this;
  }

  /**
   * Resets private `#text` property with a clean template.
   * @returns The return value is an instance of `Text`.
   * @angularpackage
   */
  #resetText(): this {
    // Reset text.
    this.#text = this.#template.valueOf();
    return this;
  }
}
