import { useSpring, animated, easings } from "@react-spring/web";
import DaImage from "../assets/3D.jpg";
import { useEffect } from "react";

const TransitionItem = ({texty,start,constant}: {texty: string,start: number,constant : number}) => {
	const [nameAnimate, nameAnimateAPI] = useSpring(() => ({
		from: {
			x: "-100%",
			y:'0%',
			opacity:0
		},
	}));

	const [doubleDashAnimate, doubleDashAnimateAPI] = useSpring(() => ({
		from: {
			opacity: 0,
			y:'0%',
			x:'-100%'
		
		},
	}));
	const [jobAnimate, jobAnimateAPI] = useSpring(() => ({
		from: {
			x: "-100%",
			opacity: 0,
			y:'0%'
		}
	}));
  const [imageCoverAnimate,imageCoverAnimateAPI] = useSpring(() => ({
    from:{
      x:'0%',
    },
    // to:{
    //   x:'110%'
    // },
    // config:{
    //   duration:550,
		// 	easing: easings.easeInQuad
    // },
  })) 
  const [imageCoverHardAnimate,imageCoverHardAnimateAPI] = useSpring(() => ({
    from:{
      x:'0%',
      width:'30px'
    },
    // to:{
    //   x:'100%',
    //   width:'700px'
    // },
    // config:{
    //   duration:550,
    //   easing: easings.easeInQuad
    // }
  })) 
	const [animateIndex,animateIndexAPI] = useSpring(() => ({
		from:{
			y:'0%',
		},
	}))
	const [vanishAbi,vanishAbiAPI] = useSpring(() => ({
		from:{
			y:'0%',
			scale:0.8,
			opacity:0

		},
	}))
	useEffect(() => {
		if(constant === start){
			vanishAbiAPI.start({
				to:{
				y:'0%',
				scale:1,
			opacity:1}
			})
			imageCoverAnimateAPI.start({
				to:{
					x:'110%'
				},
				config:{
					duration:550,
					easing: easings.easeInQuad
				},
			})
			imageCoverHardAnimateAPI.start({
				to:{
					x:'100%',
					width:'700px'
				},
				config:{
					duration:550,
					easing: easings.easeInQuad
				}
			})
			animateIndexAPI.start({
				to:{
					y:'0%'
				}
			})
			jobAnimateAPI.start({
				to: {
					y: "0%",
					opacity: 1,
					x: "0%",
				},
			});
			nameAnimateAPI.start({
				
				to: {
					y: "0%",
					opacity: 1,
					x:'0%'
				},
				
			});
			doubleDashAnimateAPI.start({	
				to: {
					y: "0%",
					opacity: 1,
					x:'0%'
				},
			});
		}
		else{
			vanishAbiAPI.start({
				to:{
				y:'-100%',
				scale:0.8,
				opacity:0
					}})
			imageCoverAnimateAPI.start({
				to:{
					x:'0%'
				},
				config:{
					duration:550,
					easing: easings.easeInQuad
				},
			})
			imageCoverHardAnimateAPI.start({
				to:{
					x:'0%',
					width:'30px'
				},
				config:{
					duration:550,
					easing: easings.easeInQuad
				}
			})
			nameAnimateAPI.start({
				to: {y:'-100%',
				x:'0%',
				opacity:0},
				
			})
			doubleDashAnimateAPI.start({
				to:{y:'-100%',
				x:'0%',
				opacity:0}
			})
			jobAnimateAPI.start({
				to:{y:'-100%',
				x:'0%',
				opacity:0}
			})
			animateIndexAPI.start({
				to:{
					y:'-100%'
				}
			})
		}
	})
	
	return (
		<animated.div className="w-screen h-screen bg-transparent">
			<animated.div className=" ml-[12%] flex flex-col gap-8 w-fit h-full justify-center overflow-hidden z-50">
				<animated.h1
					style={nameAnimate}
					className="relative z-50 text-7xl font-bold uppercase tracking-[1rem] text-white"
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
					{texty} / <br></br>
					software developer.
				</animated.p>
			</animated.div>
			<animated.div className="absolute mr-[5%] flex items-center top-0 right-0 h-full">
				<animated.div style={vanishAbi} className=" relative w-[700px] h-[500px] overflow-hidden">
          <animated.div style={imageCoverAnimate}className="absolute z-30 h-full w-full bg-[#061C24]"></animated.div>
          <animated.div style={imageCoverHardAnimate} className="absolute  h-full  bg-pink-500"></animated.div>
          <img className="w-full h-full" src={DaImage} alt="" />
				</animated.div>
				<div className=" absolute overflow-hidden bottom-[20%] -right-[6%] text-white text-8xl">

				<animated.p style={animateIndex} className="text-white text-8xl">
					0{constant}
				</animated.p>
				</div>
			</animated.div>
		</animated.div>
	);
};

export default TransitionItem;
