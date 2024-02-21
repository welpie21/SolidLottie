export interface BaseLottieProps {
	renderer?: LottieRenderer;
	loop?: boolean;
	autoplay?: boolean;
	speed?: number;
	quality?: LottieQuality;
}

export type LottieQuality = "high" | "medium" | "low";
export type LottieRenderer = "svg" | (string & object);