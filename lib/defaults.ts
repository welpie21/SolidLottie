import { BaseLottieOptions } from "./typings/lottie";

export const defaultLottieOptions = {
	autoplay: true,
	renderer: "svg",
	loop: true,
	speed: 1
} satisfies BaseLottieOptions;

/**
 * This sets default values for the LottieProvider globally.
 * @param options 
 */
export function setLottieDefaultOptions(options: Partial<BaseLottieOptions>) {
	Object.assign(defaultLottieOptions, options);
}