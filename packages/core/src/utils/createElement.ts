interface Option {
  id?: string;
}
export const createElement = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  { ...rest }: Option
): HTMLElementTagNameMap[K] => {
  const tag = document.createElement(tagName);

  return Object.assign(tag, { ...rest });
};
