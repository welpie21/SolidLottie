import LottieJSONA from "./assets/lottie.json?raw";
import LottieJSONB from "./assets/pira.json?raw";

import { LottieProvider, useLottie } from "../../lib/context/LottieProvider";
import { LottieComponent } from "../../lib/components/Lottie";
import './App.css';
import { createSignal } from "solid-js";


function Control() {
	const lottie = useLottie();

	return (
		<div style={{ display: "flex", gap: "1rem" }}>
			<button onClick={lottie.playAll}>
				play
			</button>
			<button onClick={lottie.pauseAll}>
				pause
			</button>
			<button onClick={lottie.stopAll}>
				stop
			</button>
		</div>
	);
}

function Container() {

	const lottie = useLottie();
	const [loop, setLoop] = createSignal(true);

	return (
		<>
			<p>Speed: {lottie.speed()}</p>
			<input 
				type="range" 
				min={0} max={10} 
				value={lottie.speed()} 
				onChange={(e) => lottie.setSpeed(e.target.valueAsNumber)}
			/>

			<input
				type="checkbox"
				checked={loop()}
				onChange={(event) => {
					setLoop(event.target.checked);
					lottie.setLoop(event.target.checked);
				}}
			/>

			<LottieComponent
				animation-data={LottieJSONB}
				name='animation'
				style={{ width: "100px", height: "100px" }}
			/>
			<LottieComponent
				animation-data={LottieJSONA}
				name='open'
				style={{ width: "100px", height: "100px" }}
			/>
			<LottieComponent
				animation-data={LottieJSONA}
				name='animation'
				style={{ width: "100px", height: "100px" }}
			/>
			<Control />
		</>
	);
}

function App() {

	return (
		<>
			<LottieProvider speed={7}>
				<Container />
			</LottieProvider>
			<LottieProvider>
				<Container />
			</LottieProvider>
		</>
	);
}

export default App;
