import {Outlet} from "react-router-dom";
import Navbar from "../components/bar/navbar";
import Sidebar from "../components/bar/sidebar";
import Footer from "../components/bar/footer";

function RootLayout(){
  return (
    <>
      <Navbar/>     
      <Sidebar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default RootLayout;