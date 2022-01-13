// @angular-package/type.
import { isTrue } from '@angular-package/type';
// Class.
import { Template } from './template.class';
/**
 * The `Text` object with the use of `Template` creates the text by replacing template variables.
 */
export class Text<Tpl extends string, VariableNames extends string> {
  /**
   * The `get` accessor returns the template of a specified `Text` object.
   * @returns The return value is the template of a `Template` type.
   * @angularpackage
   */
  public get template(): Template<Tpl, VariableNames> {
    return this.#template;
  }

  /**
   * The `get` accessor gets the text with replaced variables. If a variable does not have a value set it's replaced with an empty string.
   * @returns The return value is the text of a `string` type.
   * @angularpackage
   */
  public get text(): string {
    return this.#replaceVariables().#text;
  }

  /**
   * Private property of an array of variable names.
   */
  #names: (VariableNames | [VariableNames, string])[];

  /**
   * Private property of the template of `Template` type.
   */
  #template: Template<Tpl, VariableNames>;

  /**
   * Private property of the text of a `string` type, by default an empty string.
   */
  #text: string;

  /**
   * Creates the `Text` instance with the template and replaceable variables.
   * @param template The template of a generic type variable `Tpl` to set.
   * @param variables A rest parameter of string variable names or an array of name-value pairs to replace in the given template.
   * @angularpackage
   */
  constructor(
    template: Tpl,
    ...variables: (VariableNames | [VariableNames, string])[]
  ) {
    this.#template = new Template(template, ...variables);
    this.#names = variables;
    this.#text = this.#template.template;
  }

  /**
   * Gets replacement value of a specified variable name.
   * @param variable The variable name of a generic type variable `Variable` to get a replacement value.
   * @returns The return value is a `string` type replacement value if set, otherwise `undefined`.
   * @angularpackage
   */
  public getReplacement<Variable extends VariableNames>(
    variable: Variable
  ): string | undefined {
    return this.#template.getVariable(variable)?.value;
  }

  /**
   * Gets the template of a specified `Text` object.
   * @returns The return value is the template of the `Template` type.
   * @angularpackage
   */
  public getTemplate(): Template<Tpl, VariableNames> {
    return this.#template;
  }

  /**
   * Gets the text with replaced variables. If a variable does not have a value set it's replaced with an empty string.
   * @param replaceAll Replaces all the variables if set to `true`. By default, it's set to `true`.
   * @returns The return value is the text of a `string` type.
   * @angularpackage
   */
  public getText(replaceAll = true): string {
    return isTrue(replaceAll) && this.#replaceVariables(), this.#text;
  }

  /**
   * Replaces the variable of a given name with the replacement value in the template.
   * @param variableName The name of a generic type variable `Variable` to replace with the given replacement value in the template.
   * @param replaceValue The replacement value of a `string` type for the given variable name in the template.
   * @returns The return value is an instance of `Text`.
   * @angularpackage
   */
  public replaceVariable<VariableName extends VariableNames>(
    variableName: VariableName,
    replaceValue: string
  ): this {
    this.#text =
      this.#template
        .getVariable(variableName)
        ?.replaceVariable(this.#text, replaceValue) || this.#text;
    return this;
  }

  /**
   * Defines a new variable of specified name with an optional value.
   * @param variableName The variable name of a generic type variable `VariableName` to define.
   * @param replaceValue An optional variable value of a `string` type to define with a new variable.
   * @returns The return value is an instance of `Text`.
   * @angularpackage
   */
  public setVariable<VariableName extends VariableNames>(
    variableName: VariableName,
    replaceValue?: string
  ): this {
    this.#template.setVariable(variableName, replaceValue);
    return this;
  }

  /**
   * Resets private `#text` property with a clean template.
   * @returns The return value is an instance of `Text`.
   * @angularpackage
   */
  public resetText(): this {
    this.#text = this.#template.template;
    return this;
  }

  /**
   * Sets the template with initial or provided variables.
   * @param template The template of the `Template` type to set.
   * @param variables A rest parameter of string variable names or an array of name-value pairs to set with a given template. If there is
   * no value provided then the initial variables are used.
   * @returns The return value is an instance of `Text`.
   * @angularpackage
   */
  public setTemplate(
    template: Tpl,
    ...variables: (VariableNames | [VariableNames, string])[]
  ): this {
    this.#template = new Template(
      template,
      ...(variables.length > 0 ? variables : this.#names)
    );
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
      (variable) => (this.#text = variable.replaceVariable(this.#text))
    );
    return this;
  }
}
