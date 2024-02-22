export { 
	LottieProvider, 
	useLottie 
} from "./context/LottieProvider";

export {
	LottieComponent
} from "./components/Lottie";

export { 
	useLottieControl
} from "./primitives/useLottieControl";

export {
	defaultLottieOptions,
	setLottieDefaultOptions
} from "./defaults";

// Export types
export type {
	SolidLottieContext
} from "./context/LottieProvider";

export type {
	BaseLottieOptions,
	LottieQuality,
	LottieRenderer
} from "./typings/lottie";

export type { 
	LottieProps
} from "./components/Lottie";