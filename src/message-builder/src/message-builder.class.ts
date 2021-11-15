// @angular-package/type
import {
  ResultCallback,
  guardString,
  isDefined,
  isString,
} from '@angular-package/type';
// Class.
import { MessageBuilderTemplate } from './message-builder-template.class';
/**
 * Message builder to build `class`, `function` and `method` of a `string` type.
 * @version experimental
 */
export class MessageBuilder {
  /**
   * An object with regexp to replace.
   */
  #regExp = {
    class: /\[class\]/i,
    function: /\[function\]/i,
    method: /\[method\]/i,
    param: {
      name: /\[param.name\]/i,
      type: /\[param.type\]/i,
    },
    return: /\[return\]/i,
  };

  /**
   * 
   */
  #template: string;

  /**
   * 
   */
  get get(): string {
    return this.#template;
  }

  /**
   * 
   * @param template 
   */
  constructor(template: 'class' | 'function' | 'method') {
    this.#template = new MessageBuilderTemplate(template).get;
  }

  /**
   * 
   * @param name 
   * @param callback 
   * @returns 
   */
  public replaceClassName(name: string, callback?: ResultCallback): this {
    guardString(name, callback) && this.replace(this.#regExp.class, name);
    return this;
  }

  /**
   * 
   * @param name 
   * @param callback 
   * @returns 
   */
  public replaceFunctionName(name: string, callback?: ResultCallback): this {
    guardString(name, callback) && this.replace(this.#regExp.function, name);
    return this;
  }

  /**
   * 
   * @param name 
   * @param callback 
   * @returns 
   */
  public replaceMethodName(name: string, callback?: ResultCallback): this {
    guardString(name, callback) && this.replace(this.#regExp.method, name);
    return this;
  }

  /**
   * 
   * @param name 
   * @param type 
   * @returns 
   */
  public replaceParam(name: string, type: string = ''): this {
    if (guardString(name)) {
      const param = `${name}${type}`;
      this.replace(this.#regExp.param.name, name).replace(
        this.#regExp.param.type,
        type
      );

      if (type.length > 0) {
        this.replace(type, `: ${type}`);
      }
    }
    return this;
  }

  /**
   * 
   * @param returns 
   * @param callback 
   * @returns 
   */
  public replaceReturn(returns: string, callback?: ResultCallback): this {
    guardString(returns, callback) &&
      this.replace(
        this.#regExp.return,
        returns.length > 0 ? `: ${returns}` : returns
      );
    return this;
  }

  /**
   * 
   * @param searchValue 
   * @param replaceValue 
   * @returns 
   */
  private replace(searchValue: string | RegExp, replaceValue: string): this {
    isDefined(searchValue) && (this.#template = this.#template.replace(
      searchValue,
      isString(replaceValue) ? replaceValue : ''
    ));
    return this;
  }
}
