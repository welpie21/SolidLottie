/* eslint-disable @typescript-eslint/no-explicit-any */

export function assignOtherReference(
	other?: ((ref: unknown) => void) | unknown,
	value?: unknown,
) {
	if (typeof other !== "function") {
		return;
	}

	other(value);
}