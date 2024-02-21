/* eslint-disable solid/reactivity */
import Lottie, { LottiePlayer } from "lottie-web";
import { Accessor, ParentProps, Setter, createContext, createEffect, createMemo, createSignal, createUniqueId, mergeProps, onMount, useContext } from "solid-js";
import { BaseLottieProps, LottieQuality, LottieRenderer } from "../typings/lottie";
import { defaultLottieOptions } from "../defaults";
import { handleAnimationsWithName } from "../utils/lottie";

export interface SolidLottieContext {

	// ===============================================================
	// ========================= Initializers ========================
	// ===============================================================

	registerAnimation: Setter<string[]>;


	// ===============================================================
	// ======================= Control Methods =======================
	// ===============================================================

	setLoop: Setter<boolean>;
	setRenderer: Setter<LottieRenderer>;
	setAutoplay: Setter<boolean>;
	setSpeed: Setter<number>;
	setQuality: Setter<LottieQuality>;

	play: LottiePlayer['play'];
	pause: LottiePlayer['pause'];
	stop: LottiePlayer['stop'];
	destroy: LottiePlayer['destroy'];

	// ===============================================================
	// =========================== Properties ========================
	// ===============================================================

	uniqueIdentifier: string;
	player: LottiePlayer;

	speed: Accessor<number>;
	loop: Accessor<boolean>;
	autoplay: Accessor<boolean>;
	renderer: Accessor<LottieRenderer>;
	quality: Accessor<LottieQuality>;
}

export interface SolidLottieProviderProps extends ParentProps, BaseLottieProps {

}

export interface SolidLottieStore extends Required<BaseLottieProps> {
	player: LottiePlayer | null;
}

const LottieContext = createContext<SolidLottieContext>();

export function LottieProvider(props: SolidLottieProviderProps) {

	const uniqueIdentifier = createUniqueId();
	const mergedProps = mergeProps(defaultLottieOptions, props);

	const [animations, setAnimation] = createSignal<string[]>([]);
	const [autoplay, setAutoplay] = createSignal(mergedProps.autoplay);
	const [renderer, setRenderer] = createSignal(mergedProps.renderer);
	const [loop, setLoop] = createSignal(mergedProps.loop);
	const [speed, setSpeed] = createSignal(mergedProps.speed);
	const [quality, setQuality] = createSignal(mergedProps.quality);

	createEffect(() => {
		setAutoplay(mergedProps.autoplay);
		setRenderer(mergedProps.renderer);
		setLoop(mergedProps.loop);
		setSpeed(mergedProps.speed);
		setQuality(mergedProps.quality);
	});

	const play: LottiePlayer['play'] = (name) => {
		handleAnimationsWithName(name, animations(), Lottie.play);
	};

	const pause: LottiePlayer['pause'] = (name) => {
		handleAnimationsWithName(name, animations(), Lottie.pause);
	};

	const stop: LottiePlayer['stop'] = (name) => {
		handleAnimationsWithName(name, animations(), Lottie.stop);
	};

	const destroy: LottiePlayer['destroy'] = (name) => {
		handleAnimationsWithName(name, animations(), Lottie.destroy);
	};

	const providerValues = createMemo(() => ({
		uniqueIdentifier,
		player: Lottie,
		setLoop,
		setRenderer,
		setAutoplay,
		setSpeed,
		setQuality,
		play,
		pause,
		stop,
		destroy,
		speed,
		loop,
		autoplay,
		renderer,
		quality,
		registerAnimation: setAnimation
	}));

	return (
		<LottieContext.Provider value={providerValues()}>
			{props.children}
		</LottieContext.Provider>
	);
}

export function useLottie(): SolidLottieContext {
	const context = useContext(LottieContext);
	if (!context) throw new Error("useLottie must be used within a LottieProvider");
	return context!;
}