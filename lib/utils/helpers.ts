/**
 * Concat class names and filter out falsy values
 * @param args 
 * @returns 
 */
export const clsx = (...args: (string | undefined)[]) => args.filter(Boolean).join(" ");

/**
 * Access a single
 */
export function access<Value>(input: Value, scope: (value: Value) => void) {
	return scope(input);
}