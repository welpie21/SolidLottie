import LottieJSONA from "./assets/anim1.json?raw";
import LottieJSONB from "./assets/anim3.json?raw";
import LottieJSONC from "./assets/anim2.json?raw";
import LottieJSOND from "./assets/anim4.json?raw";
import { LottieProvider } from "../../lib/context/LottieProvider";
import { LottieComponent } from "../../lib/components/Lottie";
import './App.css';
import { createSignal, onCleanup, onMount } from "solid-js";
import { AnimationItem } from "lottie-web";
import { animateOnScroll } from "../../lib/utils/helpers";

function App() {

	let ref1: HTMLDivElement;
	let ref2: HTMLDivElement;
	let ref3: HTMLDivElement;

	const [animation1, setAnimation1] = createSignal<AnimationItem>();
	const [animation2, setAnimation2] = createSignal<AnimationItem>();
	const [animation3, setAnimation3] = createSignal<AnimationItem>();

	const handler = (_: Event | MouseEvent) => {
		const anim1 = animation1()!;
		const anim2 = animation2()!;
		const anim3 = animation3()!;

		animateOnScroll({
			animation: anim1,
			animationElement: ref1,
			parentElement: ref1.parentElement!.parentElement!
		});

		animateOnScroll({
			animation: anim2,
			animationElement: ref2,
			parentElement: ref2.parentElement!.parentElement!
		});

		animateOnScroll({
			animation: anim3,
			animationElement: ref3,
			parentElement: ref3.parentElement!.parentElement!
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
					<div style={{
						position: "sticky", left: "0", right: "0", top: "20rem", display: "flex", gap: "2rem",
						"background-color": "#111", border: "1px solid #555", "border-radius": "5px",
						padding: "1rem", "z-index": 1
					}}>
						<LottieComponent
							ref={(el) => (ref1 = el)}
							animation-data={LottieJSONA}
							name='animation'
							style={{ height: "auto", "border-radius": "30px", overflow: "hidden" }}
							options={{ speed: 1 }}
							onEvent={{
								DOMLoaded: (_, __, animation) => {
									setAnimation1(animation);
								}
							}}
						/>
						<div style={{ "text-align": "left" }}>
							<h1>Scroll Down</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
								accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus,
								nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat
								odio, sollicitudin vel erat vel, interdum mattis neque.
							</p>
						</div>
					</div>
				</section>
				<section style={{ position: "relative", height: "600vh" }}>
					<div
						style={{
							position: "sticky",
							top: "-10vh",
							left: 0, right: 0,
							"z-index": 1,
							height: "100vh",
							"background-image": "url('https://www.lego.com/cdn/cs/set/assets/blt2cfbd89252faf547/Z2_Benny.jpg')",
							"background-repeat": "no-repeat",
							"background-size": "contain",
							"background-position-y": "center",
							display: "flex",
							"justify-content": "center",
							"align-items": "center"
						}}
					>
						<LottieComponent
							ref={(el) => (ref2 = el)}
							animation-data={LottieJSONB}
							name='animation'
							options={{ speed: 1 }}
							style={{ width: "400px", height: "800px" }}
							onEvent={{
								DOMLoaded: (_, __, animation) => {
									setAnimation2(animation);
								}
							}}
						/>
						<LottieComponent
							ref={(el) => (ref3 = el)}
							animation-data={LottieJSONC}
							name='animation2'
							options={{ speed: 1 }}
							style={{ width: "400px", height: "800px" }}
							onEvent={{
								DOMLoaded: (_, __, animation) => {
									setAnimation3(animation);
								}
							}}
						/>
					</div>
				</section>
				<LottieComponent
					animation-data={LottieJSOND}
					name='animation'
					options={{ speed: 1, autoplay: true }}
					style={{ width: "400px", height: "800px" }}
				/>
			</div>
		</LottieProvider>
	);
}

export default App;
