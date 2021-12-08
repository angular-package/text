/**
 * The type represents the wrapped text of a generic type variables in order `Text`, `Opening` and `Closing` on the template.
 */
export type WrappedText<
  Text extends string,
  Opening extends string,
  Closing extends string
> = `${Opening}${Text}${Closing}`;
