import type { AnimationItem } from "lottie-web";

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

/**
 * Clamps a value between a minimum and maximum value
 * @param value
 * @param min
 * @param max 
 */
export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

/**
 * Animates a lottie animation on scroll.
 * @param options
 * @returns AnimationItem
 */
export function animateOnScroll(options: {
	animation: AnimationItem;
	animationElement: HTMLElement;
	parentElement: HTMLElement;
}) {
	const { animation, animationElement, parentElement } = options;
	const stickyOffset = animationElement.getBoundingClientRect().top - parentElement.getBoundingClientRect().top;
	const beginning = 0;
	const end = parentElement.offsetHeight - animationElement.offsetHeight;

	if (stickyOffset < beginning) {
		animation.goToAndStop(0, true);
	} else if (stickyOffset > end) {
		animation.goToAndStop(animation.totalFrames, true);
	} else {
		const progress = clamp(animation.totalFrames * (stickyOffset / end), beginning, end);
		animation.goToAndStop(progress, true);
	}

	return animation;
}