/**
 * Returns whether the given value is a positive integer.
 * @param x
 */
export const isPositiveInteger = (x: unknown) =>
    Number.isInteger(Number(x)) && Number(x) >= 0;
