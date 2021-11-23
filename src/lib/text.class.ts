// Type.
import { isString } from '@angular-package/type';
// Class.
import { Tag } from '../tag/src/tag.class';
import { Template } from './template.class';
/**
 *
 */
export class Text<Tpl extends string, TagNames extends string> {
  #replaced: Map<TagNames, string> = new Map();
  #template: Template<Tpl>;
  #text = '';

  public get template(): Template<Tpl> {
    return this.#template;
  }

  constructor(
    template: Tpl | Template<Tpl>,
    ...tagNames: (TagNames | Tag<TagNames>)[]
  ) {
    this.#template = Template.isTemplate(template)
      ? template
      : new Template(template, ...tagNames);
  }

  public getReplaced<TagName extends TagNames>(
    tagName: TagName
  ): string | undefined {
    return this.#replaced.get(tagName);
  }

  public getAllReplaced<Obj = Object>(object?: Obj): Record<TagNames, Obj> {
    return Object.fromEntries(this.#replaced.entries()) as any;
  }

  public getTemplate(): Template<Tpl> {
    return this.#template;
  }

  public getText(): string {
    this.#resetText().#replaceTags();
    return this.#text;
  }

  public replace<TagName extends TagNames, ReplaceValue extends string>(
    tagName: TagName,
    replaceValue: ReplaceValue
  ): this {
    isString(replaceValue) && this.#replaced.set(tagName, replaceValue);
    return this;
  }

  // public replaceTags(forEachTag: (tag: Tag<TagNames>, name: string) => void): this {
  //   this.#template.forEachTag(forEachTag);
  //   return this;
  // }

  public setTemplate(
    template: Tpl | Template<Tpl>,
    ...tagNames: (TagNames | Tag<TagNames>)[]
  ): this {
    this.#template = Template.isTemplate(template)
      ? template
      : new Template(template, ...[...tagNames, ...this.#template.getTags()]);
    return this;
  }

  #replaceTags(): this {
    // Use tags from the template to replace text.
    this.#template.forEachTag(
      (tag, name) =>
        (this.#text = tag.replaceTag(
          this.#text,
          this.#replaced.get(name as TagNames) || ''
        ))
    );
    return this;
  }

  #resetText(): this {
    // Reset text.
    this.#text = this.#template.valueOf();
    return this;
  }
}
