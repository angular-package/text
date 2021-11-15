import { ResultCallback, isInstance } from '@angular-package/type';

export class Template<Tpl extends string> extends String {

  //#region static properties.
  //#region static public properties.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'template'` for static `Template`. It can be read by the
   * `typeOf()` function of `@angular-package/type`.
   */
   static get [Symbol.toStringTag](): string {
    return this.#toStringTag;
  }
  //#endregion static public properties.

  //#region static private properties.
  /**
   * The static, private (independent) property stores an instance of `Template`.
   */
  static #template: Template<any>;

  /**
   * The name for the `toStringTag` of `Symbol`.
   */
  static #toStringTag = 'template';

  //#endregion static private properties.
  //#endregion static properties.

  //#region instance properties.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'template'` for an instance of `Template`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return Template.#toStringTag;
  }
  //#endregion instance properties.

  //#region static methods.
  public static define<Tpl extends string>(
    template: Tpl,
    callback?: ResultCallback<Tpl>
  ): Template<Tpl> {
    return new Template(template, callback);
  }

  public static set(tag: string): typeof Template {
    this.#template = new Template(tag);
    return this;
  }

  public static get<Tpl extends string>(): Template<Tpl> {
    return this.#template;
  }

  public static isTemplate<Tpl extends string = string>(
    value: any,
    callback?: ResultCallback<Template<Tpl>>
  ): value is Template<Tpl> {
    return isInstance(value, Template, callback);
  }
  //#endregion static methods.

  //#region constructor.
  constructor(template: Tpl | Template<Tpl>, callback?: ResultCallback<Tpl>) {
    super(template);
  }
  //#endregion constructor.

  public valueOf(): Tpl {
    return super.valueOf() as Tpl;
  }
}

// const tttt = Template.define('There is something, ');

// const t = new Template('There is something wrong, believe it. [fix] ');
// console.log(t);

