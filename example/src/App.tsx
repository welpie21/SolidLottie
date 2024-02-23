import LottieJSONA from "./assets/anim1.json?raw";
import LottieJSONB from "./assets/anim3.json?raw";
import { LottieProvider } from "../../lib/context/LottieProvider";
import { LottieComponent } from "../../lib/components/Lottie";
import './App.css';
import { createSignal, onCleanup, onMount } from "solid-js";
import { AnimationItem } from "lottie-web";
import { animateOnScroll } from "../../lib/utils/helpers";

function App() {

	let ref1: HTMLDivElement;
	let ref2: HTMLDivElement;

	const [animation1, setAnimation1] = createSignal<AnimationItem>();
	const [animation2, setAnimation2] = createSignal<AnimationItem>();
 
	const handler = (_: Event | MouseEvent) => {
		const anim1 = animation1()!;
		const anim2 = animation2()!;

		animateOnScroll({
			animation: anim1,
			animationElement: ref1,
			parentElement: ref1.parentElement!
		});

		animateOnScroll({
			animation: anim2,
			animationElement: ref2,
			parentElement: ref2.parentElement!
		});
	};

	onMount(() => {
		window.addEventListener('scroll', handler, { passive: true });
	});

	onCleanup(() => {
		window.removeEventListener('scroll', handler);
	});

	/**
	 
						
	 */

	return (
		<LottieProvider speed={0.5} loop={true}>
			<div style={{ height: "1000vh" }}>
				<section style={{ position: "relative", height: "300vh" }}>
					<LottieComponent
						ref={(el) => (ref1 = el)}
						animation-data={LottieJSONA}
						name='animation'
						style={{ width: "400px", height: "800px", position: "sticky", left: "0", right: "0", top: "0" }}
						options={{ speed: 1 }}
						onEvent={{
							DOMLoaded: (_, __, animation) => {
								setAnimation1(animation);
							}
						}}
					/>
				</section>
				<section style={{ position: "relative", height: "600vh" }}>
					<LottieComponent
						ref={(el) => (ref2 = el)}
						animation-data={LottieJSONB}
						name='animation'
						options={{ speed: 1 }}
						style={{ width: "400px", height: "800px", position: "sticky", left: "0", right: "0", top: "0" }}
						onEvent={{
							DOMLoaded: (_, __, animation) => {
								setAnimation2(animation);
							}
						}}
					/>
				</section>
			</div>
		</LottieProvider>
	);
}

export default App;
