
import {  animated,useSpring } from "@react-spring/web";
import { circleBGTYPE } from "../Constants/types";
import { useState,WheelEvent } from "react";

const CircleBG = ({animate}: {animate: circleBGTYPE}) => {
	const [isFinishMotion,setIsFinishMotion] = useState(false)
	const [animateMoon,animateMoonAPI] = useSpring(() => ({
		from: {
			x: "80%",
			opacity:0
		},
		to:{
			x: "0%",
			opacity:1
		},
		delay:1300,
		onRest:() => {
			setIsFinishMotion(true)
		}
	}))
	const [animateText,animateTextAPI] = useSpring(() =>({
		from:{
			x: "90%",
			opacity:0,
		},
		to:{
			x: "-15%",
			opacity:1,
		},
		delay:1200
		
	}))
	const mouseWheelHandler = (event:  WheelEvent<HTMLDivElement>) => {
		if(event.nativeEvent.deltaY > 0){
			setIsFinishMotion(false)
			console.log("SAPA Don Done it")
			animateMoonAPI.start({
				from: {
					x: "0%",
					opacity:1
				},
				to:{
					x: "120vw",
					opacity:0
				},
			})
			animateTextAPI.start({
				from:{
					x: "-15%",
					opacity:1,
				},
				to:{
					x: "90%",
					opacity:0,
				},			
			})
		}
		

	}

	return (
		<div onWheel={mouseWheelHandler} className="bg-transparent w-[600px] h-[600px] relative justify-center">	
			<div className="absolute w-full h-full flex items-center justify-center">
				<animated.div style={animate} className="w-[600px] h-[600px] rounded-[50%] bg-[#132437]">	
				</animated.div>
			</div>
      <div className="absolute w-full h-full flex items-center justify-center">
				<animated.div style={animate} className="w-[540px] h-[540px] rounded-[50%] bg-[#1F3040]">
					
				</animated.div>
			</div>
      <div className="absolute w-full h-full flex items-center justify-center">
				<animated.div style={animate} className="w-[480px] h-[480px] rounded-[50%] bg-[#2A3948]">
					
				</animated.div>
			</div>
      <div className="absolute w-full h-full flex items-center justify-center">
				<animated.div style={animate} className="w-[420px] h-[420px] rounded-[50%] bg-[#364352]">
					
				</animated.div>
			</div>
      <div className="absolute w-full h-full flex items-center justify-center">
				<animated.div style={animate} className="w-[360px] h-[360px] rounded-[50%] bg-[#414D5A]">
					
				</animated.div>
			</div>
      <div className="absolute w-full h-full flex items-center justify-center">
				<animated.div style={animate} className="w-[300px] h-[300px] rounded-[50%] bg-[#495662] flex items-center">	
				
				</animated.div>
			</div>
      <div className="absolute w-full h-full flex items-center justify-center">
				<animated.div style={isFinishMotion ? animate : animateMoon } className="w-[240px] h-[240px] rounded-[50%] bg-white flex items-center">
				</animated.div>
				<animated.p style={animateText} className="absolute text-red-500 uppercase font-bold text-5xl">portfolio</animated.p>
			</div>
      
		</div>
	);
};

export default CircleBG;
