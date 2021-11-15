// // @angular-package/type.
// import {
//   // Type.
//   ResultCallback,
//   ValueParser,
//   // Function.
//   areString,
//   guardFunction,
//   guardNumber,
//   guardObjectKeys,
//   guardString,
//   guardStringIncludes,
//   isDefined,
//   isTrue,
// } from '@angular-package/type';
// // Interface.
// import { Tag } from './tag.class';


// /**
//  * Template for error message.
//  */
// export class Tags<Names extends string> {
//   #tags: Map<Names, Tag<any, any>> = new Map();

//   constructor(...names: Names[]) {
//   }

//   public get<Name extends Names>(name: Name): Tag<Name> | undefined {
//     return this.#tags.get(name);
//   }

//   public getTags(): Record<Names, {}> {
//     return Object.fromEntries(this.#tags.entries()) as any;
//   }

//   public set<Name extends Names>(name: Name, tag: string ): this {
//     this.#tags.set(name, new Tag(tag));
//     return this;
//   }
// }


// // const tags = new Tags('fix', 'id', 'problem', 'value')
// //   .set('fix', 'fix')
// //   .set('id', 'id')
// //   .set('problem', 'problem')
// //   .set('value', 'value');

// // console.log(tags.getTags());

// // new ErrorTemplate();
