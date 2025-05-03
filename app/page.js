import Image from "next/image";
import NavBar from "./components/NavBar";
import Footer from "./components/footer";
import Homepg from "./pages/home";

export default function Home() {
  return (

      <div>
        <header>
          <NavBar/>
        </header>
        <Homepg/> 
      </div>
  );
}
