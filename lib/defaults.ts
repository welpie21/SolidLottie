import { BaseLottieProps } from "./typings/lottie";

export const defaultLottieOptions = {
	autoplay: true,
	renderer: "svg",
	loop: true,
	speed: 1,
	quality: "medium"
} satisfies BaseLottieProps;

/**
 * This sets default values for the LottieProvider globally.
 * @param options 
 */
export function setLottieDefaultOptions(options: Partial<BaseLottieProps>) {
	Object.assign(defaultLottieOptions, options);
}