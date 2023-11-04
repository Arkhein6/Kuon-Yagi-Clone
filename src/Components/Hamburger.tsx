import { HamburgerTYPE } from "../Constants/types"


const Hamburger = ({
  menuState, menuStateHandler
}: HamburgerTYPE) => {

  return (
    <div onClick={menuStateHandler} className=" cursor-pointer relative z-[60] flex flex-col gap-[10.5px]">
      <span className={`w-[40px] transition-transform  origin-left  h-1 bg-white block  ${menuState ? "rotate-[45deg]  " : "rotate-0"} `}></span>
      <span className={`w-[40px] transition-transform h-1  origin-left  bg-white  ${menuState ? "opacity-0" : "opacity-100 "} `}></span>
      <span className={`w-[40px] transition-transform h-1  origin-left  bg-white block  ${menuState ? "rotate-[-45deg] " : "rotate-0"} `}></span>
      
    </div>
  )
}

export default Hamburger