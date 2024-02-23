import { AnimationEvents, AnimationItem } from "lottie-web";

export interface BaseLottieOptions {
	renderer?: LottieRenderer;
	loop?: boolean;
	autoplay?: boolean;
	speed?: number;
}

export type LottieQuality = "high" | "medium" | "low";
export type LottieRenderer = "svg" | (string & object);

export type LottieEvents<
	K extends keyof AnimationEvents = keyof AnimationEvents,
	E extends AnimationEvents = AnimationEvents
> = {
	[P in K]: (id: string, event: E[P], animation: AnimationItem) => void;
}