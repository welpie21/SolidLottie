/* eslint-disable solid/reactivity */
import Lottie, { AnimationItem, LottiePlayer } from "lottie-web";
import { Accessor, ParentProps, Setter, createContext, createMemo, createSignal, mergeProps, splitProps, useContext } from "solid-js";
import { BaseLottieOptions, LottieRenderer } from "../typings/lottie";
import { defaultLottieOptions } from "../defaults";
import { assignAnimationValue, handleAnimation, handleAnimations, parseDirection } from "../utils/lottie";
import { EmptyFunction } from "../typings/global";
import { useLottieControl } from "../primitives/useLottieControl";

export interface SolidLottieContext {

	// ===============================================================
	// ========================= Initializers ========================
	// ===============================================================

	registerAnimation: (item: AnimationItem) => void;
	unRegisterAnimation: (id: string) => void;

	// ===============================================================
	// ======================= Control Methods =======================
	// ===============================================================

	setLoop: Setter<boolean>;
	setRenderer: Setter<LottieRenderer>;
	setAutoplay: Setter<boolean>;

	setSpeed: Setter<number>;
	setSpeedAll: (speed: number) => void;

	// invdividual control methods
	setAnimationSpeed: (id: string, speed: number) => void;
	setAnimationLoop: (id: string, loop: boolean) => void;
	setAnimationRenderer: (id: string, renderer: LottieRenderer) => void;
	setAnimationSegment: (range: [number, number], id: string) => void;
	playAnimationSegment: (range: [number, number], id: string) => void;
	playAnimationDirection: (direction: "forward" | "reverse", id: string) => void;
	goToAndPlay: (value: number, isFrame: boolean, id: string) => void;

	// context control methods
	playAll: EmptyFunction;
	pauseAll: EmptyFunction;
	stopAll: EmptyFunction;
	destroyAll: EmptyFunction;

	// ===============================================================
	// =========================== Properties ========================
	// ===============================================================

	player: LottiePlayer;

	speed: Accessor<number>;
	loop: Accessor<boolean>;
	autoplay: Accessor<boolean>;
	renderer: Accessor<LottieRenderer>;
}

const LottieContext = createContext<SolidLottieContext>();

export function LottieProvider(props: ParentProps<BaseLottieOptions>) {

	const [root, other] = splitProps(props, ["autoplay", "renderer", "loop", "speed"]);
	const mergedProps = mergeProps(defaultLottieOptions, root);

	const [animations, setAnimations] = createSignal<AnimationItem[]>([]);
	const controller = useLottieControl(mergedProps);

	const playAll: LottiePlayer['play'] = () => {
		const childrens = animations();
		handleAnimations(childrens, 'play');
	};

	const pauseAll: LottiePlayer['pause'] = () => {
		const childrens = animations();
		handleAnimations(childrens, 'pause');
	};

	const stopAll: LottiePlayer['stop'] = () => {
		const childrens = animations();
		handleAnimations(childrens, 'stop');
	};

	const destroyAll: LottiePlayer['destroy'] = () => {
		const childrens = animations();
		handleAnimations(childrens, 'destroy');
	};

	const setSpeedAll = (speed: number) => {
		const childrens = animations();
		handleAnimations(childrens, 'setSpeed', speed);
	};

	const registerAnimation = (item: AnimationItem) => {
		setAnimations((animations) => {
			animations.push(item);
			return animations;
		});
	};

	const setAnimationSpeed = (id: string, speed: number) => {
		const childrens = animations();
		handleAnimation(childrens, id, 'setSpeed', speed);
	};

	const setAnimationLoop = (id: string, loop: boolean) => {
		const childrens = animations();
		handleAnimation(childrens, id, 'setLoop', loop);
	};

	const setAnimationRenderer = (id: string, renderer: LottieRenderer) => {
		const childrens = animations();
		assignAnimationValue(childrens, id, 'renderer', renderer);
	};

	const setAnimationSegment = (range: [number, number], id: string) => {
		const childrens = animations();
		handleAnimation(childrens, id, 'setSegment', range);
	};

	const playAnimationSegment = (range: [number, number], id: string) => {
		const childrens = animations();
		handleAnimation(childrens, id, 'playSegments', range);
	};

	const playAnimationDirection = (direction: "forward" | "reverse", id: string) => {
		const childrens = animations();
		handleAnimation(childrens, id, 'setDirection', parseDirection(direction));
	};

	const goToAndPlay = (value: number, isFrame: boolean, id: string) => {
		const childrens = animations();
		handleAnimation(childrens, id, 'goToAndPlay', value, isFrame);
	};

	const unRegisterAnimation = (id: string) => {
		setAnimations((prev) => prev.filter((item) => item.animationID !== id));
	};

	const providerValues = createMemo<SolidLottieContext>(() => {

		const base = {
			player: Lottie,
			playAll,
			pauseAll,
			stopAll,
			destroyAll,
			registerAnimation,
			setSpeedAll,
			unRegisterAnimation,
			setAnimationSpeed,
			setAnimationLoop,
			setAnimationRenderer,
			setAnimationSegment,
			playAnimationSegment,
			playAnimationDirection,
			goToAndPlay,
		} satisfies Partial<SolidLottieContext>;

		return Object.assign(
			base,
			controller()
		);
	});

	return (
		<LottieContext.Provider value={providerValues()}>
			{other.children}
		</LottieContext.Provider>
	);
}

export function useLottie(): SolidLottieContext {
	const context = useContext(LottieContext);
	if (!context) throw new Error("useLottie must be used within a LottieProvider");
	return context!;
}