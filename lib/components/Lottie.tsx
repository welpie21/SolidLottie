import { JSX } from "solid-js/jsx-runtime";
import { useLottie } from "..";
import { BaseLottieOptions, LottieEvents } from "../typings/lottie";
import { clsx } from "../utils/helpers";
import { createEffect, createSignal, onCleanup, onMount, splitProps } from "solid-js";
import { assignOtherReference } from "../utils/dom";
import type { AnimationEventName, AnimationEvents, AnimationItem } from "lottie-web";

export interface LottieProps extends JSX.HTMLAttributes<HTMLDivElement> {
	name: string;
	"animation-data": string;
	options?: BaseLottieOptions;
	initialSegment?: [number, number];
	onEvent?: Partial<LottieEvents>;
}

const lottieSplitProps = [
	"name",
	"animation-data",
	"options",
	"class",
	"initialSegment",
	"ref",
	"onEvent"
] as const;

export function LottieComponent(props: LottieProps) {

	const listeners = new Map<AnimationEventName, (event: AnimationEvents[keyof AnimationEvents]) => void>();
	let ref: HTMLDivElement | undefined;
	const [root, other] = splitProps(props, lottieSplitProps);

	const lottie = useLottie();
	const [animation, setAnimation] = createSignal<AnimationItem>();

	onMount(() => {

		if (!ref) {
			console.warn("Component is not mounted yet - ", props.name);
			return;
		}

		const { autoplay, loop, renderer } = Object.assign(
			{ renderer: lottie.renderer(), loop: lottie.loop(), autoplay: lottie.autoplay() },
			{ renderer: root.options?.renderer, loop: root.options?.loop, autoplay: root.options?.autoplay }
		);

		const animation = lottie.player.loadAnimation({
			container: ref,
			animationData: JSON.parse(root["animation-data"]),
			initialSegment: root.initialSegment,
			loop,
			renderer,
			autoplay
		});

		setAnimation(animation);

		lottie.registerAnimation(animation);

		for (const n in root.onEvent) {
			const name = n as AnimationEventName;
			const cb = root.onEvent[name] as (id: string, event: AnimationEvents[keyof AnimationEvents], animation: AnimationItem) => void;

			const handler = (event: AnimationEvents[keyof AnimationEvents]) => {
				cb(name, event, animation);
			};

			listeners.set(name, handler);
			animation.addEventListener(name, listeners.get(name)!);
		}

	});

	onCleanup(() => {

		const anim = animation()!;

		for (const [name, handler] of listeners.entries()) {
			anim.removeEventListener(name, handler);
		}

	});

	createEffect(() => {
		const id = animation()!.animationID;
		const speed = root.options?.speed ?? lottie.speed();

		lottie.setAnimationSpeed(id, speed);
	});

	createEffect(() => {
		const id = animation()!.animationID;
		const loop = root.options?.loop ?? lottie.loop();

		lottie.setAnimationLoop(id, loop);
	});

	const assignReference = (el: HTMLDivElement) => {
		ref = el;
		assignOtherReference(root.ref, el);
	};

	return (
		<div
			// eslint-disable-next-line solid/reactivity
			ref={assignReference}
			class={clsx("lottie", root.class)}
			data-name={animation()?.animationID}
			{...other}
		/>
	);
}