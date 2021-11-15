import { Template } from './template.class';
// import { Tags } from '../tag/src/tags.class';
import { Tag } from '../tag/src/tag.class';
/**
 * 
 */
export class Text<Tpl extends string, TagNames extends string> {
  #template: Template<string>;
  #tags: Tags<string>;

  constructor(template: Tpl | Template<Tpl>, ...tags: TagNames[]) {
    this.#template = new Template(template);
    this.#tags = new Tags(...tags);
  }

  public getTag<Name extends TagNames>(tag: Name): Tag<Name, string> | undefined {
    return this.#tags.get(tag);
  }
  public setTag<TagName extends TagNames>(tag: TagName, value: string): this {
    this.#tags.set(tag, value);
    return this;
  }

}
