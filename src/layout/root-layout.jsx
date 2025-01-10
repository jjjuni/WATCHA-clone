import {Outlet} from "react-router-dom";
import Navbar from "../components/bar/navbar";
import Sidebar from "../components/bar/sidebar";
import Footer from "../components/bar/footer";
import BottomBar from "../components/bar/bottombar";

function RootLayout(){
  return (
    <>
      <Navbar/>     
      <Sidebar/>
      <Outlet/>
      <BottomBar/>
      <Footer/>
    </>
  )
}

export default RootLayout;