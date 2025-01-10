import { BiHomeAlt2, BiMoviePlay, BiSearch } from "react-icons/bi"
import { Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";

const BottomBar = () => {
  
  return (
    <div className="w-[100vw] h-[45px] bg-[var(--main-gray)] fixed bottom-0 z-[100] flex justify-evenly sm:bottom-[-60px] transition-all ease-out duration-300">
      <Link to={'/'} className="w-[60px] text-white content-center justify-items-center text-[20px]"><BiHomeAlt2/></Link>
      <Link to={'/movie-category'} className="w-[60px] text-white content-center justify-items-center text-[20px]"><BiMoviePlay/></Link>
      <Link to={'/search'} className="w-[60px] text-white content-center justify-items-center text-[20px]"><BiSearch/></Link>
      <Link to={'/'} className="w-[60px] text-white content-center justify-items-center text-[20px]"><BsPerson/></Link>
    </div>
  )
}

export default BottomBar;