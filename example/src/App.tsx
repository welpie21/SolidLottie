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
			<button onClick={() => lottie.play('animation')}>
				play
			</button>
			<button onClick={() => lottie.pause('animation')}>
				pause
			</button>
			<button onClick={() => lottie.stop('animation')}>
				stop
			</button>
		</div>
	);
}

function Container() {

	return (
		<>
			<LottieComponent
				lottie-data={LottieJSONB}
				name='animation'
				style={{ width: "100px", height: "100px" }}
			/>
			<LottieComponent
				lottie-data={LottieJSONA}
				name='open'
				style={{ width: "100px", height: "100px" }}
			/>
			<LottieComponent
				lottie-data={LottieJSONA}
				name='animation'
				style={{ width: "100px", height: "100px" }}
			/>
			<Control />
		</>
	);
}

function App() {

	const [speedA, setSpeedA] = createSignal(1);
	const [speedB, setSpeedB] = createSignal(1);

	return (
		<>
			<p>Speed: {speedA()}</p>
			<input type="range" min={1} max={10} value={speedA()} onChange={(e) => setSpeedA(e.target.valueAsNumber)} />
			
			<p>Speed: {speedB()}</p>
			<input type="range" min={1} max={10} value={speedB()} onChange={(e) => setSpeedB(e.target.valueAsNumber)} />
			
			<LottieProvider speed={speedA()}>
				<Container />
			</LottieProvider>
			
			<LottieProvider speed={speedB()}>
				<Container />
			</LottieProvider>
		</>
	);
}

export default App;
