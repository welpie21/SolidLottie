import { createEffect, createSignal } from "solid-js";
import { BaseLottieProps } from "..";

export function useLottieControl(
	options: Required<BaseLottieProps>
) {
	const [speed, setSpeed] = createSignal(options.speed);
	const [autoplay, setAutoplay] = createSignal(options.autoplay);
	const [loop, setLoop] = createSignal(options.loop);
	const [renderer, setRenderer] = createSignal(options.renderer);

	createEffect(() => {
		setSpeed(options.speed);
		setAutoplay(options.autoplay);
		setLoop(options.loop);
		setRenderer(options.renderer);
	});

	return () => ({
		speed,
		setSpeed,
		autoplay,
		setAutoplay,
		loop,
		setLoop,
		renderer,
		setRenderer
	});
}