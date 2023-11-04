import { animated, useSpring, useSprings } from "@react-spring/web";
import { MouseEvent, WheelEvent, useEffect, useState } from "react";
import { Hamburger } from "./";
import { menuItems } from "../Constants/data";

const Hero = ({
	startVanish,
	Index,
	isDelay,
}: {
	startVanish: boolean;
	Index: number;
	isDelay: boolean;
}) => {
	const [tx, setTx] = useState(0);
	const [ty, setTy] = useState(0);
	const [tz, setTz] = useState(0);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [animatedHeight, animatedHeightApi] = useSpring(() => ({
		from: {
			top: "0%",
		},
		to: {
			top: "-100%",
		},
		pause: true,
		config: {
			duration: 500,
		},
	}));
	const [animatedScale, animatedScaleAPI] = useSpring(() => ({
		from: {
			transform: "translate3d(0)",
		},
	}));
	const animateMouseMoveScale = (event: MouseEvent<HTMLDivElement>) => {
		animatedScaleAPI.start({
			from: {
				transform: `translate3d(${tx}px,${ty}px,${tz}px)`,
			},
			onChange: (val) => {
				const [xey, yey, zez] = val.value.transform.split(",");
				setTx(Number.parseInt(xey.split("(")[1]));
				setTy(Number.parseInt(yey));
				setTz(Number.parseInt(zez));
			},
			to: {
				transform: `translate3d(${
					(40 / -window.innerWidth) * (event.clientX - 0) + 20
				},${
					(40 / -window.innerHeight) * (event.clientY - 0) + 20
				},${tz}px)`,
			},
		});
	};
	const [menuAnimateTransition, menuAnimateTransitionsAPI] = useSprings(
		menuItems.length,
		() => ({
			from: {
				y: "0%",
			},
		})
	);

	const [menuAnimation, menuAnimationAPI] = useSpring(() => ({
		from: {
			y: "-100%",
		},
	}));
	const [moonAndTextVanish, moonAndTextVanishAPI] = useSpring(() => ({
		from: {
			x: "0%",
		},
	}));
	const menuStateHandler = () => {
		setIsMenuOpen((current) => !current);
		if (!isMenuOpen) {
			menuAnimationAPI.start({
				from: {
					y: "-100%",
				},
				to: {
					y: "0%",
				},
			});
			menuAnimateTransitionsAPI.start({
				from: {
					y: "100%",
				},
				to: {
					y: "0%",
				},
				delay: 500,
			});
		} else {
			menuAnimationAPI.start({
				from: {
					y: "0%",
				},
				to: {
					y: "-100%",
				},
			});
			menuAnimateTransitionsAPI.start({
				from: {
					y: "0%",
				},
				to: {
					y: "100%",
				},
			});
		}
	};
	const [nameAnimate, nameAnimateAPI] = useSpring(() => ({
		from: {
			x: "-100%",
			opacity:0,
			y:'0%'
}}))
		
	const [doubleDashAnimate, doubleDashAnimateAPI] = useSpring(() => ({
		from: {
			opacity: 0,
			x: "-100%",
			y: "0%",
		},
	}));
	const [jobAnimate, jobAnimateAPI] = useSpring(() => ({
		from: {
			x: "-100%",
			opacity: 0,
			y: "0%",
		},
	}));
	const [scrollDownAnimate, scrollDownAnimateAPI] = useSpring(() => ({
		from: {
			opacity: 0,
			y: "100%",
		},
		to: {
			opacity: 1,
			y: "0%",
		},
		delay: 1200,
	}));
	const [isFinishMotion, setIsFinishMotion] = useState(false);
	const [animateMoon, animateMoonAPI] = useSpring(() => ({
		from: {
			x: "80%",
			opacity: 0,
		},
	}));
	const [animateText, animateTextAPI] = useSpring(() => ({
		from: {
			x: "90%",
			opacity: 0,
		},
	}));

	useEffect(() => {
		setTimeout(() => {
			animatedHeightApi.resume();
		}, 1000);
	});
	useEffect(() => {
		if (startVanish) {
			console.log("start");
			setIsFinishMotion(false);
			jobAnimateAPI.start({
				to: {
					y: "-200%",
					opacity: 0,
					x: "0%",
				},
				onRest: () => {
					jobAnimateAPI.set({
						x:'-100%',
						y:'0%',
						opacity:0
					})
				}
			});
			nameAnimateAPI.start({
				to: {
					y: "-200%",
					opacity: 0,
					x:'0%'
				},
				onRest: () => {
					nameAnimateAPI.set({
						x:'-100%',
						y:'0%',
						opacity:0
					})
				}
			});
			doubleDashAnimateAPI.start({
				to: {
					y: "-200%",
					opacity: 0,
					x:'0%'
				},
				onRest: () => {
					doubleDashAnimateAPI.set({
						x:'-100%',
						y:'0%',
						opacity:0
					})
				}
			});
			animateMoonAPI.start({
				to: {
					x: "100%",
					opacity: 0,
				},
			});
			animateTextAPI.start({
				to: {
					x: "100%",
					opacity: 0,
				},
			});
			scrollDownAnimateAPI.start({
				to: {
					opacity: 0,
					y: "100%",
				},
			});
		} else {
			nameAnimateAPI.start({
				to: {
					x: "0%",
					opacity:1,
					y:'0%'
				},
				delay: isDelay ? 1000 : 0,
			})
			doubleDashAnimateAPI.start({
				to: {
					opacity: 1,
					x: "0%",
					y: "0%",
				},
				delay: isDelay ? 1100 : 0,
			});
			jobAnimateAPI.start({
				to: {
					x: "0%",
					opacity: 1,
					y: "0%",
				},
				delay: isDelay ? 1300 : 0,
			});
			animateMoonAPI.start({
				to: {
					x: "0%",
					opacity: 1,
				},
				delay: isDelay ? 1300 : 0,
				onRest: () => {
					setIsFinishMotion(true);
				},
			});
			animateTextAPI.start({
				to: {
					x: "-15%",
					opacity: 1,
				},
				delay: isDelay ? 1200 : 0,
			});
			scrollDownAnimateAPI.start({
				to: {
					opacity: 1,
					y: "0%",
				},
				delay: isDelay ? 1200 : 0,
			});
		}
	});

	return (
		<div
			onMouseMove={animateMouseMoveScale}
			className="bg-[#061C38]  overflow-hidden relative"
		>
			<animated.div className="w-screen h-screen">
				<div className="">
					<animated.div
						style={menuAnimation}
						className="w-screen h-screen bg-green-500 absolute z-50 flex flex-col gap-10 items-center justify-center"
					>
						{menuAnimateTransition.map((style, index) => (
							<animated.div className="h-fit w-fit overflow-hidden">
								<animated.a
									href={"#"}
									style={style}
									className="relative block cursor-pointer uppercase tracking-[0.6rem] font-bold text-6xl text-white before:transition-all before:duration-1000 before:hover:w-full  before:w-0 before:h-1 before:absolute before:bottom-0 before:bg-red-500"
								>
									{menuItems[index]}
								</animated.a>
							</animated.div>
						))}
					</animated.div>

					<div className="w-[90%] z-50 flex justify-between pt-3 mx-auto ">
						<h1 className="uppercase text-2xl relative z-[60] text-white">
							Arkhein
						</h1>
						<Hamburger
							menuState={isMenuOpen}
							menuStateHandler={menuStateHandler}
						/>
					</div>
				</div>
				<animated.div
					style={animatedHeight}
					className="bg-[#061C38] z-50 top-0 absolute w-screen h-screen"
				></animated.div>
				<animated.div className=" absolute right-[5rem] top-0 ">
					<div className="bg-transparent w-[600px] h-[600px] relative justify-center">
						<div className="absolute w-full h-full flex items-center justify-center">
							<animated.div
								style={animatedScale}
								className="w-[600px] h-[600px] rounded-[50%] bg-[#132437]"
							></animated.div>
						</div>
						<div className="absolute w-full h-full flex items-center justify-center">
							<animated.div
								style={animatedScale}
								className="w-[540px] h-[540px] rounded-[50%] bg-[#1F3040]"
							></animated.div>
						</div>
						<div className="absolute w-full h-full flex items-center justify-center">
							<animated.div
								style={animatedScale}
								className="w-[480px] h-[480px] rounded-[50%] bg-[#2A3948]"
							></animated.div>
						</div>
						<div className="absolute w-full h-full flex items-center justify-center">
							<animated.div
								style={animatedScale}
								className="w-[420px] h-[420px] rounded-[50%] bg-[#364352]"
							></animated.div>
						</div>
						<div className="absolute w-full h-full flex items-center justify-center">
							<animated.div
								style={animatedScale}
								className="w-[360px] h-[360px] rounded-[50%] bg-[#414D5A]"
							></animated.div>
						</div>
						<div className="absolute w-full h-full flex items-center justify-center">
							<animated.div
								style={animatedScale}
								className="w-[300px] h-[300px] rounded-[50%] bg-[#495662] flex items-center"
							></animated.div>
						</div>
						<div className="absolute w-full h-full flex items-center justify-center">
							<animated.div
								style={moonAndTextVanish}
								className="flex items-center justify-center"
							>
								<animated.div
									style={{
										transform: isFinishMotion
											? animatedScale.transform
											: undefined,
										...animateMoon,
									}}
									className="w-[240px] h-[240px] rounded-[50%] bg-white flex items-center"
								></animated.div>
								<animated.p
									style={animateText}
									className="absolute text-red-500 uppercase font-bold text-5xl"
								>
									portfolio
								</animated.p>
							</animated.div>
						</div>
					</div>
				</animated.div>
				<div className="absolute h-full  flex flex-col justify-center w-8 ml-[5%]">
					<div className="flex flex-col gap-5 ">
						<span
							className={` h-1 block bg-red-500 transition-all ${
								Index === 0 ? "w-[150%]" : "w-[90%]"
							}`}
						></span>
						<span
							className={` h-1 block bg-red-500 transition-all ${
								Index === 1 ? "w-[150%]" : "w-[90%]"
							}`}
						></span>
						<span
							className={` h-1 block bg-red-500 transition-all ${
								Index === 2 ? "w-[150%]" : "w-[90%]"
							}`}
						></span>
						<span
							className={` h-1 block bg-red-500 transition-all ${
								Index === 3 ? "w-[150%]" : "w-[90%]"
							}`}
						></span>
					</div>
					<animated.div
						style={scrollDownAnimate}
						className="flex flex-col absolute -left-10 bottom-0"
					>
						<div className="mt-8 mb-16">
							<p className="text-white text-sm rotate-90 tracking-[0.1rem]">
								SCROLLDOWN
							</p>
						</div>
						<div className="w-full h-24 flex justify-center">
							<span className="w-1 h-full bg-red-500 block"></span>
						</div>
					</animated.div>
				</div>
				<animated.div className="ml-[12%] flex flex-col gap-8 w-fit h-full justify-center overflow-hidden">
					<animated.h1
						style={nameAnimate}
						className="relative z-40 text-7xl font-bold uppercase tracking-[1rem] text-white"
					>
						richmond <br></br> Nkrumah
					</animated.h1>
					<animated.div
						style={doubleDashAnimate}
						className="flex flex-col gap-3"
					>
						<span className="w-28 h-2 rounded-lg bg-red-500 block"></span>
						<span className="w-28 h-2 translate-x-12 rounded-lg bg-red-500 block"></span>
					</animated.div>
					<animated.p
						style={jobAnimate}
						className="text-white text-2xl tracking-[0.5rem]"
					>
						web designer / <br></br>
						software developer.
					</animated.p>
				</animated.div>
			</animated.div>
		</div>
	);
};
export default Hero;
