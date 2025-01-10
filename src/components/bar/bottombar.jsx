import { BiHomeAlt2, BiMoviePlay, BiSearch } from "react-icons/bi"
import { BsPerson } from "react-icons/bs";

const BottomBar = () => {
  
  return (
    <div className="w-[100vw] h-[45px] bg-[var(--main-gray)] fixed bottom-0 z-[100] flex justify-evenly sm:bottom-[-60px] transition-all ease-out duration-300">
      <button className="w-[60px] text-white justify-items-center text-[20px]"><BiHomeAlt2/></button>
      <button className="w-[60px] text-white justify-items-center text-[20px]"><BiMoviePlay/></button>
      <button className="w-[60px] text-white justify-items-center text-[20px]"><BiSearch/></button>
      <button className="w-[60px] text-white justify-items-center text-[20px]"><BsPerson/></button>
    </div>
  )
}

export default BottomBar;