import { JSX } from "solid-js/jsx-runtime";
import { useLottie } from "..";
import { BaseLottieProps } from "../typings/lottie";
import { clsx } from "../utils/helpers";
import { createEffect, createUniqueId, splitProps } from "solid-js";
import { getAnimationName, unRegisterAnimation } from "../utils/lottie";

export interface LottieProps extends JSX.HTMLAttributes<HTMLDivElement> {
	name: string;
	"lottie-data": string;
	options?: BaseLottieProps;
}

export function LottieComponent(props: LottieProps) {

	let ref: HTMLDivElement | undefined;
	const [root, other] = splitProps(props, ["name", "lottie-data", "options", "class"]);

	const lottie = useLottie();
	const uniqueIdentifier = createUniqueId();

	const animationName = () => getAnimationName(
		lottie.uniqueIdentifier,
		uniqueIdentifier,
		root.name
	);

	const unmountLottieComponent = () => {
		const name = animationName();
		const unregister = unRegisterAnimation(name);

		lottie.registerAnimation(unregister);
		lottie.destroy(animationName());
	};

	createEffect(() => {
		const name = animationName();
		const speed = props.options?.speed ?? lottie.speed();

		lottie.player.setSpeed(speed, name);
	});

	createEffect(() => {

		const name = animationName();

		if (!ref) {
			console.warn("Component is not mounted yet - ", props.name);
			return;
		}

		lottie.registerAnimation(prev => {
			prev.push(name);
			return prev;
		});

		lottie.player.loadAnimation({
			container: ref,
			animationData: JSON.parse(root["lottie-data"]),
			renderer: root.options?.renderer,
			loop: root.options?.loop,
			autoplay: root.options?.autoplay,
			name: name
		});

		return unmountLottieComponent;
	});

	return (
		<div
			ref={ref}
			class={clsx("lottie", root.class)}
			data-name={animationName()}
			{...other}
		/>
	);
}