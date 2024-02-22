export interface BaseLottieOptions {
	renderer?: LottieRenderer;
	loop?: boolean;
	autoplay?: boolean;
	speed?: number;
}

export type LottieQuality = "high" | "medium" | "low";
export type LottieRenderer = "svg" | (string & object);