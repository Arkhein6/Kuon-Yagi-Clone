import { Hero, TransitionItem } from "./Components";
import { useSpring, animated } from "@react-spring/web";
import {
	useEffect,
	useState,
	WheelEvent,
	ScrollEvent,
	useCallback,
} from "react";

const App = () => {
	const [isStart, setIsStart] = useState(false);
	const [isEnd, setIsEnd] = useState(false);
	const [isVanish, setIsVanish] = useState(false);
	const [delayStart, setDelayStart] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [navIndex, setNavIndex] = useState(0);

	const [first, firstAPI] = useSpring(() => ({
		from: {
			y: "0%",
			opacity:0
		},
	}));
	const [second, secondAPI] = useSpring(() => ({
		from: {
			y: "0",
			opacity:0
		},
	}));
	const [third, thirdAPI] = useSpring(() => ({
		from: {
			y: "0",
			opacity:0
		},
	}));
	const springAPIS = [firstAPI, secondAPI, thirdAPI];

	// const mouseWheelHandler = (event: WheelEvent<HTMLDivElement>) => {
	// 	console.log(event.deltaY,"de")
	// 	console.log(event.nativeEvent.deltaY,"saas")
	// 	// if(event.nativeEvent.deltaY > 0){
	// 	// 	console.log("MouseDown")
	// 	// }
	// 	// else{
	// 	// 	console.log("Mouse Up")
	// 	// }

	// }
	const debounce = <T extends (...args: never[]) => void>(
		func: T,
		delay: number
	) => {
		let debounceTimer: ReturnType<typeof setTimeout>;
		return function (...args: Parameters<T>) {
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => func(...args), delay);
		} as T;
	};

	const mouseWheelHandler = debounce((event: WheelEvent<HTMLDivElement>) => {
		if (event.deltaY > 0) {
			setNavIndex((current) =>
				current === 3 ? current : (current + 1) % 4
			);
			if (!isEnd && currentIndex === 0) {
				setIsVanish(true);
				setIsStart(true);
			}
			if (!isEnd) {
				springAPIS[currentIndex].start({
					to: {
						y: `-${(currentIndex + 1) * 100}%`,
						opacity:1
					},
					onRest: () => {
						setCurrentIndex((index) =>
							index === 2 ? index : (index + 1) % 3
						);

						if (currentIndex === 2) {
							setIsEnd(true);
							setCurrentIndex(3);
						}
					},
				});
			}
		} else {
			setNavIndex((current) =>
				current === 0 ? current : (current - 1 + 4) % 4
			);

			if (isStart && currentIndex === 1) {
				setIsVanish(false);
				setIsEnd(false);
			}
			if (isStart) {
				springAPIS[currentIndex - 1].start({
					to: {
						y: `${(currentIndex - 1) * 100}%`,
						opacity:1,
					},
					
					onRest: () => {
						setCurrentIndex((index) =>
							index === 0 ? index : (index - 1 + 3) % 3
						);
						if (currentIndex === 1) {
							setIsStart(false);
							setCurrentIndex(0);
						}
						
					},
				});
			}
		}
	}, 400);

	// useEffect(() => {
	// 	setTimeout(() => {

	// 		setIsVanish(true)
	// 		fourthAPI.start({
	// 			to:{
	// 				y:'-400%',
	// 			},
	// 			config:{
	// 				duration:2000
	// 			}
	// 		})

	// 	}, 8000);
	// })
	useEffect(() => {
		const Timeout = setTimeout(() => {
			setDelayStart(false);
		}, 1350);

		return () => {
			clearTimeout(Timeout);
		};
	}, []);

	return (
		<div
			onWheel={mouseWheelHandler}
			className="w-screen h-screen overflow-hidden"
		>
			<Hero
				startVanish={isVanish}
				Index={navIndex}
				isDelay={delayStart}
			/>
			<animated.div className="relative" style={first}>
				<TransitionItem start={navIndex} constant={1} texty={"DAMN GIRL"} />
			</animated.div>
			<animated.div className="relative" style={second}>
				<TransitionItem start={navIndex} constant={2} texty={"BARBIE DOLL"} />
			</animated.div>
			<animated.div className="relative" style={third}>
				<TransitionItem start={navIndex} constant={3} texty={"FLAT ASS"} />
			</animated.div>
		</div>
	);
};

export default App;
