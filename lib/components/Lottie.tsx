import { JSX } from "solid-js/jsx-runtime";
import { useLottie } from "..";
import { BaseLottieOptions } from "../typings/lottie";
import { clsx } from "../utils/helpers";
import { createEffect, createSignal, onMount, splitProps } from "solid-js";

export interface LottieProps extends JSX.HTMLAttributes<HTMLDivElement> {
	name: string;
	"animation-data": string;
	options?: BaseLottieOptions;
	initialSegment?: [number, number];
}

const lottieSplitProps = [
	"name", 
	"animation-data", 
	"options", 
	"class",
	"initialSegment"
] as const;

export function LottieComponent(props: LottieProps) {

	let ref: HTMLDivElement | undefined;
	const [root, other] = splitProps(props, lottieSplitProps);

	const lottie = useLottie();
	const [animationId, setAnimationId] = createSignal<string>();

	onMount(() => {

		if (!ref) {
			console.warn("Component is not mounted yet - ", props.name);
			return;
		}

		const { autoplay, loop, renderer } = Object.assign(
			{ renderer: lottie.renderer(), loop: lottie.loop(), autoplay: lottie.autoplay() },
			{ renderer: root.options?.renderer, loop: root.options?.loop, autoplay: root.options?.autoplay}
		);
		
		const animation = lottie.player.loadAnimation({
			container: ref,
			animationData: JSON.parse(root["animation-data"]),
			initialSegment: root.initialSegment,
			loop,
			renderer,
			autoplay
		});

		setAnimationId(animation.animationID);

		lottie.registerAnimation(animation)
	});

	createEffect(() => {
		const id = animationId()!;
		const speed = root.options?.speed ?? lottie.speed();

		lottie.setAnimationSpeed(id, speed);
	});

	createEffect(() => {
		const id = animationId()!;
		const loop = root.options?.loop ?? lottie.loop();

		lottie.setAnimationLoop(id, loop);
	});

	return (
		<div
			ref={ref}
			class={clsx("lottie", root.class)}
			data-name={animationId()}
			{...other}
		/>
	);
}