const isString = (value: unknown): value is string => typeof value === "string";
const isNumber = (value: unknown): value is number => typeof value === "number";

export const typeGuard = {
  isString,
  isNumber,
};
