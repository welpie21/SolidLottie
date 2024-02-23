/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnimationItem } from "lottie-web";

export function handleAnimations(
	animations: AnimationItem[],
	action: keyof AnimationItem,
	...args: unknown[]
) {
	for(const animation of animations) {
		animation[action](...args);
	}
}

export function unRegisterAnimation(name: string) {
	return (prev: string[]) => {
		return prev.filter((x) => x !== name);
	};
}

export function findAnimation(animations: AnimationItem[], id: string) {
	return animations.find((item) => item.animationID === id);
}

export function handleAnimation(
	animations: AnimationItem[],
	id: string,
	action: keyof AnimationItem,
	...args: unknown[]
) {
	const animation = findAnimation(animations, id);
	if(animation) {
		animation[action](...args);
	}
}

export function assignAnimationValue(
	animations: AnimationItem[],
	id: string,
	property: keyof AnimationItem,
	value: unknown
) {
	const animation = findAnimation(animations, id);
	if(animation) {
		Object.assign(animation, { [property]: value });
	}
}

export function parseDirection(direction: "forward" | "reverse") {
	return direction === "forward" ? 1 : -1;
}